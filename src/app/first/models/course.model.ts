import { CategoryEnum } from './category.model';

export class CourseModel {
    constructor(
        public name: string,
        public category: CategoryEnum,
        public price: number,
        public description: string,
        public isAvailable: boolean) {}
}
