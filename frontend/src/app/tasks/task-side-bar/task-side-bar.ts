import { Component } from '@angular/core';
import { count } from 'console';

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
  catItems = [
    { label: 'Personal', color: 'bg-red-500', count: '10' },
    { label: 'Work', color: 'bg-green-500', count: '5' },
    { label: 'Others', color: 'bg-yellow-500', count: '15' },
  ];
  tags = [
    { label: 'Urgent', color: 'bg-red-500', },
    { label: 'Important', color: 'bg-blue-500', },
  ];
  addTag() {
    if (this.newTag.trim()) {
      this.tags.push({ label: this.newTag, color: 'bg-gray-200' });
      this.newTag = '';
      this.showTagInput = false;
    }
  }
}
