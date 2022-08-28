/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectUser } from 'app/store/userSlice';
import { ITarefa } from 'app/services/api';
import CardTarefa from './CardTarefa';
import { buscarTarefas, selectAll } from './store/TarefasSlices';

const TarefasContent: React.FC = () => {
  const usuarioLogado = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const tarefas = useAppSelector(selectAll);
  const [auxTarefas, setAuxTarefas] = useState<ITarefa[]>([]);

  useEffect(() => {
    const { token } = usuarioLogado.data;
    dispatch(buscarTarefas({ url: '/task/readTasksByUserId', token }));
  }, []);

  useEffect(() => {
    setAuxTarefas(tarefas);
  }, [tarefas]);

  return (
    <>
      <Grid container spacing={1} className=" flex flex-row items-center justify-center">
        {auxTarefas.map((tarefa) => (
          <Grid item xl={12} key={tarefa.id}>
            <CardTarefa id={tarefa.id} titulo={tarefa.description} texto={tarefa.detail} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TarefasContent;
