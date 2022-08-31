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
    <Box className="p-20 h-[75px] ">
      <Grid container>
        <Grid item xl={8}>
          <Typography
            className='font-mono	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;'
            variant="h4"
          >
            Bem vindo aos seus recados
          </Typography>
        </Grid>
        <Grid item xl={4}>
          <Button
            sx={{ marginLeft: '150px', color: 'black' }}
            variant="outlined"
            onClick={handleOpen}
          >
            Novo recado
          </Button>
        </Grid>
      </Grid>

      <ModalTarefas openModal={open} closeModal={handleClose} tarefaID="salvar" />
    </Box>
  );
};

export default TarefasHeader;
