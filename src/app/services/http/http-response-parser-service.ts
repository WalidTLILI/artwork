import {Injectable} from '@angular/core';
import {Collection} from 'src/app/models/collection';

@Injectable()
export class HttpResponseParserService {

  /**
   * Creates the specific object of a json response
   *
   * @param rootClass object
   * @param body string
   */
  parse(rootClass: object, body: string): Collection<ResourceInterface> {
    return Object.assign(rootClass, JSON.parse(body)) as Collection<ResourceInterface>;
  }

}
