import { Injectable } from '@angular/core';
import { GetUserDataAction } from '../actions/get-user-data-action';
import { User } from '../models/user-model';
import * as fromShared from '../../../reducers/shared-reducer';
import { UserFacadeServiceInterface } from './user-facade-service-interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MemberDetails } from '../../member/member-model';
import { map } from "rxjs/internal/operators";

@Injectable({
    providedIn: 'root'
})

export class UserFacadeService implements UserFacadeServiceInterface {

    constructor(private store$: Store<fromShared.State>){}

    get user$(): Observable<User> {
        return this.store$
            .select(fromShared.selectUserProfile)
            .pipe(map((profile) => new User(profile)));
    }

    fetchUserDetails(){
        this.store$.dispatch(new GetUserDataAction());
    }
}