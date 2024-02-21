import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../services/category.service';
 
@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input() category: ICategory;
  @Output() onDeleteCategory = new EventEmitter();

  onDelete() {
    this.onDeleteCategory.emit();
  }
}
