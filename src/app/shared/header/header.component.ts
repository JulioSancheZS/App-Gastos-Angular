import { Component, OnInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { DarkThemeToggleComponent } from '../sidebar/dark-theme-toggle/dark-theme-toggle.component';
import { NavbarComponent } from '../sidebar/navbar/navbar.component';
import { SidebarService } from '../service/sidebar';
import { SidebarComponent } from '../sidebar/sidebar/sidebar.component';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DarkThemeToggleComponent,
    NavbarComponent,
    SidebarComponent,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated$;
  
  isOpen: boolean = false

  constructor(
    readonly sidebarService: SidebarService,
    private tokenService: TokenService,
    private routes: Router
  ) {
    this.isAuthenticated$ = this.tokenService.isAuthenticacion;

    const token = this.tokenService.getToken();

    // Verificar si el token es null y proporcionar un valor predeterminado (puede ser un objeto vacío)
    this.decode = token ? this.jwtDecodeService.decodeToken(token) : {};
  }

  private jwtDecodeService = inject(AuthService);
  decode: any;

  ngOnInit(): void {
    initFlowbite();
  }

  onLogout() {
    this.tokenService.removeToken();
    this.routes.navigate(['/']);
  }

  openToggle(){
    this.isOpen = !this.isOpen
  }
}
