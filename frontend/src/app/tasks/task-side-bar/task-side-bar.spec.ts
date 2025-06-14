import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSideBar } from './task-side-bar';
import { MatIconModule } from '@angular/material/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

describe('TaskSideBar', () => {
  let component: TaskSideBar;
  let fixture: ComponentFixture<TaskSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskSideBar],
      imports: [MatIconModule, NzInputModule]
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
