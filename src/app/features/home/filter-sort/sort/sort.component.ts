import { Component } from '@angular/core';
import { FilterSortService } from '../../../../core/services/filter-sort.service';

type SortMethod = { sortName: string, isChosen: boolean, sortValue: string, isReverse: boolean };

@Component({
    selector: 'app-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.css']
})
export class SortComponent {
    public sortMethods: SortMethod[] = [
        {
            sortName: 'Сначала дешёвое',
            isChosen: false,
            sortValue: 'price',
            isReverse: false
        },
        {
            sortName: 'Сначала дорогое',
            isChosen: false,
            sortValue: 'price',
            isReverse: true
        }
    ];

    private _chosenMethodName: string | undefined;

    constructor(private readonly _filterSortService: FilterSortService) {
    }

    public sortGoods(event: Event): void {
        this.sortMethods.forEach((method: SortMethod): void => {
            if (method.sortName === (event.target as HTMLElement).textContent) {
                if (method.sortName === this._chosenMethodName) {
                    method.isChosen = false;
                    this._chosenMethodName = undefined;
                } else {
                    method.isChosen = true;
                    this._chosenMethodName = method.sortName;
                }
                this._filterSortService.callSort(method.isReverse, method.sortValue);
            } else {
                method.isChosen = false;
            }
        });
    }
}
