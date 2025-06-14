import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../core/services/data.service';
import { InitTasksUseCase } from '../core/use_cases/tasks/init_tasks_usecase';
import { InitData } from '../models/init.model';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  showSiderBar = false;
  showAddView = false;
  isBusy: boolean = false;

  constructor(private dataService: DataService, private initData: InitTasksUseCase) {
    this.dataService.isBusy$.subscribe((isBusy: boolean) => {
      this.isBusy = isBusy;
    });
  }

  ngOnInit(): void {
    this.dataService.setBusy(true);
    this.initData.call(null).then((data: InitData) => {
      console.log('initialize:', data);
      this.dataService.setData(data);
    }).catch((error) => {
      console.error('Error initializing data:', error);
    }).finally(() => {
      this.dataService.setBusy(false);
    });
  }
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
