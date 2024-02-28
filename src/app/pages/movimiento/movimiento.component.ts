import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../core/services/transaccion.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITransaccion } from '../../core/models/transaccion.model';
import { AddMovimientoComponent } from './modal/add-movimiento/add-movimiento.component';
import { Guid } from 'guid-typescript';
import { CategoriaService } from '../../core/services/categoria.service';
import { ICategoria } from '../../core/models/categoria.model';
import { LugarService } from '../../core/services/lugar.service';
import { ILugar } from '../../core/models/lugar.model';
import { MetodopagoService } from '../../core/services/metodopago.service';
import { IMetodoPago } from '../../core/models/metodoPago.model';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-movimiento',
  standalone: true,
  imports: [AddMovimientoComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './movimiento.component.html',
  styleUrl: './movimiento.component.css',
})
export class MovimientoComponent implements OnInit {
  /**
   *
   */

  listTransaccion: ITransaccion[] = [];

  fechaActual?: Date;
  nombreMes: string | undefined;
  anio: number | undefined;

  //FK
  listCategoria: ICategoria[] = [];
  listLugar: ILugar[] = [];
  listMetodoPago: IMetodoPago[] = [];

  formsTransaccion!: FormGroup;
  tituloModal: string = 'Nueva Transacción';

  isSlidePanelOpen = false;
  idTransaccion: Guid | null = null;
  datePickerConfig: any;

  totalMonto: number = 0;


  //Modal
  onCloseModalPanel() {
    this.isSlidePanelOpen = false;
    this.formsTransaccion.reset();
  }

  openModalPanel() {
    this.isSlidePanelOpen = true;
  }

  constructor(
    private transaccionService: TransaccionService,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private lugarService: LugarService,
    private metodoPagoService: MetodopagoService
  ) {
    this.formsTransaccion = this.fb.group({
      datapickerFechaTransaccion: new FormControl('', [Validators.required]),
      producto: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      lugar: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      metodoPago: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.fechaActual = new Date();
    this.actualizarNombreMesYAño();

    this.getCategorias();
    this.getLugar();
    this.getMetodoPago();

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
    this.transaccionService.getTransaccion(mes).subscribe({
      next: (response) => {
        if (response.value && response.value.length > 0) {
          this.listTransaccion = response.value;
          console.log(this.listTransaccion)
          this.calcularTotalMonto(); 
          }else{
            this.totalMonto = 0
            this.listTransaccion = []  
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

  onSubmit() {
    if (this.formsTransaccion.valid) {
      const transaccion: ITransaccion = {
        idCategoria: this.formsTransaccion.value.categoria,
        idLugar: this.formsTransaccion.value.lugar,
        idMetodoPago: this.formsTransaccion.value.metodoPago,
        producto: this.formsTransaccion.value.producto,
        descripcion: this.formsTransaccion.value.descripcion,
        monto: this.formsTransaccion.value.monto,
        fechaTransaccion: this.formsTransaccion.value.datapickerFechaTransaccion
      }

      this.transaccionService.postTransaccion(transaccion).subscribe({
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
      this.formsTransaccion.markAllAsTouched();
      console.log(this.formsTransaccion.value);
    }
  }

  //Datapicker

  // private initDatePickerElement(element: any): void {
  //   new Datepicker(element, this.datePickerConfig);
  //   element.addEventListener('changeDate', (e: any) => {
  //     const value = e.target.value;
  //     const formControlName = e.target.getAttribute('datapickerFechaTransaccion');
  //     const formControl = this.formsTransaccion.get(formControlName);
  //     formControl?.setValue(value);
  //     formControl?.markAsDirty();
  //   });
  // }

  getCategorias() {
    this.categoriaService.getCategoria().subscribe({
      next: (response) => {
        if (response.value && response.value.length > 0) {
          this.listCategoria = response.value;
        }
      },
    });
  }

  getLugar() {
    this.lugarService.getLugar().subscribe({
      next: (response) => {
        if (response.value && response.value.length > 0) {
          this.listLugar = response.value;
        }
      },
    });
  }

  getMetodoPago() {
    this.metodoPagoService.getMetodoPago().subscribe({
      next: (response) => {
        if (response.value && response.value.length > 0) {
          this.listMetodoPago = response.value;
        }
      },
    });
  }

  calcularTotalMonto() {
    this.totalMonto = this.listTransaccion.reduce((total, transaccion) => total + (transaccion?.monto || 0), 0);
  }
}
