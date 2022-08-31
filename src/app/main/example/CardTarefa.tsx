/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectUser } from 'app/store/userSlice';
import ModalTarefas from './ModalTarefas';
import { deletarTarefa, excluirTarefa } from './store/TarefasSlices';

interface CardTarefaProps {
  id: string;
  titulo: string;
  texto: string;
}

const CardTarefa: React.FC<CardTarefaProps> = ({ titulo, texto, id }) => {
  const dispatch = useAppDispatch();
  const usuarioLogado = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleEditar = () => {
    handleOpen();
  };
  const handleApagar = () => {
    const { token } = usuarioLogado.data;

    dispatch(excluirTarefa({ url: '/task', id, token }));
    dispatch(deletarTarefa(id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          background: '#aea1a1',
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              sx={{
                color: '#fff',
              }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {titulo}
            </Typography>

            <Typography
              sx={{
                color: '#fff',
              }}
              variant="body2"
              component="div"
            >
              {texto}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton aria-label="editar tarefa" onClick={() => handleEditar()}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton aria-label="apagar tarefa" onClick={() => handleApagar()}>
            <DeleteIcon color="primary" />
          </IconButton>
        </CardActions>
      </Card>
      <ModalTarefas openModal={open} closeModal={handleClose} tarefaID={id} />
    </>
  );
};

export default CardTarefa;
