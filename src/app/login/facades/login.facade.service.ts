import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/services/user/models/user-interface';
import * as fromShared from '../../shared/reducers/shared-reducer';
import { UserAuthenticationAction } from '../actions/user-authentication-action';
import { LoginDetails } from '../models/login-request.model';
import { LoginFacadeServiceInterface } from './login.facade.service.interface';

@Injectable({
    providedIn: 'root'
})

export class LoginFacadeService implements LoginFacadeServiceInterface {
    public userDetails$: Observable<IUser>
    constructor(private store$: Store<fromShared.State>){
        this.userDetails$ = this.store$.select(fromShared.selectUserProfile);
    }

    authenticateUser(value: LoginDetails): void {
        this.store$.dispatch(new UserAuthenticationAction(value));
    }
}