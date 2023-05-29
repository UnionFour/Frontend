import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Order } from '../../assets/classes/order';
import {OrderingService} from '../services/ordering.service';
import {Router} from '@angular/router';
import {Observable, fromEvent, Subscription} from 'rxjs';

class PaymentMethod{
  name: string;
  isSelected: boolean;

  constructor(name: string, isSelected: boolean) {
    this.name = name;
    this.isSelected = isSelected;
  }
}

class PaymentMethods{
  paymentMethods: PaymentMethod[] = [];

  constructor(...methods: PaymentMethod[]) {
    this.paymentMethods = methods;
  }

  chooseMethod(methodName: string){
    this.paymentMethods.forEach((method: PaymentMethod) => {
      method.isSelected = method.name === methodName;
    });
  }

  getIsSelected(methodName: string): boolean {
    for (let i = 0; i < this.paymentMethods.length; i++) {
      if (this.paymentMethods[i].name == methodName) {
        return this.paymentMethods[i].isSelected;
      }
    }
    return false;
  }
}

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css', '../../assets/styles/shady-input.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderingComponent implements OnInit{

  paymentMethods: PaymentMethods = new PaymentMethods(
    new PaymentMethod('cash', true),
    new PaymentMethod('bankCard', false),
    new PaymentMethod('sberPay', false)
  );
  isDeliverySelected: boolean = true;
  order: Order;
  phone: string;
  pickUpAddresses: string[] = ['Ленина 32', 'Кунарская 15'];
  pickUpValue = new FormControl();

  private _documentClick$: Observable<Event> = fromEvent(document, 'click');
  private _documentKeyDown$: Observable<Event> = fromEvent(document, 'keydown');
  private _subscriptions: Subscription[] = [];

  promoCodeFormGroup: FormGroup = new FormGroup({
    "promoCode": new FormControl(
      "",
      [Validators.required, Validators.minLength(3)]
    )
    }
  );

  addressFormGroup: FormGroup = new FormGroup({
    "street": new FormControl(
      "",
      [Validators.required, Validators.minLength(3)]
    ),
    "houseNumber": new FormControl(
      "",
      [Validators.required, Validators.minLength(1)]
    ),
    "entrance": new FormControl(),
    "apartment": new FormControl(),
    "floor": new FormControl(),
    "doorCode": new FormControl()
    }
  );

  constructor(private orderingService: OrderingService, private router: Router) {
    this.order = orderingService.order!;
    this.phone = window.localStorage['phone'];
  }

  public ngOnInit(): void {
    const context: OrderingComponent = this;
    setTimeout(function(): void {
      context.clickOutsideSubscribe(context);
      context.keyDownSubscribe(context);
    }, 100);
  }

  public closeModal(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.router.navigateByUrl('').then();
  }

  public clickOutsideSubscribe(context: OrderingComponent): void {
    const clickSubscription: Subscription =
      context._documentClick$.subscribe((evt: Event): void => {
        const authRef: Element = document.querySelector('.modal-container')!;
        if (!evt.composedPath().includes(authRef!)) {
          context.closeModal();
        }
      });
    context._subscriptions.push(clickSubscription);
  }

  public keyDownSubscribe(context: OrderingComponent): void {
    const keyDownSubscription: Subscription =
      context._documentKeyDown$.subscribe((evt: Event): void => {
          if ((evt as KeyboardEvent).code === 'Escape') {
            context.closeModal();
          }
        }
      );
    context._subscriptions.push(keyDownSubscription);
  }

  changePaymentMethod(event: Event) {
    let target = event.target as HTMLInputElement;
    this.paymentMethods.chooseMethod(target.id);
  }

  changeDeliveryMethod() {
    this.isDeliverySelected = !this.isDeliverySelected;
  }
}
