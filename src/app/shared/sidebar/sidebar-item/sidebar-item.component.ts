import { Component, Input } from '@angular/core';
import { SidebarService } from '../../service/sidebar';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge/badge.component';
import { RouterModule } from '@angular/router';
import { SanitizeHtmlPipe } from '../../pipes/sanitize-html.pipe';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css',
  imports: [CommonModule, BadgeComponent, RouterModule, SanitizeHtmlPipe],
})
export class SidebarItemComponent {
  @Input() icon?: string;
  @Input() link?: string;
  @Input() label?: string;
  
  @Input() titleSubMenu?: string;
  @Input() isSubMenu?: boolean = false



  constructor(readonly sidebarService: SidebarService) {}

   
}
