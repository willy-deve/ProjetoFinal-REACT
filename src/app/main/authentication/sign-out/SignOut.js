import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import JwtService from '../../../auth/services/jwtService';

function SignOut() {
  useEffect(() => {
    setTimeout(() => {
      JwtService.logout();
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
      <Paper className="flex items-center h-full sm:h-auto md:flex md:justify-end w-full sm:w-auto md:h-full py-32 px-16 sm:p-48 md:p-64 md:pt-96 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-256 mx-auto" src="assets/images/logo/growdev.png" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
            Você desconectou-se da aplicação!
          </Typography>
          <Typography className="flex justify-center mt-2 font-medium">
            Redirecionamento em 5 segundos
          </Typography>

          <Typography className="mt-32 text-md font-medium text-center" color="text.secondary">
            <span>Ir para</span>
            <Link className="ml-4" to="/sign-in">
              Login
            </Link>
          </Typography>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundImage: 'primary.main' }}
      >
        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Pagina de recados</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            Lista de tarefas em React. Projeto criado utilizando o Growbase da Growdev para o módulo
            Front-End III.
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignOut;
