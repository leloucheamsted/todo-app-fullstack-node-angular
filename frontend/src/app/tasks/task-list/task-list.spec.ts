import { TaskList } from './task-list';
import { DataService } from '../../core/services/data.service';
import { of, BehaviorSubject } from 'rxjs';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';

describe('TaskList Component', () => {
  let component: TaskList;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let tasks$: BehaviorSubject<Task[]>;
  let categories$: BehaviorSubject<Category[]>;
  let currentTask$: BehaviorSubject<Task | null>;

  beforeEach(() => {
    tasks$ = new BehaviorSubject<Task[]>([]);
    categories$ = new BehaviorSubject<Category[]>([]);
    currentTask$ = new BehaviorSubject<Task | null>(null);

    dataServiceSpy = jasmine.createSpyObj('DataService', [
      'setCurrentTask'
    ], {
      tasks$: tasks$.asObservable(),
      categories$: categories$.asObservable(),
      currentTask$: currentTask$.asObservable()
    });

    component = new TaskList(dataServiceSpy);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update tasks when tasks$ emits', () => {
    const task: Task = { id: 1, title: 'Test', description: '', created_at: '2025-06-14T10:00:00.000Z', updated_at: '2025-06-14T10:00:00.000Z' };
    tasks$.next([task]);
    expect(component.taks.length).toBe(1);
    expect(component.taks[0].title).toBe('Test');
  });

  it('should update categories when categories$ emits', () => {
    const category: Category = { id: 1, name: 'Cat', color: '#fff' };
    categories$.next([category]);
    expect(component.catItems.length).toBe(1);
    expect(component.catItems[0].name).toBe('Cat');
  });

  it('should update currentTask when currentTask$ emits', () => {
    const task: Task = { id: 2, title: 'Current', description: '', created_at: '2025-06-14T10:00:00.000Z', updated_at: '2025-06-14T10:00:00.000Z' };
    currentTask$.next(task);
    expect(component.currentTask).toEqual(task);
  });

  it('should select and deselect a task', () => {
    const task: Task = { id: 3, title: 'Select', description: '', created_at: '2025-06-14T10:00:00.000Z', updated_at: '2025-06-14T10:00:00.000Z' };
    component.currentTask = null;
    component.setCurrentTask(task);
    expect(dataServiceSpy.setCurrentTask).toHaveBeenCalledWith(task);

    component.currentTask = task;
    component.setCurrentTask(task);
    expect(dataServiceSpy.setCurrentTask).toHaveBeenCalledWith(null);
  });

  it('should return category color or default', () => {
    const category: Category = { id: 4, name: 'ColorCat', color: '#123456' };
    component.catItems = [category];
    expect(component.getCategoryColor(4)).toBe('#123456');
    expect(component.getCategoryColor(999)).toBe('#ffffff');
  });
});