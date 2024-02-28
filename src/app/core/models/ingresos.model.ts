import { Guid } from "guid-typescript";

export interface IIngresos {
    idIngreso?: Guid;
    idBalance?: Guid;
    monto: number;
    fechaIngreso?: Date;
    descripcion: string;
    idUsuario?: Guid;
}