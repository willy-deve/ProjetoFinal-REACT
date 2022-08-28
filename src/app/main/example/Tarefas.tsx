// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { Theme } from '@mui/system';
import { useAppSelector } from 'app/store/hooks';
import { useNavigate } from 'react-router-dom';
import TarefasHeader from './TarefasHeader';
import TarefasContent from './TarefasContent';

const Tarefas: React.FC = () => {
  const isMobile = useThemeMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const userLogged = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged.data.token) {
      navigate('/sign-in');
    }
  }, []);
  return (
    <>
      <FusePageCarded
        header={<TarefasHeader />}
        content={<TarefasContent />}
        scroll={isMobile ? 'normal' : 'content'}
      />
    </>
  );
};

export default Tarefas;
