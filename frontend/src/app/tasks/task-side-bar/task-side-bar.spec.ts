import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSideBar } from './task-side-bar';

describe('TaskSideBar', () => {
  let component: TaskSideBar;
  let fixture: ComponentFixture<TaskSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSideBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskSideBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
