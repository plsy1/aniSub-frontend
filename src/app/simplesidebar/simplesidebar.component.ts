import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgSimpleSidebarModule,
  NgSimpleSidebarService,
  SimpleSidebarPosition,
  SimpleSidebarItem,
} from 'ng-simple-sidebar';

@Component({
  selector: 'app-simplesidebar',
  standalone: true,
  templateUrl: './simplesidebar.component.html',
  styleUrl: './simplesidebar.component.css',
  imports: [CommonModule, NgSimpleSidebarModule],
})
export class SimplesidebarComponent implements OnInit {
  sidebarItems: SimpleSidebarItem[] = [];

  constructor(private ngSimpleSidebarService: NgSimpleSidebarService) {}

  ngOnInit() {
    this.sidebarItems = [
      {
        name: '首页',
        icon: 'fas fa-home',
        routerLink: ['/'],
        position: SimpleSidebarPosition.top,
      },
      {
        name: '设置',
        icon: 'fas fa-cog',
        routerLink: ['/configure'],
        position: SimpleSidebarPosition.bottom,
      },
    ];

    this.ngSimpleSidebarService.addItems(this.sidebarItems);
    this.ngSimpleSidebarService.configure({
      openIcon: 'fas fa-bars',
      closeIcon: 'fas fa-bars',
    });
  }
}
