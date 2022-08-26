import { Observable } from "rxjs";
import { Teams } from "../models/teams-model";

export interface RegisterFacadeInterface {
    teams$ : Observable<Teams[]>;
    loadTeams(): void;
}