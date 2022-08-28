/* eslint-disable camelcase */
import axios from 'axios';

export interface ITarefa {
  id: string;
  description: string;
  detail: string;
  user_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IData {
  id?: string;
  description: string;
  detail: string;
  token: string;
}

export const api = axios.create({
  baseURL: 'https://api-tasks-list.herokuapp.com',
});

// LISTAR TODAS TAREFAS DE UM USUÁRIO
async function onGet(url: string, token: string): Promise<ITarefa[]> {
  try {
    const response = await api.get(url, {
      params: {
        token,
      },
    });

    return response.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// CREATE - criar um recado
async function onPost(url: string, data: IData): Promise<ITarefa | null> {
  try {
    const response = await api.post(url, data);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// DELETE - XABLAU RECADO!
async function onDelete(url: string, id: string, token: string): Promise<boolean> {
  try {
    const response = await api.delete(`${url}/${id}?token=${token}`);
    return response.data.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// UPDATE - EDIÇÂO RECADO!
async function onUpdate(url: string, data: IData): Promise<boolean> {
  try {
    const response = await api.put(url, data);
    return response.data.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { onGet, onPost, onDelete, onUpdate };
