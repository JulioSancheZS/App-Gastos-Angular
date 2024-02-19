import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../models/responseApi.model';
import { ICategoria } from '../models/categoria.model';
import { apiEndPoint } from '../constant/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { 

   
  }

  getCategoria(): Observable<IResponse<ICategoria[]>>{
      return this.http.get<IResponse<ICategoria[]>>(`${apiEndPoint.CategoriaEndPoint.get}`)
  }

  postCategoria(data: ICategoria): Observable<IResponse<ICategoria>>{
      return this.http.post<IResponse<ICategoria>>(`${apiEndPoint.CategoriaEndPoint.post}`, data)
  }

  putCategoria(data: ICategoria): Observable<IResponse<ICategoria>>{
    return this.http.put<IResponse<ICategoria>>(`${apiEndPoint.CategoriaEndPoint.post}`, data);
  }

}
