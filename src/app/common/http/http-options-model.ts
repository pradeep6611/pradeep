import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface HttpOptionsConfig {
    headers: HttpHeaders,
    params?: HttpParams,
    body?: any 
}