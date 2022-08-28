/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ITarefa, onDelete, onGet, onPost, onUpdate } from 'app/services/api';
import { RootState } from 'app/store';
import { IDeleteParametro, IGetParametro, IPostParametro } from './types';

export const atualizarTarefa = createAsyncThunk(
  'tarefas/atualizarTarefas',
  async (dado: IPostParametro) => {
    const { url, data } = dado;
    const response = await onUpdate(url, data)
      .then((res) => (res ? 'Deu bom, atualizado!' : 'Deu ruim, não atualizou'))
      .catch((erro) => 'Deu ruim, não atualizou');

    return response; // pq esse cara vai ser nosso PAYLOAD na store
  }
);

export const buscarTarefas = createAsyncThunk(
  'tarefas/buscarTarefas',
  async (dado: IGetParametro) => {
    const { url, token } = dado;
    const response = await onGet(url, token)
      .then((tarefas) => tarefas)
      .catch((erro) => erro);

    return response; // pq esse cara vai ser nosso PAYLOAD na store
  }
);

export const criarTarefa = createAsyncThunk('tarefas/criarTarefa', async (dado: IPostParametro) => {
  const { url, data } = dado;
  const response = await onPost(url, data)
    .then((tarefa) => tarefa)
    .catch((erro) => erro);
  return response;
});

export const excluirTarefa = createAsyncThunk(
  'tarefas/excluirTarefa',
  async (dado: IDeleteParametro) => {
    const { url, id, token } = dado;
    const response = await onDelete(url, id, token)
      .then((res) => (res ? 'Tarefa excluida!' : 'Não foi possivel excluir a tarefa'))
      .catch((erro) => 'Não foi possivel excluir a tarefa');
    return response;
  }
);

const adapter = createEntityAdapter<ITarefa>({
  selectId: (item) => item.id,
});

export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.tarefas);

const TarefasSlice = createSlice({
  name: 'tarefas',
  initialState: adapter.getInitialState({
    loading: false,
  }),
  reducers: {
    deletarTarefa: adapter.removeOne,
    updateTarefa: adapter.updateOne,
  },
  extraReducers(builder) {
    builder.addCase(buscarTarefas.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(buscarTarefas.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload);
    });
    builder.addCase(criarTarefa.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(criarTarefa.fulfilled, (state, action) => {
      state.loading = false;
      adapter.addOne(state, action.payload);
    });
    builder.addCase(atualizarTarefa.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(excluirTarefa.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
  },
});

export const { deletarTarefa, updateTarefa } = TarefasSlice.actions;
export default TarefasSlice.reducer;
