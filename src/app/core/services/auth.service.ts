import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular'
import {AuthPayload, Order, TokenInput, UpdateUserDtoInput, User} from 'src/gql/graphql';
import {map, Observable, Subject} from 'rxjs';
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authorization$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly _apollo: Apollo) {
    this.authorization$.next(!!window.localStorage['jwt']);
  }

  public getMe(): Observable<User | undefined> {
    return this._apollo.query<{me: User}>({
      query: gql`
        {
          me {
            name
            birth
            phone
            email
            userid
          }
        }
      `
    }).pipe(
      map(x => x.data.me)
    )
  }

  public signIn(): void {
    this.authorization$.next(true);
  }

  public signOut(): void {
    this.authorization$.next(false);
    window.localStorage.clear();
  }

  public sendSmsCode(phone: string): Observable<AuthPayload> {
    window.localStorage['phone'] = phone;
    return this._apollo.mutate<{ sendSmsCode: AuthPayload }>({
      mutation: gql`
        mutation SendSmsCode($phone: String!) {
          sendSmsCode(phone: $phone) {
            timeSpan
            expiry
            encryptedCode
          }
        }
      `,
      variables: {phone}
    }).pipe(
      map(x => x.data?.sendSmsCode as AuthPayload)
    );
  }

  public updateUser(input: UpdateUserDtoInput): Observable<User | undefined> {
    return this._apollo.mutate<{ updateUser: User }>({
      mutation: gql`
        mutation UpdateUser($input: UpdateUserDTOInput!){
          updateUser(updateUserDto: $input) {
            userid
            name
            birth
            email
          }
        }
      `,
      variables: {input}
    }).pipe(
      map(x => x.data?.updateUser)
    )
  }

  public getAccessToken(input: TokenInput): Observable<string> {
    return this._apollo.mutate<{ accessToken: string }>({
      mutation: gql`
        mutation GetAccessToken($input: TokenInput!) {
          accessToken(input: $input)
        }
      `,
      variables: {input}
    }).pipe(
      map(x => x.data?.accessToken ?? "")
    );
  }

  public parseJwt(): void {
    const token: string = window.localStorage["jwt"];
    let base64Url: string = token.split('.')[1];
    let base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload: string = decodeURIComponent(window.atob(base64)
      .split('').map(function (c: string): string {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    window.localStorage["userId"] = JSON.parse(jsonPayload).sub;
  }
}
