import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ILugar } from '../../core/models/lugar.model';
import { LugarService } from '../../core/services/lugar.service';
import { AddEditLugarComponent } from './modal/add-edit-lugar/add-edit-lugar.component';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-lugar',
  standalone: true,
  imports: [ReactiveFormsModule, AddEditLugarComponent],
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.css',
})
export class LugarComponent implements OnInit {
  /**
   *
   */

  constructor(private fb: FormBuilder, private lugarService: LugarService) {
    this.formLugar = this.fb.group({
      nombreLugar: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getLugar();
  }

  formLugar: FormGroup;
  tituloModal: string = 'Nuevo Lugar';
  listLugar: ILugar[] = [];
  idLugar?: Guid;

  //Modal
  isSlidePanelOpen = false;

  //Modal
  onCloseModalPanel() {
    this.isSlidePanelOpen = false;
    this.formLugar.reset();
  }

  openModalPanel() {
    this.isSlidePanelOpen = true;
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

  onSubmit() {
    if (this.formLugar.valid) {
      const lugar: ILugar = {
        idLugar: this.idLugar,
        nombreLugar: this.formLugar.value.nombreLugar,
      };

      if (this.idLugar != null) {
        this.lugarService.putLugar(lugar).subscribe({
          next: (response) => {
            if (response.status) {
              this.getLugar();
              this.onCloseModalPanel();
              console.log(response.msg);
            }
          },
        });
      } else {
        this.lugarService.postLugar(lugar).subscribe({
          next: (response) => {
            if (response.status) {
              this.getLugar();
              this.onCloseModalPanel();
              console.log(response.msg);
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    } else {
      this.formLugar.markAllAsTouched();
    }
  }

  //Editar modal

  onEditarForm(item: ILugar) {
    this.idLugar = item.idLugar;
    //para pasar datos al formulario
    this.formLugar.patchValue({
      nombreLugar: item.nombreLugar,
    });

    //  this.formsCategoria.get('color')?.setValue(item.color);
    this.openModalPanel();
  }
}
