import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  showSiderBar = false;
  showAddView = false;


  openSideBar(): void {
    this.showSiderBar = true;
  }

  closeSideBar(): void {
    this.showSiderBar = false;
  }
  openAddView(): void {
    this.showAddView = true;
  }
  closeAddView(): void {
    this.showAddView = false;
  }
}
