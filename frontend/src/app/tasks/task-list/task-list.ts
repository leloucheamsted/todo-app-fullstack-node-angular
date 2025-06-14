import { Component } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  taks: Task[] = [];
  currentTask: Task | null = null;
  catItems: Category[] = [];
  displayedTasks: Task[] = [];

  showAddView = false;
  constructor(private dataService: DataService) {
    this.dataService.categories$.subscribe((cats: Category[]) => {
      this.catItems = cats;

    });
    this.dataService.tasks$.subscribe((tasks: Task[]) => {
      this.taks = tasks;
      this.displayedTasks = tasks;
    });
    this.dataService.showAddView$.subscribe((show: boolean) => {
      this.showAddView = show;
    });
    this.dataService.currentTask$.subscribe((task: Task | null) => {
      this.currentTask = task;
    });

  }

  updateDisplayedTasks(tasks: Task[]) {
    this.displayedTasks = tasks;
  }


  setCurrentTask(task: Task) {
    if (this.currentTask && this.currentTask.id === task.id) {
      this.dataService.setCurrentTask(null);
      console.log("Task deselected");
    } else {
      this.dataService.setCurrentTask(task);
      if (window.innerWidth <= 768) { // mobile breakpoint
        this.dataService.setShowAddView(true);
      }
    }
  }
  getCategoryColor(categoryId: number | null): string {
    const category = this.catItems.find(cat => cat.id === categoryId);
    return category?.color ? category.color : '#ffffff'; // Default color if not found
  }

}
