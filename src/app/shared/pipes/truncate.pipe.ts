import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    const length = +args[0];

    if (value.length > length) {
      return value.substring(0, length).trim() + '...';
    }

    return value;
  }
}
