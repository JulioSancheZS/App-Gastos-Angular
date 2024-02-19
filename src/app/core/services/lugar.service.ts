import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../models/responseApi.model';
import { ILugar } from '../models/lugar.model';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../constant/constants';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private http: HttpClient) { 
  }

  getLugar(): Observable<IResponse<ILugar[]>>{
    return this.http.get<IResponse<ILugar[]>>(`${apiEndPoint.LugarEndPoint.get}`)
}

postLugar(data: ILugar): Observable<IResponse<ILugar>>{
    return this.http.post<IResponse<ILugar>>(`${apiEndPoint.LugarEndPoint.post}`, data)
}

putLugar(data: ILugar): Observable<IResponse<ILugar>>{
  return this.http.put<IResponse<ILugar>>(`${apiEndPoint.LugarEndPoint.post}`, data);
}

}
