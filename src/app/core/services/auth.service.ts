import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ILogin } from '../models/login.model';
import { IResponse } from '../models/responseApi.model';
import { map } from 'rxjs';
import { apiEndPoint } from '../constant/constants';
import { ToastrService } from 'ngx-toastr';
import { IRegister } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) {}

  onLogin(data: ILogin) {
    return this.http
      .post<IResponse<ILogin>>(`${apiEndPoint.AuthEndPoint.login}`, data)
      .pipe(
        map((response) => {
          if (response && response.token) {
            this.tokenService.setToken(response.token);
            return response;
          } else {
            this.toastr.warning(response.msg, 'Alerta');
            console.log(response.msg);
            // error, redirigir a login
            throw new Error('No se pudo obtener un token válido.');
          }
        })
      );
  }

  onRegister(data: IRegister) {
    return this.http
      .post<IResponse<IRegister>>(`${apiEndPoint.AuthEndPoint.register}`, data)
      .pipe(
        map((response) => {
          if (response.status) {
            return response;
          } else {
            this.toastr.warning(response.msg, 'Alerta');
            throw new Error('No se pudo obtener un token válido.');
          }
        })
      );
  }

  public decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
