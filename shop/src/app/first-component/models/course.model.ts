import { Category } from './category.model';

export class Course {
    constructor(
        public name: string,
        public category: Category,
        public price: number,
        public description: string,
        public isAvailable: boolean) {}
}
