import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSortComponent } from './filter-sort.component';

describe('FiltersComponent', () => {
    let component: FilterSortComponent;
    let fixture: ComponentFixture<FilterSortComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilterSortComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FilterSortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
