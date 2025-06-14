import { Category } from './category.model';
import { Tag } from './tag.model';

export interface Task {
    id?: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    categoryId?: number;
    category?: Category;
    tags?: Tag[];
}