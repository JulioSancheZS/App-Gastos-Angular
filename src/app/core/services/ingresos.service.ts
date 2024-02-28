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
    const formattedMonth = mes.toISOString();

    const url = `${apiEndPoint.IngresoEndPoint.getByFecha}?mes=${formattedMonth}`;

    return this.http.get<IResponse<IIngresos[]>>(url);
  }

  postIngresos(data: IIngresos): Observable<IResponse<IIngresos>> {
    return this.http.post<IResponse<IIngresos>>(
      `${apiEndPoint.IngresoEndPoint.post}`,
      data
    );
  }
}
