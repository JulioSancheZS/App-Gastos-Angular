import { Component, OnInit, ViewChild } from '@angular/core';
import { sidebarMenu } from '../../shared/sidebarMenu';
import { CommonModule } from '@angular/common';
import { Data, RouterModule } from '@angular/router';
import { BalanceService } from '../../core/services/balance.service';
import { IBalance } from '../../core/models/balance.model';
import { DashboardService } from '../../core/services/dashboard.service';
import { ITransaccion } from '../../core/models/transaccion.model';
import { IGastosSemana } from '../../core/models/gastosSemana.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IGastosPorCategoria } from '../../core/models/gastosPorCategoria.model';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';

import { ChartComponent, ApexChart } from 'ng-apexcharts';
import { INumTotalGastos } from '../../core/models/numTotalGastos.model';
import { ITotalGastos } from '../../core/models/totalGastos.model';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  sidebarMenu = sidebarMenu.filter((sidebarMenu) => !!sidebarMenu.card);

  fechaHoy?: Data;
  formDate!: FormGroup;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(
    private _balanceService: BalanceService,
    private _dashboardService: DashboardService,
    private fb: FormBuilder
  ) {
    this.formDate = this.fb.group({
      fechaFiltroCharts: new FormControl('', [Validators.required]),
    });

    this._simplePieChart(this.gastosPorCategoria);

    // this.chartOptions = {
    //   series: [44, 55, 13, 43, 22],
    //   chart: {
    //     width: 380,
    //     type: "pie"
    //   },
    //   labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: "bottom"
    //         }
    //       }
    //     }
    //   ]
    // };

    // this.formDate.get("datapickerFechaTransaccion").valueChanges.subscribe(selectedValue => {
    //   console.log('firstname value changed')
    //   console.log(selectedValue)
    // })
  }

  //Grafico
  _simplePieChart(data: IGastosPorCategoria[]) {
    if (data && data.length > 0) {
      // Verifica si data no es null ni undefined y si tiene elementos
      const series = data.map((item) => item.totalGastos);
      const labels = data.map((item) => item.nombreCategoria);

      this.chartOptions = {
        series: series,
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      };
    } else {
      // Si no hay datos, muestra un mensaje
      this.chartOptions = {
        series: [1],
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['No hay datos para mostrar'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      };
    }
  }

  ngOnInit(): void {
    this.getBalance();
    this.getUltimosGastos();
    this.getResumenSemanal();

    this.fechaHoy = new Date();
    this.formDate
      .get('fechaFiltroCharts')
      ?.valueChanges.subscribe((selectedValue) => {
        const fechaSelect = new Date(selectedValue);
        fechaSelect.setDate(fechaSelect.getDate() + 1);
        this.getCategoriaPorDia(fechaSelect);
      });

      this.getTotalNumGastos();
      this.getTotalGastos();
  }

  balance?: IBalance;
  ultimosGastos: ITransaccion[] = [];
  resumen: IGastosSemana[] = [];
  gastosPorCategoria: IGastosPorCategoria[] = [];
     
  numTotalGastos!: INumTotalGastos;
  totalGastos!: ITotalGastos;

  getBalance() {
    this._balanceService.getBalanceByIdUsuario().subscribe({
      next: (response) => {
        if (response) {
          this.balance = response.value;
        }
      },
      error: (error) => {
        console.error(`Esto es un error: ${error}`);
      },
    });
  }

  getUltimosGastos() {
    this._dashboardService.getUltimosGastos().subscribe({
      next: (response) => {
        if (response) {
          this.ultimosGastos = response.value;
        }
      },
    });
  }

  getResumenSemanal() {
    this._dashboardService.getResumenSemanal().subscribe({
      next: (response) => {
        if (response) {
          this.resumen = response.value;
        }
      },
    });
  }

  getCategoriaPorDia(fecha: Date) {
    this._dashboardService.getGastoCateroriaPorDia(fecha).subscribe({
      next: (response) => {
        if (response) {
          this.gastosPorCategoria = response.value;
          this._simplePieChart(this.gastosPorCategoria);
        }
      },
    });
  }

  getTotalNumGastos() {
    this._dashboardService.getTotalNumGastos().subscribe({
      next: (response) => {
        if (response) {
          this.numTotalGastos = response.value;
        }
      },
    });
  }

  getTotalGastos() {
    this._dashboardService.getTotalGastos().subscribe({
      next: (response) => {
        if (response) {
          this.totalGastos = response.value;
        }
      },
    });
  }
}
