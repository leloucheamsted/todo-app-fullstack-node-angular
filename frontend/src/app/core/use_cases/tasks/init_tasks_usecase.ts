import { Injectable } from "@angular/core";
import { Task } from "../../../models/task.model";
import { IUseCase } from "../../../base/use-case";
import { TasksRepository } from "../../repositories/tasks_repository";
import { InitData } from "../../../models/init.model";

@Injectable({ providedIn: 'root' })
export class InitTasksUseCase implements IUseCase<null, InitData> {
    constructor(
        private repo: TasksRepository
    ) {
    }
    call(request: null): Promise<InitData> {
        try {
            return new Promise(async (resolve, reject) => {
                this.repo.initData().subscribe((data: InitData) => {
                    resolve(data);
                });
            })
        } catch (e) {
            console.error(`Failed to init tasks  tasks${request}`, { request, e })
            throw e;
        }
    }
}