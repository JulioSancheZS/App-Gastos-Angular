import { Component, OnInit } from '@angular/core';
import { sidebarMenu } from '../../shared/sidebarMenu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BalanceService } from '../../core/services/balance.service';
import { IBalance } from '../../core/models/balance.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{
  sidebarMenu = sidebarMenu.filter((sidebarMenu) => !!sidebarMenu.card);


  constructor(private _balanceService: BalanceService){

  }
  ngOnInit(): void {

    this.getBalance()
  }

  balance?: IBalance

  getBalance(){
    this._balanceService.getBalanceByIdUsuario().subscribe({
      next: (response) => {
        if(response){
          this.balance = response.value;
          console.log(this.balance)
          
        }  
      }
    });
  }



}
