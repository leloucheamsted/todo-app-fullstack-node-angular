import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Tag } from "../../models/tag.model";
import { Task } from "../../models/task.model";


@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor() {
        console.log("DataService initialized");
    }
    private tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
    private categories: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    private isBusy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    tags$ = this.tags.asObservable();
    categories$ = this.categories.asObservable();
    tasks$ = this.tasks.asObservable();
    isBusy$ = this.isBusy.asObservable();

    setBusy(isBusy: boolean) {
        this.isBusy.next(isBusy);
    }
    setTags(tags: Tag[]) {
        this.tags.next(tags);
    }
    setCategories(categories: string[]) {
        this.categories.next(categories);
    }
    setTasks(tasks: Task[]) {
        this.tasks.next(tasks);
    }
    addTag(tag: Tag) {
        const currentTags = this.tags.getValue();
        this.tags.next([...currentTags, tag]);
    }
    addCategory(category: string) {
        const currentCategories = this.categories.getValue();
        this.categories.next([...currentCategories, category]);
    }
    addTask(task: Task) {
        const currentTasks = this.tasks.getValue();
        this.tasks.next([...currentTasks, task]);
    }

    // delete task
    deleteTask(id: number) {
        const currentTasks = this.tasks.getValue();
        const updatedTasks = currentTasks.filter(task => task.id !== id);
        this.tasks.next(updatedTasks);
    }
    // update task
    updateTask(updatedTask: Task) {
        const currentTasks = this.tasks.getValue();
        const taskIndex = currentTasks.findIndex(task => task.id === updatedTask.id);
        if (taskIndex !== -1) {
            currentTasks[taskIndex] = updatedTask;
            this.tasks.next([...currentTasks]);
        }
    }


}