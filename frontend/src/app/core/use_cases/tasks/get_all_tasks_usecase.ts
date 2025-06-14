import { Injectable } from "@angular/core";
import { Task } from "../../../models/task.model";
import { IUseCase } from "../../../base/use-case";
import { TasksRepository } from "../../repositories/tasks_repository";

@Injectable({ providedIn: 'root' })
export class GetAllTaskUseCase implements IUseCase<null, Task[]> {
    constructor(
        private repo: TasksRepository
    ) {
    }
    call(request: null): Promise<Task[]> {
        try {
            return new Promise(async (resolve, reject) => {
                this.repo.getAllTasks().subscribe((data: Task[]) => {
                    resolve(data);
                });
            })
        } catch (e) {
            console.error(`Failed to get all  tasks${request}`, { request, e })
            throw e;
        }
    }
}