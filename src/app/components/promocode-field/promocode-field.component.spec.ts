import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocodeFieldComponent } from './promocode-field.component';

describe('PromocodeFieldComponent', () => {
  let component: PromocodeFieldComponent;
  let fixture: ComponentFixture<PromocodeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocodeFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocodeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
