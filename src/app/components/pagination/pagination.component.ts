import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
@Input() totalPages: number
@Input() currentPage: number
}
