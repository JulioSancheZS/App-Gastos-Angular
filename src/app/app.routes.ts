import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainSidebarComponent } from './shared/main-sidebar/main-sidebar.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { guestGuard } from './core/guard/guest.guard';
import { authGuard } from './core/guard/auth.guard';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { LugarComponent } from './pages/lugar/lugar.component';
import { MovimientoComponent } from './pages/movimiento/movimiento.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    component: RegisterComponent,
  },
  {
    path: '',
    component: MainSidebarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categoria',
        component: CategoriaComponent
      },
      {
        path:'lugar',
        component: LugarComponent
      },
      {
        path:'movimiento',
        component: MovimientoComponent
      }
    ],
  },
];
