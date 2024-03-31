import { FetchBackend, HttpClient } from '@angular/common/http';
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
    const year = mes.getFullYear();

    // Agregar 1 al mes, ya que los meses en JavaScript van de 0 a 11
    const month = (mes.getMonth() + 1).toString().padStart(2, '0');
    const day = mes.getDate().toString().padStart(2, '0');

    // Formatear la fecha en el formato deseado ('yyyy/mm/dd')
    const formattedDate = `${year}-${month}-${day}`;

    // Concatenamos el mes formateado a la URL
    const url = `${apiEndPoint.TransaccionEndPoint.getByFecha}?mes=${formattedDate}`;

    // Realizar la solicitud HTTP
    return this.http.get<IResponse<ITransaccion[]>>(url);
  }

    postTransaccion(data: ITransaccion): Observable<IResponse<ITransaccion>>{
      return this.http.post<IResponse<ITransaccion>>(`${apiEndPoint.TransaccionEndPoint.post}`, data)
  }
}
