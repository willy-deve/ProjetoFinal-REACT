import * as React from 'react';
import history from '@history';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { showMessage } from 'app/store/fuse/messageSlice';
import { logoutUser, setUser } from 'app/store/userSlice';
import jwtService from './services/jwtService';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    jwtService.on('onAutoLogin', () => {
      dispatch(showMessage({ message: 'Login automático utilizando JWT' }));

      /**
       * Sign in and retrieve user data with stored token
       */
      const response = jwtService.signInWithToken(); // ok: true ou ok: false
      if (response.ok) {
        // { name: '', email: '', token: ''}
        success(response.userLogged, 'Login automático realizado com sucesso!');
      } else {
        pass(response.error);
      }
    });

    jwtService.on('onLogin', (newUser) => {
      newUser.signUp = false;
      success(newUser, `Bem-vindo(a) ${newUser.name}!`);
    });

    jwtService.on('onSignUp', (newUser, sucesso) => {
      if (sucesso) {
        newUser.signUp = true;
        success(newUser, 'Conta criada com sucesso! Você será redirecionado automaticamente');

        // parecido com o window.location.href = '/sign-in'
        setTimeout(() => {
          history.push({
            pathname: '/sign-in',
          });
        }, 1000);
      } else {
        newUser.signUp = true;
        success(newUser, 'Conta já existe!Verifique e tente novamente');
      }
    });

    jwtService.on('onLogout', () => {
      pass('Logout realizado');

      dispatch(logoutUser());
    });

    jwtService.on('onAutoLogout', (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    jwtService.on('onPasswordIncorrect', (message) => {
      pass(message);
    });

    jwtService.on('onUserNotFound', (message) => {
      pass(message);
    });

    jwtService.on('onServerError', (message) => {
      pass(message);
    });

    jwtService.on('onNoAccessToken', () => {
      pass();
      history.push({
        pathname: '/sign-in',
      });
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      if (user.signUp) {
        setWaitAuthCheck(false);
        setIsAuthenticated(false);
        return;
      }

      Promise.all([
        // aqui dispara a ação de setUser da store de user
        dispatch(setUser(user)),
        // user => { id: '', name: '', email: '', token: '' }
        // You can receive data in here before app initialization
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
