import { Category } from "./category.model";
import { Tag } from "./tag.model";
import { Task } from "./task.model";

export interface InitData {
    categories: Category[];
    tags: Tag[];
    tasks: Task[];
}