import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingPipe'
})
export class RatingPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 2:
        return 'Sell';
      case 1:
        return 'Hold';
      case 0:
        return 'Buy';
      default:
        break;
    }
    return null;
  }

}
