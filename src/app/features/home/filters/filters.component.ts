import { Component } from '@angular/core';
import {FilterSortService} from "../../../core/services/filter-sort.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  public readonly filters: {filterValue: string, isChosen: boolean}[] = [
    {filterValue:'Томаты', isChosen: false},
    {filterValue:'Ветчина', isChosen: false},
    {filterValue:'Шампиньоны', isChosen: false},
    {filterValue:'Ананас', isChosen: false},
    {filterValue:'Сыр Дор Блю', isChosen: false},
  ]

  constructor(private readonly _filterSortService: FilterSortService) {
  }

  public filterGoods(event: Event): void {
    this.filters.forEach((filter: {filterValue: string, isChosen: boolean}): void => {
      if (filter.filterValue === (event.target as HTMLElement).textContent!) {
        filter.isChosen = !filter.isChosen;
      }
    })
    this._filterSortService.callFilter((event.target as HTMLElement).textContent!);
  }
}
