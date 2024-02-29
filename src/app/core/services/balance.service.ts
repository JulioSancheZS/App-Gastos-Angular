import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../models/responseApi.model';
import { HttpClient } from '@angular/common/http';
import { IBalance } from '../models/balance.model';
import { apiEndPoint } from '../constant/constants';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { 

   
  }

  getBalanceByIdUsuario(): Observable<IResponse<IBalance>>{
      return this.http.get<IResponse<IBalance>>(`${apiEndPoint.BalanceEndPoint.getBalanceById}`)
  }
}
