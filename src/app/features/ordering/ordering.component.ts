import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserOrder } from '../../core/models/user-order';
import {OrderingService} from '../../core/services/ordering.service';
import {Router} from '@angular/router';
import {Observable, fromEvent, Subscription} from 'rxjs';
import {OrderExtradition} from "../../../gql/graphql";

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

  chooseMethod(methodName: string): void{
    this.paymentMethods.forEach((method: PaymentMethod): void => {
      method.isSelected = method.name === methodName;
    });
  }

  getIsSelected(methodName: string): boolean {
    for (let i: number = 0; i < this.paymentMethods.length; i++) {
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
  styleUrls: ['./ordering.component.css', '../../../assets/styles/shady-input.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderingComponent implements OnInit{

  paymentMethods: PaymentMethods = new PaymentMethods(
    new PaymentMethod('cash', true),
    new PaymentMethod('bankCard', false),
    new PaymentMethod('sberPay', false)
  );
  isDeliverySelected: boolean = true;
  order: UserOrder;
  phone: string;
  pickUpAddresses: string[] = ['Ленина 32', 'Кунарская 15'];
  pickUpValue: FormControl<any> = new FormControl("", [Validators.required]);

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

  constructor(private _orderingService: OrderingService, private _router: Router) {
    this.order = _orderingService.order!;
    this.phone = window.localStorage['phone'];
  }

  public ngOnInit(): void {
    const context: OrderingComponent = this;
    setTimeout(function(): void {
      context.clickOutsideSubscribe(context);
      context.keyDownSubscribe(context);
    }, 100);
    this.order.userid = window.localStorage["userId"];
  }

  public closeModal(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this._router.navigateByUrl('').then();
  }

  public clickOutsideSubscribe(context: OrderingComponent): void {
    const clickSubscription: Subscription =
      context._documentClick$.subscribe((evt: Event): void => {
        const authRef: Element = document.querySelector('.modal-container')!;
        const selectItems: NodeListOf<Element> = document.querySelectorAll('.pick-up-addresses');
        let isSelectClick: boolean = false;
        selectItems.forEach((el: Element): void => {
          if (evt.composedPath().includes(el)) {
            isSelectClick = true;
          }
        });
        if (!evt.composedPath().includes(authRef!) && !isSelectClick) {
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

  public changePaymentMethod(event: Event): void {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    this.paymentMethods.chooseMethod(target.id);
  }

  public changeDeliveryMethod(): void {
    this.isDeliverySelected = !this.isDeliverySelected;
  }

  public saveAddress(): void {
    if (this.isDeliverySelected) {
      let addressValues: string[] = [
        "Улица: " + this.addressFormGroup.controls["street"].value,
        "Номер дома: " + this.addressFormGroup.controls["houseNumber"].value,
        this.addressFormGroup.controls["entrance"].value ?
          "Подъезд: " + this.addressFormGroup.controls["entrance"].value : "",
        this.addressFormGroup.controls["apartment"].value ?
          "Квартира: " + this.addressFormGroup.controls["apartment"].value : "",
        this.addressFormGroup.controls["floor"].value ?
          "Этаж: " + this.addressFormGroup.controls["floor"].value : "",
        this.addressFormGroup.controls["doorCode"].value ?
          "Код от двери: " + this.addressFormGroup.controls["doorCode"].value : "",
      ]
      this.order.address = addressValues.filter((value: string): boolean => value.length > 0).join('; ');
    } else {
      this.order.address = this.pickUpValue.value;
    }
  }

  public sendOrder(): void {
    this.order.extradition = this.isDeliverySelected ? OrderExtradition.Delivery : OrderExtradition.PickUp;
    this.saveAddress();
    this._orderingService.sendOrder();
    this.closeModal();
  }
}
