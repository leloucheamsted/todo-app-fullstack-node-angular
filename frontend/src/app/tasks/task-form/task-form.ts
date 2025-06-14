import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { Tag } from '../../models/tag.model';
import { CreateTaskUseCase } from '../../core/use_cases/tasks/create_task_usecase';
import { UpdateTaskUseCase } from '../../core/use_cases/tasks/update_task_usecase';
import { getTagsFromIds } from '../../utilities/utilities';
import { DeleteTaskUseCase } from '../../core/use_cases/tasks/delete_task_usecases';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  taskTitle = '';
  taskDescription = '';
  task: Task = {
    id: 0,
    title: '',
    description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categoryId: 0,
    tags: []
  }
  catItems: Category[] = [];
  selectedCategoryId: number | null = 1;
  tags: Tag[] = [];
  selectedTagIds: number[] = []; // This is used to store the selected tag ids

  constructor(private dataService: DataService, private createTask: CreateTaskUseCase,
    private deleteTask: DeleteTaskUseCase,
    private updateTask: UpdateTaskUseCase) {
    this.dataService.categories$.subscribe((cats: Category[]) => {
      this.catItems = cats;
      if (cats.length && !this.selectedCategoryId) {
        this.selectedCategoryId = cats[0].id;
      }
    });
    this.dataService.tags$.subscribe((tags: Tag[]) => {
      this.tags = tags;
    });

    this.dataService.currentTask$.subscribe((task: Task | null) => {
      if (task != null) {
        console.log("Current Task: ", task);
        this.task = task;
        this.selectedCategoryId = task.categoryId ?? 1;
        this.selectedTagIds = task.tags?.map(tag => tag.id) ?? [];
        // this.task.tags = task.tags || [];
      } else {
        this.task = {
          id: 0,
          title: '',
          description: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          categoryId: 0,
          tags: []
        };
        this.selectedCategoryId = 1;
      };
    });
  }

  onChange(result: Date): void {
    this.task.created_at = result.toISOString()
    console.log('onChange: ', result.toISOString());
  }
  cleanField() {
    this.taskDescription = '';
    this.taskTitle = '';

    this.selectedCategoryId = null;
    this.task = {
      id: 0,
      title: '',
      description: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      categoryId: 0,
      tags: []
    };
    this.dataService.setCurrentTask(null);
  }
  deleteCurrentTask(id: number) {
    this.deleteTask.call(id).then(() => {
      const tasks = this.dataService.getTasks().filter(task => task.id !== id);
      this.dataService.setTasks(tasks);
      this.dataService.setCurrentTask(null);
      this.cleanField();
    }
    ).catch((err) => {
      console.log("Error deleting task", err);
    }
    );
  }

  saveTask() {
    if (this.task.id !== 0) {
      const updatedTask: Task = {
        ...this.task,
        title: this.task.title,
        description: this.task.description,
        updated_at: this.task.created_at,
        categoryId: this.selectedCategoryId || undefined,
        category: this.catItems.find(cat => cat.id === this.selectedCategoryId) || undefined,
        tags: this.task.tags
      }
      console.log(this.task.tags);
      this.updateTask.call(updatedTask).then((response) => {
        this.dataService.setCurrentTask(response);
        const tasks = this.dataService.getTasks().map(task => task.id === response.id ? response : task);
        this.dataService.setTasks(tasks);
        this.cleanField();

      }).catch((err) => {
        console.log("error", err)
      })

    } else {
      const newTask: Task = {
        title: this.task.title,
        description: this.task.description,
        created_at: this.task.created_at,
        updated_at: new Date().toISOString(),
        categoryId: this.selectedCategoryId || undefined,
        category: this.catItems.find(cat => cat.id === this.selectedCategoryId) || undefined,
        tags: this.task.tags
      }
      console.log(newTask)
      console.log(this.task.tags);
      this.createTask.call(newTask).then((task) => {
        this.dataService.setCurrentTask(task);
        this.dataService.setTasks([task, ...this.dataService.getTasks()]);
        this.cleanField();
      }).catch((err) => {
        console.log("Error", err)
      })


    }
  }

  // get list of ids by list of tags


}

