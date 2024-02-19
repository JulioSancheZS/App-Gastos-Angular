import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMetodoPago } from '../models/metodoPago.model';
import { IResponse } from '../models/responseApi.model';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../constant/constants';
import { ITransaccion } from '../models/transaccion.model';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {
  constructor(private http: HttpClient) {}

  getTransaccion(mes: Date): Observable<IResponse<ITransaccion[]>> {
    // Formatear el mes en el formato deseado (por ejemplo, 'YYYY-MM')
    const formattedMonth = mes.toISOString(); // Formato 'YYYY-MM'

    // Concatenar el mes formateado a la URL
    const url = `${apiEndPoint.TransaccionEndPoint.getByFecha}?mes=${formattedMonth}`;

    // Realizar la solicitud HTTP
    return this.http.get<IResponse<ITransaccion[]>>(url);
  }

  postTransaccion(data: ITransaccion): Observable<IResponse<ITransaccion>>{
    return this.http.post<IResponse<ITransaccion>>(`${apiEndPoint.TransaccionEndPoint.post}`, data)
}

}
