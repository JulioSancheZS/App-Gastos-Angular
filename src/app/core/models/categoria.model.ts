import { Guid } from 'guid-typescript';

export interface ICategoria {
  idCategoria: Guid | null;
  nombreCategoria: string;
  icono: string;
  color: string;
}
