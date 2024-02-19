import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMetodoPago } from '../models/metodoPago.model';
import { IResponse } from '../models/responseApi.model';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../constant/constants';

@Injectable({
  providedIn: 'root',
})
export class MetodopagoService {
  constructor(private http: HttpClient) {}

  getMetodoPago(): Observable<IResponse<IMetodoPago[]>> {
    return this.http.get<IResponse<IMetodoPago[]>>(
      `${apiEndPoint.MetodoPagoEndPoint.get}`
    );
  }
}
