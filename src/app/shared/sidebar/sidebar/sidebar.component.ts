import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SidebarService } from '../../service/sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() extraClass = '';
  @Input() rounded = false;

  constructor(readonly sidebarService: SidebarService) {}
}
