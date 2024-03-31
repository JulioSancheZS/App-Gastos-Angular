import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../models/responseApi.model';
import { IGastosSemana } from '../models/gastosSemana.model';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../constant/constants';
import { ITransaccion } from '../models/transaccion.model';
import { IGastosPorCategoria } from '../models/gastosPorCategoria.model';
import { INumTotalGastos} from '../models/numTotalGastos.model';
import { ITotalGastos } from '../models/totalGastos.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  //Últimos gastos
  getUltimosGastos(): Observable<IResponse<ITransaccion[]>> {
    return this.http.get<IResponse<ITransaccion[]>>(
      `${apiEndPoint.DashboardEndPoin.getUltimosGastos}`
    );
  }

  // Resumen semanal
  getResumenSemanal(): Observable<IResponse<IGastosSemana[]>> {
    return this.http.get<IResponse<IGastosSemana[]>>(
      `${apiEndPoint.DashboardEndPoin.getResumen}`
    );
  }
  

  //Gastos por categorias
  //Por Dia
  getGastoCateroriaPorDia(fecha: Date): Observable<IResponse<IGastosPorCategoria[]>> {

    const year = fecha.getFullYear();

    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const url = `${apiEndPoint.DashboardEndPoin.getGastosPorCategoriaPorFecha}?fecha=${formattedDate}`;

    return this.http.get<IResponse<IGastosPorCategoria[]>>(url);
  }

    //Por Mes
    getGastoCateroriaPorMes(fecha: Date): Observable<IResponse<IGastosPorCategoria[]>> {
      const year = fecha.getFullYear();
  
      const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const day = fecha.getDate().toString().padStart(2, '0');
  
      const formattedDate = `${year}-${month}-${day}`;
  
      const url = `${apiEndPoint.DashboardEndPoin.getGastosPorCategoriaPorMes}?fecha=${formattedDate}`;
  
      return this.http.get<IResponse<IGastosPorCategoria[]>>(url);
    }

    //Por Anio
    getGastoCateroriaPorAnio(fecha: Date): Observable<IResponse<IGastosPorCategoria[]>> {
      const year = fecha.getFullYear();
  
      const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const day = fecha.getDate().toString().padStart(2, '0');
  
      const formattedDate = `${year}-${month}-${day}`;
  
      const url = `${apiEndPoint.DashboardEndPoin.getGastosPorCategoriaPorAnio}?fecha=${formattedDate}`;
  
      return this.http.get<IResponse<IGastosPorCategoria[]>>(url);
    }


    getTotalNumGastos(): Observable<IResponse<INumTotalGastos>> {
      return this.http.get<IResponse<INumTotalGastos>>(
        `${apiEndPoint.DashboardEndPoin.getNumGastosMes}`
      );
    }
    
    getTotalGastos(): Observable<IResponse<ITotalGastos>> {
      return this.http.get<IResponse<ITotalGastos>>(
        `${apiEndPoint.DashboardEndPoin.getTotalGastosMes}`
      );
    }
}
