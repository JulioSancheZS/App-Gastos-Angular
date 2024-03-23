import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../models/responseApi.model';
import { IIngresos } from '../models/ingresos.model';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../constant/constants';

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  constructor(private http: HttpClient) {}

  getIngresos(mes: Date): Observable<IResponse<IIngresos[]>> {
    const year = mes.getFullYear();

 // Agregar 1 al mes, ya que los meses en JavaScript van de 0 a 11
 const month = (mes.getMonth() + 1).toString().padStart(2, '0');
 const day = mes.getDate().toString().padStart(2, '0');

 // Formatear la fecha en el formato deseado ('yyyy/mm/dd')
 const formattedDate = `${year}-${month}-${day}`;
    const url = `${apiEndPoint.IngresoEndPoint.getByFecha}?mes=${formattedDate}`;

    return this.http.get<IResponse<IIngresos[]>>(url);
  }

  postIngresos(data: IIngresos): Observable<IResponse<IIngresos>> {
    return this.http.post<IResponse<IIngresos>>(
      `${apiEndPoint.IngresoEndPoint.post}`,
      data
    );
  }
}
