import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const userLogged = this.getUserLogged();

    if (!userLogged) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(userLogged.token)) {
      this.setSession(userLogged);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'Sessão Expirada, faça login novamente.');
    }
  };

  createUser = (novoUsuario) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signUp, novoUsuario)
        .then((response) => {
          if (response.data.ok) {
            // se ok: true
            const { data } = response.data;
            const newUser = {
              id: data.id,
              name: data.name,
              email: data.name,
              token: '',
            };
            resolve(newUser);
            this.emit('onSignUp', newUser, true);
          } else {
            // ok: false
            reject(response.data.error);
            this.emit('onSignUp', {}, false);
          }
        })
        .catch((error) => {
          console.log(error);
          // ok: false
          reject(error);
          this.emit('onSignUp', {}, false);
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          name: email,
          pass: password,
        })
        .then((response) => {
          // validar a resposta
          if (response.data.ok) {
            const user = response.data.data;
            const userLogged = {
              id: user.userId,
              name: user.userName,
              email: user.userName,
              token: user.token,
            };

            this.setSession(userLogged);

            resolve(userLogged);

            // dispara o emiter que dispara o sucess que dispara o dispatch com setUser()
            this.emit('onLogin', userLogged);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            this.emit('onPasswordIncorrect', error.response.data.error);
          }

          if (error.response.status === 404) {
            this.emit('onUserNotFound', error.response.data.error);
          }

          this.emit('onServerError', error.response.data.error);
        });
    });
  };

  signInWithToken = () => {
    const userLogged = this.getUserLogged();

    if (userLogged) {
      this.setSession(userLogged);
      return {
        ok: true,
        userLogged,
      };
    }

    // quando não achou usuário no localStorage
    this.logout();
    const error = 'Falha ao logar com o token.';
    return {
      ok: false,
      error,
    };
  };

  setSession = (userLogged) => {
    // { id: '', name: '', email: '', token: ''}
    if (userLogged) {
      localStorage.setItem('userLogged', JSON.stringify(userLogged));
    } else {
      localStorage.removeItem('userLogged');
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getUserLogged = () => {
    // era uma string jwt_access_token, mudou para um objeto com todos os dados do usuario logado
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    return userLogged; // se existir retorna o objeto / se não existir retorna null
  };
}

const instance = new JwtService();

export default instance;
