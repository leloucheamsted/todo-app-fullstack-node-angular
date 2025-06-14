import { DataService } from './data.service';
import { Tag } from '../../models/tag.model';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';

describe('DataService', () => {
    let service: DataService;

    beforeEach(() => {
        service = new DataService();
    });

    it('should initialize with empty arrays', () => {
        expect(service.getTasks()).toEqual([]);
    });

    it('should add a task', () => {
        const task: Task = { id: 1, title: 'Test', description: '', created_at: '2025-06-14T10:00:00.000Z', updated_at: '2025-06-14T10:00:00.000Z' };
        service.addTask(task);
        expect(service.getTasks().length).toBe(1);
        expect(service.getTasks()[0].title).toBe('Test');
    });

    it('should delete a task', () => {
        const task: Task = { id: 2, title: 'To Delete', description: '', created_at: '2025-06-14T10:00:00.000Z', updated_at: '2025-06-14T10:00:00.000Z' };
        service.addTask(task);
        service.deleteTask(2);
        expect(service.getTasks().length).toBe(0);
    });

    it('should update a task', () => {
        const task: Task = { id: 3, title: 'Old', description: '', created_at: '2025-06-14T10:00:00.000Z', updated_at: '2025-06-14T10:00:00.000Z' };
        service.addTask(task);
        const updatedTask: Task = { ...task, title: 'New' };
        service.updateTask(updatedTask);
        expect(service.getTasks()[0].title).toBe('New');
    });

    it('should add a tag', () => {
        const tag: Tag = { id: 1, name: 'Urgent', color: '#fff' };
        service.addTag(tag);
        service.tags$.subscribe(tags => {
            expect(tags.length).toBe(1);
            expect(tags[0].name).toBe('Urgent');
        });
    });

    it('should add a category', () => {
        const category: Category = { id: 1, name: 'Work', color: '#000' };
        service.addCategory(category);
        service.categories$.subscribe(categories => {
            expect(categories.length).toBe(1);
            expect(categories[0].name).toBe('Work');
        });
    });
});