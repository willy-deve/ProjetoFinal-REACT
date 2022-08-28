import { authRoles } from 'app/auth';
import { lazy } from 'react';

const Tarefas = lazy(() => import('./Tarefas'));

const TarefasConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'tarefas',
      element: <Tarefas />,
    },
  ],
};

export default TarefasConfig;
