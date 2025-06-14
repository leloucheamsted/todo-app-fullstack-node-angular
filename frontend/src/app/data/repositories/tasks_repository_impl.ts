import { Injectable } from "@angular/core";
import { TasksRepository } from "../../core/repositories/tasks_repository";
import { Observable } from "rxjs";
import { Task } from "../../models/task.model";
import { dataSource } from "../data_source/data_source";
import { InitData } from "../../models/init.model";

@Injectable()
export class TasksRepositoryImpl extends TasksRepository {



    constructor(private source: dataSource) {
        super();
    }
    override initData(): Observable<InitData> {
        return this.source.initData();
    }
    override getAllTasks(): Observable<Task[]> {
        return this.source.getAllTasks();
    }
    override getTaskById(id: number): Observable<Task> {
        return this.source.getTaskById(id);
    }
    override createTask(task: any): Observable<Task> {
        return this.source.createTask(task);
    }
    override updateTask(id: number, task: Task): Observable<Task> {
        return this.source.updateTask(id, task);
    }
    override deleteTask(id: number): Observable<any> {
        return this.source.deleteTask(id);
    }


}
