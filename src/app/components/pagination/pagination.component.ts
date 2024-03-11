import { Component,  EventEmitter, Input, Output} from '@angular/core';
 
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
@Input() totalPages: number
@Input() currentPage: number
@Output() onNextPage = new EventEmitter();

clickNext(currentPage : number , isNext: boolean) {
  const payload={currentPage,isNext}
  this.onNextPage.emit(payload);
}
}
