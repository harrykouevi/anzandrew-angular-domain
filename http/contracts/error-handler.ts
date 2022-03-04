import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { UIStateStatusCode } from "../../contracts/ui-state";

export interface ErrorHandler {
    /**
     * @description Convert HTTP Error response error object into an HTTpResponse onbject
     * @param error Erro object
     */
    handleError(
        error: HttpErrorResponse): HttpErrorResponse | { status: UIStateStatusCode, validationErrors: { [prop: string]: any } } | Observable<never>;
}