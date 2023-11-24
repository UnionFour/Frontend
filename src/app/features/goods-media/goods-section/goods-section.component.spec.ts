import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsSectionComponent } from './goods-section.component';

describe('GoodsSectionComponent', () => {
    let component: GoodsSectionComponent;
    let fixture: ComponentFixture<GoodsSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GoodsSectionComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GoodsSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
