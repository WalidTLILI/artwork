import {Artwork} from './artwork.model';

export class Magazine extends Artwork implements ResourceInterface {

  collection: string;

  getURI() {
    return 'magazines';
  }
}
