import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isHighlighted'
})
export class IsHighlightedPipe implements PipeTransform {

  transform(productName: string, searchTerm: string): boolean {
    return (searchTerm != "") && productName.toLowerCase().includes(searchTerm.toLowerCase());
  }

}
