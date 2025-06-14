import { Injectable } from "@angular/core";
import { Task } from "../../../models/task.model";
import { IUseCase } from "../../../base/use-case";
import { TasksRepository } from "../../repositories/tasks_repository";

@Injectable({ providedIn: 'root' })
export class CreateTaskUseCase implements IUseCase<any, Task> {
    constructor(
        private repo: TasksRepository
    ) {
    }
    call(request: any): Promise<Task> {
        try {
            return new Promise(async (resolve, reject) => {
                this.repo.createTask(request).subscribe((data: Task) => {
                    resolve(data);
                });
            })
        } catch (e) {
            console.error(`Failed to create  task${request}`, { request, e })
            throw e;
        }
    }
}