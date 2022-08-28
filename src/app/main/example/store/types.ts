import { IData } from 'app/services/api';

export interface IGetParametro {
  url: string;
  token: string;
}
export interface IPostParametro {
  url: string;
  data: IData;
}
export interface IDeleteParametro {
  url: string;
  id: string;
  token: string;
}
