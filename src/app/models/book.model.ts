import {Artwork} from './artwork.model';

export class Book extends Artwork implements ResourceInterface {

  author: string;
  isbn: number;

  getURI() {
    return 'books';
  }
}
