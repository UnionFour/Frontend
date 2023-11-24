import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilterSortService {
    public callingFilter$: Subject<{ filterValue: string }> = new Subject();
    public callingSort$: Subject<{ isReverse: boolean, sortCriteria: string }> = new Subject();

    public callFilter(filterValue: string): void {
        this.callingFilter$.next({filterValue: filterValue});
    }

    public callSort(isReverse: boolean, sortCriteria: string): void {
        this.callingSort$.next({isReverse: isReverse, sortCriteria: sortCriteria});
    }
}
