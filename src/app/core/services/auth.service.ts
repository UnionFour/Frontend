import {Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular'
import {AuthPayload, TokenInput} from 'src/gql/graphql';
import {map, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authorization$: Subject<boolean> = new Subject<boolean>();

  constructor(private apollo: Apollo) {
    this.authorization$.next(!!window.localStorage['jwt']);
  }

  SignIn(): void {
    this.authorization$.next(true);
  }

  SignOut(): void {
    this.authorization$.next(false);
    window.localStorage.clear();
  }

  SendSmsCode(phone: string): Observable<AuthPayload> {
    window.localStorage['phone'] = phone;
    return this.apollo.mutate<{ sendSmsCode: AuthPayload }>({
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

  GetAccessToken(input: TokenInput): Observable<string> {
    return this.apollo.mutate<{accessToken: string}>({
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
}
