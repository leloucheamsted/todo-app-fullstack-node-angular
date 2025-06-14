import { Injectable } from "@angular/core";
import { Task } from "../../../models/task.model";
import { IUseCase } from "../../../base/use-case";
import { TasksRepository } from "../../repositories/tasks_repository";

@Injectable({ providedIn: 'root' })
export class GetTaskByIdUseCase implements IUseCase<number, Task> {
    constructor(
        private repo: TasksRepository
    ) {
    }
    call(request: number): Promise<Task> {
        try {
            return new Promise(async (resolve, reject) => {
                this.repo.getTaskById(request).subscribe((data: Task) => {
                    resolve(data);
                });
            })
        } catch (e) {
            console.error(`Failed to get  task id ${request}`, { request, e })
            throw e;
        }
    }
}