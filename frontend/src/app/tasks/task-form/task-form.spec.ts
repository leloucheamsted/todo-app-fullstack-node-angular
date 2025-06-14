import { TaskForm } from './task-form';
import { DataService } from '../../core/services/data.service';
import { CreateTaskUseCase } from '../../core/use_cases/tasks/create_task_usecase';
import { UpdateTaskUseCase } from '../../core/use_cases/tasks/update_task_usecase';
import { DeleteTaskUseCase } from '../../core/use_cases/tasks/delete_task_usecases';
import { BehaviorSubject, of } from 'rxjs';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { Tag } from '../../models/tag.model';

describe('TaskForm Component', () => {
  let component: TaskForm;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let createTaskSpy: jasmine.SpyObj<CreateTaskUseCase>;
  let updateTaskSpy: jasmine.SpyObj<UpdateTaskUseCase>;
  let deleteTaskSpy: jasmine.SpyObj<DeleteTaskUseCase>;

  let categories$: BehaviorSubject<Category[]>;
  let tags$: BehaviorSubject<Tag[]>;
  let currentTask$: BehaviorSubject<Task | null>;

  beforeEach(() => {
    categories$ = new BehaviorSubject<Category[]>([
      { id: 1, name: 'Cat1', color: '#fff' }
    ]);
    tags$ = new BehaviorSubject<Tag[]>([
      { id: 1, name: 'Tag1', color: '#000' }
    ]);
    currentTask$ = new BehaviorSubject<Task | null>(null);

    dataServiceSpy = jasmine.createSpyObj('DataService', [
      'setCurrentTask', 'setTasks', 'getTasks'
    ], {
      categories$: categories$.asObservable(),
      tags$: tags$.asObservable(),
      currentTask$: currentTask$.asObservable()
    });

    createTaskSpy = jasmine.createSpyObj('CreateTaskUseCase', ['call']);
    updateTaskSpy = jasmine.createSpyObj('UpdateTaskUseCase', ['call']);
    deleteTaskSpy = jasmine.createSpyObj('DeleteTaskUseCase', ['call']);

    dataServiceSpy.getTasks.and.returnValue([]);

    component = new TaskForm(
      dataServiceSpy,
      createTaskSpy,
      deleteTaskSpy,
      updateTaskSpy
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should clean fields', () => {
    component.taskTitle = 'title';
    component.taskDescription = 'desc';
    component.selectedCategoryId = 2;
    component.task = { id: 1, title: 't', description: 'd', created_at: '', updated_at: '', categoryId: 2, tags: [] };
    component.cleanField();
    expect(component.taskTitle).toBe('');
    expect(component.taskDescription).toBe('');
    expect(component.selectedCategoryId).toBeNull();
    expect(component.task.id).toBe(0);
  });

  it('should call createTask on saveTask for new task', async () => {
    component.task = { id: 0, title: 't', description: 'd', created_at: '', updated_at: '', categoryId: 1, tags: [] };
    createTaskSpy.call.and.returnValue(Promise.resolve({ ...component.task, id: 2 }));
    await component.saveTask();
    expect(createTaskSpy.call).toHaveBeenCalled();
    expect(dataServiceSpy.setCurrentTask).toHaveBeenCalled();
    expect(dataServiceSpy.setTasks).toHaveBeenCalled();
  });

  it('should call updateTask on saveTask for existing task', async () => {
    component.task = { id: 5, title: 't', description: 'd', created_at: '', updated_at: '', categoryId: 1, tags: [] };
    updateTaskSpy.call.and.returnValue(Promise.resolve({ ...component.task }));
    dataServiceSpy.getTasks.and.returnValue([component.task]);
    await component.saveTask();
    expect(updateTaskSpy.call).toHaveBeenCalled();
    expect(dataServiceSpy.setCurrentTask).toHaveBeenCalled();
    expect(dataServiceSpy.setTasks).toHaveBeenCalled();
  });

  it('should call deleteTask and update dataService on deleteCurrentTask', async () => {
    component.task = { id: 10, title: 't', description: 'd', created_at: '', updated_at: '', categoryId: 1, tags: [] };
    deleteTaskSpy.call.and.returnValue(Promise.resolve({ id: 10, title: '', description: '', created_at: '', updated_at: '', categoryId: 1, tags: [] }));
    dataServiceSpy.getTasks.and.returnValue([component.task]);
    await component.deleteCurrentTask(10);
    expect(deleteTaskSpy.call).toHaveBeenCalledWith(10);
    expect(dataServiceSpy.setTasks).toHaveBeenCalled();
    expect(dataServiceSpy.setCurrentTask).toHaveBeenCalledWith(null);
  });

  it('should update created_at on onChange', () => {
    const date = new Date();
    component.onChange(date);
    expect(component.task.created_at).toBe(date.toISOString());
  });
});