import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kilogramsToGrams',
  standalone: true
})
export class KilogramsToGramsPipe implements PipeTransform {

  transform(value: number): number {
    return value * 1000;
  }

}
