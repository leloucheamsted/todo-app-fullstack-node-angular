import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Tag } from "../../models/tag.model";
import { Task } from "../../models/task.model";
import { InitData } from "../../models/init.model";
import { Category } from "../../models/category.model";
import { generateRandomColor } from "../../utilities/utilities";


@Injectable({
    providedIn: 'root'
})

export class DataService {
    constructor() {
        console.log("DataService initialized");
    }
    private tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
    private categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    private tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    private isBusy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentTask: BehaviorSubject<Task | null> = new BehaviorSubject<Task | null>(null);


    tags$ = this.tags.asObservable();
    categories$ = this.categories.asObservable();
    tasks$ = this.tasks.asObservable();
    isBusy$ = this.isBusy.asObservable();
    currentTask$ = this.currentTask.asObservable();
    setBusy(isBusy: boolean) {
        this.isBusy.next(isBusy);
    }
    setCurrentTask(task: Task | null) {
        this.currentTask.next(task);
    }
    setData(data: InitData) {

        this.setCategories(data.categories.map(category => ({
            ...category,
            color: generateRandomColor()
        })));
        this.setTasks(data.tasks);
        this.setTags(data.tags.map(tag => ({
            ...tag,
            color: generateRandomColor()
        })));
    }
    setTags(tags: Tag[]) {
        console.log("Setting tags:", tags);
        this.tags.next(tags);
    }
    setCategories(categories: Category[]) {
        this.categories.next(categories);
    }
    setTasks(tasks: Task[]) {
        this.tasks.next(tasks);
    }
    getTasks(): Task[] {
        return this.tasks.getValue();
    }
    addTag(tag: Tag) {
        const currentTags = this.tags.getValue();
        this.tags.next([...currentTags, tag]);
    }
    addCategory(category: Category) {
        const currentCategories = this.categories.getValue();
        this.categories.next([...currentCategories, category]);
    }
    addTask(task: Task) {
        const currentTasks = this.tasks.getValue();

        this.tasks.next([...currentTasks, task]);
    }

    deleteTask(id: number) {
        const currentTasks = this.tasks.getValue();
        const updatedTasks = currentTasks.filter(task => task.id !== id);
        this.tasks.next(updatedTasks);
    }
    updateTask(updatedTask: Task) {
        const currentTasks = this.tasks.getValue();
        const taskIndex = currentTasks.findIndex(task => task.id === updatedTask.id);
        if (taskIndex !== -1) {
            currentTasks[taskIndex] = updatedTask;
            this.tasks.next([...currentTasks]);
        }
    }


}