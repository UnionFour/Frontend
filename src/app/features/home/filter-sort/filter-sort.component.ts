import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FilterSortService } from '../../../core/services/filter-sort.service';
import { ComponentHostDirective } from '../../../shared/directives/component-host.directive';
import { SortComponent } from './sort/sort.component';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-filter-sort',
    templateUrl: './filter-sort.component.html',
    styleUrls: ['./filter-sort.component.css']
})
export class FilterSortComponent {
    @ViewChild(ComponentHostDirective, {static: true}) public componentsHost!: ComponentHostDirective;
    public isOpenSort: boolean = false;
    public readonly filters: { filterValue: string, isChosen: boolean }[] = [
        {filterValue: 'Томаты', isChosen: false},
        {filterValue: 'Ветчина', isChosen: false},
        {filterValue: 'Шампиньоны', isChosen: false},
        {filterValue: 'Ананас', isChosen: false},
        {filterValue: 'Сыр Дор Блю', isChosen: false},
    ]
    private _sortSubs: Subscription[] = [];
    private _documentClick$: Observable<Event> = fromEvent(document, 'click');
    private _documentKeyDown$: Observable<Event> = fromEvent(document, 'keydown');

    constructor(private readonly _filterSortService: FilterSortService) {
    }

    public filterGoods(event: Event): void {
        this.filters.forEach((filter: { filterValue: string, isChosen: boolean }): void => {
            if (filter.filterValue === (event.target as HTMLElement).textContent!) {
                filter.isChosen = !filter.isChosen;
            }
        })
        this._filterSortService.callFilter((event.target as HTMLElement).textContent!);
    }

    public toggleOpennessAuthComponent(): void {
        const containerRef: ViewContainerRef = this.componentsHost.viewContainerRef;
        if (this.isOpenSort) {
            containerRef.clear();
            this._sortSubs.forEach((sub: Subscription): void => {
                sub.unsubscribe();
            });
        } else {
            containerRef.createComponent<SortComponent>(SortComponent);
            setTimeout((): void => {
                this.clickOutsideSubscribe();
                this.keyDownSubscribe();
            }, 100);
        }
        this.isOpenSort = !this.isOpenSort;
    }

    public clickOutsideSubscribe(): void {
        this._sortSubs.push(
            this._documentClick$.subscribe((evt: Event): void => {
                const authRef: Element = document.querySelector('.sort-component')!;
                if (!evt.composedPath().includes(authRef!)) {
                    this.toggleOpennessAuthComponent();
                }
            })
        );
    }

    public keyDownSubscribe(): void {
        this._sortSubs.push(
            this._documentKeyDown$.subscribe((evt: Event): void => {
                    if ((evt as KeyboardEvent).code === 'Escape') {
                        this.toggleOpennessAuthComponent();
                    }
                }
            )
        );
    }
}
