import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent {
}
