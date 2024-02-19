import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-movimiento',
  standalone: true,
  imports: [],
  templateUrl: './add-movimiento.component.html',
  styleUrl: './add-movimiento.component.css'
})
export class AddMovimientoComponent {
  @Input() isOpen = false;
  @Input() headerText = 'Slide Panel Header';
  @Output() onClose = new EventEmitter();

  onClosePanel() {
    this.onClose.emit(false);
  }
  
}
