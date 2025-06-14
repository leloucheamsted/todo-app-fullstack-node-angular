import { Observable } from "rxjs";
import { Task } from "../../models/task.model";
import { InitData } from "../../models/init.model";

export abstract class TasksRepository {
    abstract getAllTasks(): Observable<Task[]>;
    abstract getTaskById(id: number): Observable<Task>;
    abstract createTask(task: any): Observable<Task>;
    abstract updateTask(id: number, task: Task): Observable<Task>;
    abstract deleteTask(id: number): Observable<any>;
    abstract initData(): Observable<InitData>;

}