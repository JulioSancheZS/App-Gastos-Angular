import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-edit-lugar',
  standalone: true,
  imports: [],
  templateUrl: './add-edit-lugar.component.html',
  styleUrl: './add-edit-lugar.component.css'
})
export class AddEditLugarComponent {

  @Input() isOpen = false;
  @Input() headerText = 'Slide Panel Header';
  @Output() onClose = new EventEmitter();

  onClosePanel() {
    this.onClose.emit(false);
  }
  
}
