import { Component, OnInit } from '@angular/core';
import { AddEditCategoriaComponent } from './modal/add-edit-categoria/add-edit-categoria.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../core/services/categoria.service';
import { ICategoria } from '../../core/models/categoria.model';
import { Guid } from 'guid-typescript';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [AddEditCategoriaComponent, ColorPickerModule, PickerComponent, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  constructor(private categoriaService: CategoriaService, private fb: FormBuilder){
      this.formsCategoria = this.fb.group({
         nombreCategoria: new FormControl('', [Validators.required]),
         icono: new FormControl('', [Validators.required]),
         color: new FormControl('', [Validators.required]),
      });
  }

  p: number = 1;

  formsCategoria!: FormGroup

  listCategoria: ICategoria[] = [];
  nuevoArray: ICategoria[] = [];

  tituloModal: string = 'Nueva Categoria';

  idCategoria: Guid | null = null;

  ngOnInit(): void {
    this.getCategorias();
  }

  //Get Categoria
  getCategorias(){
    this.categoriaService.getCategoria().subscribe({
      next: (response) => {
        if(response.value && response.value.length > 0){
          this.listCategoria = response.value;
          this.convertirEmojis(); // Llamar a la función de conversión cuando se obtienen las categorías
        }  
      }
    });
  }

  onSubmit(){
    if(this.formsCategoria.valid){

      const categoria: ICategoria = {
        idCategoria: this.idCategoria,
        color: this.formsCategoria.value.color,
        nombreCategoria: this.formsCategoria.value.nombreCategoria,
        icono: this.formsCategoria.value.icono
      }

      if(this.idCategoria != null){
        this.categoriaService.putCategoria(categoria).subscribe({
          next:(response) => {
             if(response.status){
                this.getCategorias();
                this.onCloseModalPanel();
                console.log(response.msg)
             }
          }
        })
      }
      else{

        this.categoriaService.postCategoria(categoria).subscribe({
          next: (response) =>{
              if(response.status){
                this.getCategorias();
                this.onCloseModalPanel();
              }
          },
          error: (error) => {
            console.error(error)
          }
        })

      }

    }else{
      this.formsCategoria.markAllAsTouched();
    }
  }

//Mostrar Emojin
  convertirEmoji(emojiString: string): string {
    const emojiCode = parseInt(emojiString.substring(2), 16);
    return String.fromCodePoint(emojiCode);
  }


convertirEmojis() {
    this.nuevoArray = this.listCategoria.map((categoria: ICategoria) => {
      const emojiUnicode = categoria.icono;
      const emoji = this.convertirEmoji(emojiUnicode);
      return {
          ...categoria,
          icono: emoji
      };
    });
}

  color: string = ''

  onColorChange(event: any) {
    if (event) {
      this.color = event
      this.formsCategoria.get('color')?.setValue(this.color); // Actualiza el valor del campo color en el formulario

    } else {
      console.error('El objeto de color es inválido:', event);
    }
  }

  isSlidePanelOpen = false;

  //Modal
  onCloseModalPanel() {
    this.isSlidePanelOpen = false;
    this.formsCategoria.reset();
  }

  openModalPanel() {
    this.isSlidePanelOpen = true;
  }

  // Pick Emojin
  selectedEmoji: string = ''; 
  emojiPickerOpen: boolean = false;

  onOpenPick() {
    this.emojiPickerOpen = !this.emojiPickerOpen;
  }

  onClosePick() {
    this.emojiPickerOpen = false;
  }

  codeUnified: string = ''
  handleEmojiClick(event: any) {
    this.selectedEmoji = event.emoji.native;
    this.codeUnified = `u{${event.emoji.unified}}`
    this.formsCategoria.get('icono')?.setValue(this.codeUnified); // Actualiza el valor del campo icono en el formulario
    this.onClosePick();
  }

  //Editar modal

  onEditarForm(item: ICategoria){
     this.idCategoria = item.idCategoria
     //para pasar datos al formulario
     this.formsCategoria.patchValue({
      nombreCategoria: item.nombreCategoria,
      color: item.color,
      icono: item.icono
     });

    //  this.formsCategoria.get('color')?.setValue(item.color);
     this.openModalPanel()
  }
}
