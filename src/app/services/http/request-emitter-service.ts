import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {BadInput} from '../../common/errors/bad-input';
import {NotFoundError} from '../../common/errors/not-found';
import {NotAllowedError} from '../../common/errors/not-allowed';
import {Errors} from '../../common/errors/errors';
import {catchError} from 'rxjs/operators';
import {UnauthorizedError} from '../../common/errors/unauthorized';
import {ForbiddenError} from '../../common/errors/forbidden';

@Injectable()
export class RequestEmitterService {

  constructor(protected http: HttpClient) {
  }

  /**
   *
   * @param method string
   * @param uri string
   * @param headers HttpHeaders
   * @param params HttpParams
   * @param body string
   */
  emit<T>(method: string, uri: string, headers: HttpHeaders, params: HttpParams, body: string): Observable<HttpResponse<T>> {
    if (method === 'get') {
      return this.http
        .get<T>(environment.secureServerUrl + uri,
          {
            params,
            observe: 'response'
          })
        .pipe(catchError(this.catch));
    } else if (method === 'post') {
      return this.http
        .post<T>(environment.secureServerUrl + uri, body,
          {
            headers,
            params,
            observe: 'response'
          })
        .pipe(catchError(this.catch));
    } else {
      return throwError('Unsupported request: ' + method);
    }
  }


  /**
   * Catches errors
   *
   * @param error Response
   */
  catch(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    } else if (error.status === 401) {
      return throwError(new UnauthorizedError(error));
    } else if (error.status === 403) {
      return throwError(new ForbiddenError(error));
    } else if (error.status === 404) {
      return throwError(new NotFoundError(error));
    } else if (error.status === 405) {
      return throwError(new NotAllowedError(error));
    }
    return throwError(new Errors(error));
  }
}
