import { Injectable } from "@angular/core";
import { Task } from "../../../models/task.model";
import { IUseCase } from "../../../base/use-case";
import { TasksRepository } from "../../repositories/tasks_repository";

@Injectable({ providedIn: 'root' })
export class UpdateTaskUseCase implements IUseCase<Task, Task> {
    constructor(
        private repo: TasksRepository
    ) {
    }
    call(request: Task): Promise<Task> {
        try {
            return new Promise(async (resolve, reject) => {
                this.repo.updateTask(request.id ?? 0, request).subscribe((data: Task) => {
                    resolve(data);
                });
            })
        } catch (e) {
            console.error(`Failed to update  task  ${request}`, { request, e })
            throw e;
        }
    }
}