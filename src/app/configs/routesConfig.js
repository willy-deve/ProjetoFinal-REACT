import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';

import TarefasConfig from 'app/main/example/TarefasConfig';
import signInConfig from '../main/authentication/sign-in/signInConfig';
import signUpConfig from '../main/authentication/sign-up/signUpConfig';
import signOutConfig from '../main/authentication/sign-out/signOutConfig';
import errorPagesConfig from '../main/error/errorPagesConfig';

const routeConfigs = [signOutConfig, signInConfig, signUpConfig, errorPagesConfig, TarefasConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="tarefas" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="error/404" />,
  },
];

export default routes;
