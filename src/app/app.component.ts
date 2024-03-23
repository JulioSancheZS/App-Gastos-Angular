import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { MainSidebarComponent } from './shared/main-sidebar/main-sidebar.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MainSidebarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app-flowbite-dashboard';

  constructor(private tokenService: TokenService){

  }

  ngOnInit(): void {
    initFlowbite();
  }

  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: any) {
    this.tokenService.removeToken()
  }
}
