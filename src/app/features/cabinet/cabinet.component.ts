import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.css', '../../../assets/styles/shady-input.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetComponent {

    public phone: string;

    constructor(private authService: AuthService, private router: Router) {
        this.phone = window.localStorage['phone'];
        authService.getMe().subscribe(user => {
            if (user === undefined)
                return;

            window.localStorage['name'] = user.name;
            this.nameForm.setValue({userName: user.name});

            window.localStorage['birthday'] = user.birth;
            this.birthdayForm.setValue({userBirthday: this.parseBirthDate(user.birth)});

            window.localStorage['email'] = user.email;
            this.emailForm.setValue({userEmail: user.email});
        })
    }

    nameForm: FormGroup = new FormGroup({
        'userName': new FormControl(
            window.localStorage['name'],
            [
                Validators.required,
            ]),
    });

    emailForm: FormGroup = new FormGroup({
        'userEmail': new FormControl(
            window.localStorage['email'],
            [
                Validators.email,
                Validators.required,
            ]
        ),
    });

    birthdayForm: FormGroup = new FormGroup({
        'userBirthday': new FormControl(
            this.parseBirthDate(window.localStorage['birthday']),
            [
                Validators.required,
            ]
        )
    });

    public signOut(): void {
        this.authService.signOut();
        this.router.navigateByUrl('').then();
    }

    public saveName(): void {

        this.authService.updateUser({
            name: this.nameForm.get('userName')?.value,
            birth: null,
            email: null
        }).subscribe()

        window.localStorage['name'] = this.nameForm.get('userName')?.value;
    }

    public saveEmail(): void {
        this.authService.updateUser({
            name: null,
            birth: null,
            email: this.emailForm.get('userEmail')?.value
        }).subscribe()

        window.localStorage['email'] = this.emailForm.get('userEmail')?.value;
    }

    public saveBirthday(): void {
        this.authService.updateUser({
            name: null,
            birth: this.birthdayForm.get('userBirthday')?.value,
            email: null
        }).subscribe()

        window.localStorage['birthday'] = this.birthdayForm.get('userBirthday')?.value;
    }

    public parseBirthDate(stringDate: string | undefined): TuiDay {
        if (!stringDate || stringDate.length !== 10) {
            return new TuiDay(2000, 1, 1);
        }
        let date = new Date(stringDate);
        return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
    }
}
