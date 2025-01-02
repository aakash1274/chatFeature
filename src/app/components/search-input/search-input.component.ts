import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
    @Output() search: EventEmitter<string> = new EventEmitter();

    handleSearch($event: any){
     this.search.emit($event.target.value);
    }
}
