import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar/sidebar.component';
import { SidebarItemGroupComponent } from '../sidebar/sidebar-item-group/sidebar-item-group.component';
import { SidebarItemComponent } from '../sidebar/sidebar-item/sidebar-item.component';
import { RouterModule } from '@angular/router';
import { sidebarMenu } from '../sidebarMenu';
import { NavbarComponent } from '../sidebar/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BadgeComponent } from '../sidebar/badge/badge.component';
import { SidebarService } from '../service/sidebar';
import { SanitizeHtmlPipe } from "../pipes/sanitize-html.pipe";
import { FooterComponent } from '../components/footer/footer.component';

@Component({
    selector: 'app-main-sidebar',
    standalone: true,
    templateUrl: './main-sidebar.component.html',
    styleUrl: './main-sidebar.component.css',
    imports: [
        CommonModule,
        HeaderComponent,
        SidebarComponent,
        SidebarItemGroupComponent,
        SidebarItemComponent,
        RouterModule,
        BadgeComponent,
        SanitizeHtmlPipe,
        FooterComponent
    ]
})
export class MainSidebarComponent implements OnInit {
  constructor(readonly sidebarService: SidebarService) {
    //console.log(sidebarMenu);
  }

  sidebarMenu = sidebarMenu;
  activeSubmenus: boolean[] = [];

  ngOnInit(): void {
    this.activeSubmenus = this.sidebarMenu.map(
      (menu) => !!menu.submenu && menu.submenu.length > 0
    );
  }

  toggleSubMenu(index: number): void {
    this.activeSubmenus[index] = !this.activeSubmenus[index];
  }

  isSubMenuActive(index: number): boolean {
    return this.activeSubmenus[index];
  }
}
