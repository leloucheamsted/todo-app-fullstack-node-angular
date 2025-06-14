import { Component } from '@angular/core';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  date = null;
  isEnglish = false;
  taskTitle = '';
  taskDescription = '';
  constructor() { }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
