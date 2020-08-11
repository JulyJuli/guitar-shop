import { Component } from '@angular/core';

import { CourseModel } from '../../models/course.model';
import { CategoryEnum } from '../../models/category.model';

@Component({
  selector: 'app-first-component',
  templateUrl: './first.component.html'
})
export class FirstComponent {

  simpleItem = new CourseModel('Angular', CategoryEnum.Front, 0, 'Study project in internal course', true);

  otherAvailableItems: CourseModel[] = [
    new CourseModel('Java Basics', CategoryEnum.Back, 20, 'Study project in internal course', true),
    new CourseModel('C#', CategoryEnum.Back, 10, 'Study project in internal course', false),
    new CourseModel('Knockout', CategoryEnum.Front, 30, 'Study project in internal course', false)
  ];

  getCourseCategory(category: CategoryEnum): string {
    return CategoryEnum[category];
  }
}
