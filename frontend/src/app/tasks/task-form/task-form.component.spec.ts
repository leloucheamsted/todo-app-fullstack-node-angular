import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskForm } from './task-form';
import { DataService } from '../../core/services/data.service';
import { CreateTaskUseCase } from '../../core/use_cases/tasks/create_task_usecase';
import { UpdateTaskUseCase } from '../../core/use_cases/tasks/update_task_usecase';
import { DeleteTaskUseCase } from '../../core/use_cases/tasks/delete_task_usecases';
import { BehaviorSubject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskForm Component (with TestBed)', () => {
    let component: TaskForm;
    let fixture: ComponentFixture<TaskForm>;
    let dataServiceSpy: jasmine.SpyObj<DataService>;
    let createTaskSpy: jasmine.SpyObj<CreateTaskUseCase>;
    let updateTaskSpy: jasmine.SpyObj<UpdateTaskUseCase>;
    let deleteTaskSpy: jasmine.SpyObj<DeleteTaskUseCase>;

    beforeEach(async () => {
        dataServiceSpy = jasmine.createSpyObj('DataService', [
            'setCurrentTask', 'setTasks', 'getTasks'
        ], {
            categories$: new BehaviorSubject([{ id: 1, name: 'Cat1', color: '#fff' }]).asObservable(),
            tags$: new BehaviorSubject([{ id: 1, name: 'Tag1', color: '#000' }]).asObservable(),
            currentTask$: new BehaviorSubject(null).asObservable()
        });

        createTaskSpy = jasmine.createSpyObj('CreateTaskUseCase', ['call']);
        updateTaskSpy = jasmine.createSpyObj('UpdateTaskUseCase', ['call']);
        deleteTaskSpy = jasmine.createSpyObj('DeleteTaskUseCase', ['call']);

        await TestBed.configureTestingModule({
            imports: [FormsModule, NzSelectModule, BrowserAnimationsModule, ReactiveFormsModule, NzDatePickerModule],
            declarations: [TaskForm],
            providers: [
                { provide: DataService, useValue: dataServiceSpy },
                { provide: CreateTaskUseCase, useValue: createTaskSpy },
                { provide: UpdateTaskUseCase, useValue: updateTaskSpy },
                { provide: DeleteTaskUseCase, useValue: deleteTaskSpy }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskForm);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render the title input', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('input[placeholder="Task title"]')).toBeTruthy();
    });
    it('should disable save button if title or description is empty', () => {
        component.task.title = '';
        component.task.description = '';
        fixture.detectChanges();
        const saveBtn: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="save-btn"]');
        expect(saveBtn.disabled).toBeTrue();
    });

    it('should enable save button if title and description are filled', () => {
        component.task.title = 'Test';
        component.task.description = 'Desc';
        fixture.detectChanges();
        const saveBtn: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="save-btn"]');
        expect(saveBtn.disabled).toBeFalse();
    });
});