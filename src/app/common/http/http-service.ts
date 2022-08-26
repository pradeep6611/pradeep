import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpOptionsConfig } from "src/app/common/http/http-options-model";

@Injectable({
    providedIn: "root"
})
export class HttpService {
    constructor(){}
    
    buildHttpHeaders = (): HttpHeaders=> new HttpHeaders({
        'Authorization': 'my-auth-token',
        'Content-Type': 'application/json'
    });

    buildHTTPRequestOptions(empID: any = '', params?: HttpParams): HttpOptionsConfig {
        const options : HttpOptionsConfig = {
            headers: this.buildHttpHeaders(),
            body: JSON.stringify(empID)
        }

        if(params) {
            options.params = params;
        }

        return options
    }
}

