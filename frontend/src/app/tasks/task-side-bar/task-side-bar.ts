import { Component, OnInit } from '@angular/core';
import { Tag } from '../../models/tag.model';
import { generateRandomColor } from '../../utilities/utilities';
import { Data } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-task-side-bar',
  standalone: false,
  templateUrl: './task-side-bar.html',
  styleUrl: './task-side-bar.css'
})
export class TaskSideBar {
  showTagInput = false;
  newTag = '';
  menuItems = [
    { label: 'Upcoming', icon: 'upcoming', color: 'text-blue-500', count: '0', isActive: false },
    { label: 'Tasks', icon: 'tasks', color: 'text-green-500', count: '0', isActive: true },
    { label: 'Calendar', icon: 'calendar', color: 'text-purple-500', isActive: false },
    { label: 'Sticky List', icon: 'note', color: 'text-yellow-500', isActive: false },
  ];
  catItems: Category[] = [];
  tasksCount = 0;
  constructor(private dataService: DataService) {

    this.dataService.categories$.subscribe((cats: Category[]) => {
      console.log("Categories: ", cats);
      this.catItems = cats;
    });
    this.dataService.tasks$.subscribe((tasks: any[]) => {
      this.tasksCount = tasks.length;
      this.menuItems[1].count = tasks.length.toString();
    });
  }


}
