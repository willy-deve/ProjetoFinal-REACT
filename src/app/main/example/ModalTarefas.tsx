/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectUser } from 'app/store/userSlice';
import { IData } from 'app/services/api';
import { atualizarTarefa, criarTarefa, selectById, updateTarefa } from './store/TarefasSlices';

interface DialogProps {
  tarefaID: string;
  openModal: boolean;
  closeModal: () => void;
}

const ModalTarefas: React.FC<DialogProps> = ({ openModal, closeModal, tarefaID }) => {
  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [detalhamento, setDetalhamento] = useState('');
  const [modoEditar, setModoEditar] = useState(false);
  const recado = useAppSelector((state) => selectById(state, tarefaID));

  const usuarioLogado = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    if (tarefaID !== 'salvar') {
      setModoEditar(true);
      setDescricao(recado?.description ?? '');
      setDetalhamento(recado?.detail ?? '');
    }
  }, []);

  const handleSave = () => {
    const { token } = usuarioLogado.data;

    const novaTarefa: IData = {
      description: descricao,
      detail: detalhamento,
      token,
    };

    console.log(novaTarefa);
    dispatch(criarTarefa({ url: '/task', data: novaTarefa }));

    closeModal();
  };

  const handleAtualizar = () => {
    const { token } = usuarioLogado.data;

    const recadoAtualizado = {
      id: tarefaID,
      description: descricao,
      detail: detalhamento,
      token,
    };

    dispatch(atualizarTarefa({ url: '/task', data: recadoAtualizado }));
    dispatch(
      updateTarefa({ id: tarefaID, changes: { description: descricao, detail: detalhamento } })
    );

    closeModal();
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {modoEditar ? (
            <Typography variant="h6">Editar Tarefa</Typography>
          ) : (
            <Typography variant="h6">Cadastrar Tarefa</Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="mt-5">
            <TextField
              id="outlined-basic"
              value={descricao}
              onChange={(ev) => setDescricao(ev.target.value)}
              label="Descrição"
              variant="filled"
              fullWidth
              className="mb-5 mt-5"
            />
            <TextField
              id="outlined-basic"
              value={detalhamento}
              onChange={(ev) => setDetalhamento(ev.target.value)}
              label="Detalhamento"
              variant="filled"
              fullWidth
              className="mb-5 mt-5"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} autoFocus>
            Cancelar
          </Button>
          <Button onClick={modoEditar ? handleAtualizar : handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalTarefas;
