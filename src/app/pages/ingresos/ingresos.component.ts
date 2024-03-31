import { Component, OnInit } from '@angular/core';
import { IIngresos } from '../../core/models/ingresos.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngresosService } from '../../core/services/ingresos.service';
import { Guid } from 'guid-typescript';
import { CommonModule } from '@angular/common';
import { AddIngresosComponent } from './modal/add-ingresos/add-ingresos.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, AddIngresosComponent, ReactiveFormsModule,NgxPaginationModule],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css'
})
export class IngresosComponent implements OnInit{

  p: number = 1;

  listIngresos: IIngresos[] = [];

  fechaActual?: Date;
  nombreMes: string | undefined;
  anio: number | undefined;

  formsIngresos!: FormGroup;
  tituloModal: string = 'Nuevo Ingreso';

  isSlidePanelOpen = false;
  idIngresos: Guid | null = null;
  datePickerConfig: any;

  totalMonto: number = 0;


  //Modal
  onCloseModalPanel() {
    this.isSlidePanelOpen = false;
    this.formsIngresos.reset();
  }

  openModalPanel() {
    this.isSlidePanelOpen = true;
  }

  constructor(
    private ingresoService: IngresosService,
    private fb: FormBuilder,

  ) {
    
    this.formsIngresos = this.fb.group({
      monto: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required])
    
    });
  }
  ngOnInit(): void {
    this.fechaActual = new Date();
    this.actualizarNombreMesYAño();

    // this.fechaActual = new Date
    // console.log(this.fechaActual)
    this.getTransaccionByMes(this.fechaActual)
    }



  obtenerNombreMes(numeroMes: number): string {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return meses[numeroMes];
  }

  getTransaccionByMes(mes: Date) {
    this.ingresoService.getIngresos(mes).subscribe({
      next: (response) => {
        if (response.value && response.value.length > 0) {
          this.listIngresos = response.value;
          console.log(this.listIngresos)
          this.calcularTotalMonto(); 
          }else{
            this.totalMonto = 0
            this.listIngresos = []  
        }
      },
    });
  }

  avanzarMes(fecha: Date): Date {
    // Obtenemos el mes actual
    let mes = fecha.getMonth();

    // Avanzamos al siguiente mes
    mes++;

    // Si llegamos a diciembre, volvemos a enero del siguiente año
    if (mes === 12) {
      fecha.setFullYear(fecha.getFullYear() + 1);
      mes = 0; // Enero
    }

    // Establecemos el nuevo mes en la fecha
    fecha.setMonth(mes);

    return fecha;
  }

  avanzarUnMes(): void {
    this.fechaActual = this.avanzarMes(this.fechaActual!);
    this.actualizarNombreMesYAño();
    this.getTransaccionByMes(this.fechaActual)

  }

  actualizarNombreMesYAño(): void {
    this.nombreMes = this.obtenerNombreMes(this.fechaActual!.getMonth());
    this.anio = this.fechaActual!.getFullYear();
  }

  retrocederMes(fecha: Date): Date {
    // Obtenemos el mes actual
    let mes = fecha.getMonth();

    // Retrocedemos al mes anterior
    mes--;

    // Si el mes es enero, retrocedemos al mes de diciembre del año anterior
    if (mes < 0) {
      fecha.setFullYear(fecha.getFullYear() - 1);
      mes = 11; // Diciembre
    }

    // Establecemos el nuevo mes en la fecha
    fecha.setMonth(mes);

    return fecha;
  }

  retrocederUnMes(): void {
    this.fechaActual = this.retrocederMes(this.fechaActual!);
    this.actualizarNombreMesYAño();
    this.getTransaccionByMes(this.fechaActual)

  }

  calcularTotalMonto() {
    this.totalMonto = this.listIngresos.reduce((total, ingresos) => total + (ingresos?.monto || 0), 0);
  }


  onSubmit() {
    if (this.formsIngresos.valid) {
      const ingresos: IIngresos = {
     
        descripcion: this.formsIngresos.value.descripcion,
        monto: this.formsIngresos.value.monto,
      }

      this.ingresoService.postIngresos(ingresos).subscribe({
        next: (response) => {
          if (response.status) {
            this.onCloseModalPanel();
            this.getTransaccionByMes(this.fechaActual!)
            console.log(response.msg);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.formsIngresos.markAllAsTouched();
      console.log(this.formsIngresos.value);
    }
  }

}
