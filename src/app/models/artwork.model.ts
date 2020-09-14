import DateTimeFormat = Intl.DateTimeFormat;

export class Artwork implements ResourceInterface {

  title: string;
  publicationDate: DateTimeFormat;
  price: number;

  getURI() {
    return 'artworks';
  }
}
