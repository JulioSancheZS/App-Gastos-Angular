import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-ingresos',
  standalone: true,
  imports: [],
  templateUrl: './add-ingresos.component.html',
  styleUrl: './add-ingresos.component.css'
})
export class AddIngresosComponent {
  @Input() isOpen = false;
  @Input() headerText = 'Slide Panel Header';
  @Output() onClose = new EventEmitter();

  onClosePanel() {
    this.onClose.emit(false);
  }
}
