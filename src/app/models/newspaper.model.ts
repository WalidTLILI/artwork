import {Artwork} from './artwork.model';

export class Newspaper extends Artwork implements ResourceInterface {

  periodicity: number;

  getURI() {
    return 'newspapers';
  }
}
