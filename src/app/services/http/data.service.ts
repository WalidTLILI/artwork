import {Injectable} from '@angular/core';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestEmitterService} from './request-emitter-service';
import {HttpResponseParserService} from './http-response-parser-service';
import {map} from 'rxjs/operators';
import {Collection} from 'src/app/models/collection';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private requestEmitterService: RequestEmitterService,
    private httpResponseParserService: HttpResponseParserService
  ) {
  }

  /**
   * Prepares a GET request
   *
   * @param object ResourceInterface
   * @param suffix string|null
   */
  public getItems(object: ResourceInterface, suffix: string = null): Observable<Collection<ResourceInterface>> {
    return this.sendRequest('get',
      (suffix !== null) ? object.getURI() + suffix : object.getURI(),
      new HttpHeaders(),
      new HttpParams(),
      null
    )
      .pipe(
        map((response: HttpResponse<Collection<ResourceInterface>>) => {
          return this.httpResponseParserService.parse(new Collection(), JSON.stringify(response.body));
        })
      );
  }

  /**
   * Prepares a POST request
   *
   * @param object ResourceInterface
   * @param body object
   * @param suffix string|null
   */
  postItem(object: ResourceInterface, body: object, suffix: string = null) {
    return this.sendRequest('post',
      (suffix !== null) ? object.getURI() + suffix : object.getURI(),
      new HttpHeaders().set('Content-Type', 'application/json'),
      new HttpParams(),
      body
    );
  }


  /**
   * Creates and emits the request
   *
   * @param method string
   * @param uri string
   * @param headers HttpHeaders
   * @param params HttpParams
   * @param body Array<any>
   */
  public sendRequest(method: string, uri: string, headers: HttpHeaders, params: HttpParams, body: object) {
    return this.requestEmitterService.emit<any>(method, uri, headers, params, JSON.stringify(body));
  }

}
