import { NgModule } from "@angular/core";
import { TaskForm } from "./task-form/task-form";
import { TaskList } from "./task-list/task-list";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskSideBar } from "./task-side-bar/task-side-bar";
import { Tasks } from "./tasks";
import { MatIconModule } from '@angular/material/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
@NgModule({
    declarations: [TaskForm, TaskList, TaskSideBar, Tasks],
    imports: [CommonModule, FormsModule, NzDrawerModule, NzDatePickerModule, NzCheckboxModule, NzCollapseModule, NzButtonModule, NzSelectModule, ReactiveFormsModule, NzInputModule, MatIconModule,],
    exports: [Tasks],
})
export class TaskModule { }