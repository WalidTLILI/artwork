import {DatePipe} from '@angular/common';

export class Date {

  /**
   * Transform date format
   * @param value any
   * @param args any
   */
  static transform(value: any, ...args: any[]) {
    return new DatePipe('fr-FR').transform(value, 'dd-MM-yyyy');
  }
}
