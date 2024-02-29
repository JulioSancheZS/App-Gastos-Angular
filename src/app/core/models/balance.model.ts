import { Guid } from "guid-typescript";

export interface IBalance {
    idBalance?: Guid,
    idUsuario: Guid,
    monto: number,
    fechaActualizacion: Date
}