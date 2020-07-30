import { Component } from '@angular/core';

import { Course } from './models/course.model';
import { Category } from './models/category.model';

@Component({
  selector: 'app-first-component',
  templateUrl: './first.component.html'
})
export class FirstComponent {
  public simpleItem = new Course('Angular', Category.Front, 0, 'Study project in internal course', true);

  public otherAvailableItems: Course[] = [
    new Course('Java Basics', Category.Back, 20, 'Study project in internal course', true),
    new Course('C#', Category.Back, 10, 'Study project in internal course', false),
    new Course('Knockout', Category.Front, 30, 'Study project in internal course', false)
  ];

  public getCourseCategory(category: Category): string {
    return Category[category];
  }
}
