import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ModalTarefas from './ModalTarefas';

const TarefasHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log('entrou aqui');
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Box className="p-10 h-[100px]">
      <Grid container>
        <Grid item xl={10}>
          <Typography variant="h6">Nova Tarefa</Typography>
        </Grid>
        <Grid item xl={2}>
          <Button variant="outlined" onClick={handleOpen}>
            Criar
          </Button>
        </Grid>
      </Grid>
      <ModalTarefas openModal={open} closeModal={handleClose} tarefaID="salvar" />
    </Box>
  );
};

export default TarefasHeader;
