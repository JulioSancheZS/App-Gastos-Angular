import { Component } from '@angular/core';
import { sidebarMenu } from '../../shared/sidebarMenu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  sidebarMenu = sidebarMenu.filter((sidebarMenu) => !!sidebarMenu.card);
}
