export class Token implements ResourceInterface {

  token: string;

  getURI() {
    return 'login';
  }
}
