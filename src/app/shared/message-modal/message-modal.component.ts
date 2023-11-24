import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { MessagingService } from '../../core/services/messaging.service';

@Component({
    selector: 'app-message-modal',
    templateUrl: './message-modal.component.html',
    styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent {
    public message: string = '';
    private _documentClick$: Observable<Event> = fromEvent(document, 'click');
    private _subscriptions: Subscription[] = [];

    constructor(public messagingService: MessagingService, private _changeRef: ChangeDetectorRef,) {
        this.message = this.messagingService.message;
        this._changeRef.markForCheck();
        setTimeout((): void => {
            this.clickOutsideSubscribe(this);
        }, 100);
    }

    public clickOutsideSubscribe(context: MessageModalComponent): void {
        const clickSubscription: Subscription =
            context._documentClick$.subscribe((evt: Event): void => {
                const cabinetRef: Element = document.querySelector('.message-container')!;
                if (!evt.composedPath().includes(cabinetRef!)) {
                    context.closeMessageModal();
                }
            });
        context._subscriptions.push(clickSubscription);
    }

    public closeMessageModal(): void {
        this._subscriptions.forEach((sub: Subscription): void => {
            sub.unsubscribe();
        });
        this.messagingService.changeMessageOpening(false);
    }
}
