import { IAuthTokenHandler, IRememberTokenHandler } from '../../auth-token/contracts';
import { Observable } from 'rxjs';
import { HandlerResult, LoginResponseWithAuthenticationResult, LoginReponseHandlerFunc } from '../types';
import { ILoginResponse, IAppUser } from '../../auth/contracts/v2';
import { LoginResponse, ILoginState } from '../../auth/contracts/v2/login.response';
import { getResultData } from '../../http/contracts/types';
import { responseStatusOK } from '../../http/core/helpers';
import { IUserStorageHandler } from '../../auth/contracts/v2/user/storage-user';
import { map,tap } from 'rxjs/operators';

/**
 * @description Get the login response data structure from the {@link HandlerResult} instance
 * @param result Login result|response instance
 */
export const getLoginResponse: getResultData<ILoginResponse> = (result: HandlerResult<ILoginResponse>) => result.data;

/**
 * @description Get the login state data from user login response object
 * @param loginResponse Login result|response instance
 */
export const getLoginState: (loginResponse: ILoginResponse) => ILoginState =
  (loginResponse: LoginResponse) => loginResponse.responseData.loginState;

/**
 * @description Helper method for checking the login result was successful
 * @param loginResponse Instance of the {@link ILoginResponse}
 */
export const drewlabsIsAuthenticationSuccessful: (loginResponse: ILoginResponse) => boolean =
  (loginResponse: ILoginResponse) => loginResponse.success && responseStatusOK(loginResponse.statusCode);

/**
 * @description Checks user has double authentication activated on his account
 * @param loginState Login state instance
 */
export const isDoubleAuthActive: (loginState: ILoginState) => boolean =
  (loginState: ILoginState) => loginState.is2FactorAuthenticationEnabled;

/**
 * @description Get logged in user from the login reponse parameter
 * @param loginResponse Login result|response instance
 */
export const getLoggedInUser: (loginResponse: ILoginResponse) => IAppUser =
  (loginResponse: LoginResponse) => loginResponse.responseData.user;

export const onAuthenticationResultEffect: LoginReponseHandlerFunc<LoginResponseWithAuthenticationResult> = (
  userStorageHandler: IUserStorageHandler, tokenProvider: IAuthTokenHandler, rememberProvider: IRememberTokenHandler, remember = false) => {
  return (source$: Observable<any>) => {
    return source$.pipe(
      tap(data => {
          console.log('xxxxxxxxxx');
          console.log(data);
      }),
      map(state => {

        let is2FactorAuthEnabled = false;
        let isAutenticated = false;
        const loginResponse = getLoginResponse(state);
        console.log('58');
        console.log(loginResponse);
        if (drewlabsIsAuthenticationSuccessful(loginResponse)) {
          isAutenticated = true;
          // Check if is double authentication active
          const loginState = getLoginState(loginResponse);


          if (!isDoubleAuthActive(loginState)) {
            is2FactorAuthEnabled = false;
            // Put user details to into app local storage
            console.log('69');
            tokenProvider.setToken(loginState.token);
            const authenticatedUser = getLoggedInUser(loginResponse);
            if (Boolean(remember)) {
              rememberProvider.setToken({ userId: authenticatedUser.id, token: authenticatedUser.rememberToken });
            }

            userStorageHandler.addUserToCache(authenticatedUser);
          } else {
            is2FactorAuthEnabled = true;
          }
        }
        console.log('{ is2FactorAuthEnabled, isAutenticated, loginResponse }');
        console.log({ is2FactorAuthEnabled, isAutenticated, loginResponse });
        return { is2FactorAuthEnabled, isAutenticated, loginResponse };
      })
    );
    // return createObservable((observer: Subscriber<LoginResponseWithAuthenticationResult>) => {
    //   // Allow to unsuscribe to source observable as part of teardown
    //   return source$.subscribe(
    //     next => {
    //       let is2FactorAuthEnabled = false;
    //       let isAutenticated = false;
    //       const loginResponse = getLoginResponse(next);
    //       if (drewlabsIsAuthenticationSuccessful(loginResponse)) {
    //         isAutenticated = true;
    //         // Check if is double authentication active
    //         const loginState = getLoginState(loginResponse);
    //         if (!isDoubleAuthActive(loginState)) {
    //           is2FactorAuthEnabled = false;
    //           // Put user details to into app local storage
    //           tokenProvider.setToken(loginState.token);
    //           const authenticatedUser = getLoggedInUser(loginResponse);
    //           if (Boolean(remember)) {
    //             rememberProvider.setToken({ userId: authenticatedUser.id, token: authenticatedUser.rememberToken });
    //           }
    //           userStorageHandler.addUserToCache(authenticatedUser);
    //         } else {
    //           is2FactorAuthEnabled = true;
    //         }
    //       }
    //       observer.next({ is2FactorAuthEnabled, isAutenticated, loginResponse });
    //     },
    //     // Emit error when error is thrown
    //     err => observer.error(err),
    //     // Complete the inner observable when source completes.
    //     () => observer.complete()
    //   );
    // });
  };
};
