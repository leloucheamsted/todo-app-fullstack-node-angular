import { Tag } from "../models/tag.model";

export function generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    // color += ']';

    return color;
}
// get list of tags from array of tag ids
export function getTagsFromIds(tags: number[], allTags: Tag[]): Tag[] {
    return allTags.filter(tag => tags.includes(tag.id));
}