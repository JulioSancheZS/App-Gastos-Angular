import { Guid } from "guid-typescript";

export interface ITransaccion {
    idTransaccion?: Guid;
    idUsuario?: Guid;
    idCategoria?: Guid;
    idLugar?: Guid;
    idMetodoPago?: Guid;
    descripcion?: string | null;
    producto?: string | null;
    monto?: number | null;
    fechaTransaccion?: Date | null;
    
    nombreCategoria?: string;
    nombreLugar?: string;
    nombreMetodoPago?: string;
}