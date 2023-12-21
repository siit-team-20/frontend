import { Pipe, PipeTransform } from '@angular/core';
import { Accommodation } from './model/accommodation';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

 

// transform(value: any, args?: any, args2?: any): any {
//     if(!value) return null;
//     if(!args) return value;
    
//     // console.log(args2);
    
//     args = args.toLowerCase();
//     // args2 = args2.toLowerCase();

//     // argsguest = argsguest.toLowerCase();
   
    

//     return value.filter(function(item:any){
//       return JSON.stringify(item.location).toLowerCase().includes(args);
//     })
//   }

transform(items: any[], filters: any): any[]{
  if (!items) {
    return [];
  }
  var numberValue = +filters.guests
  console.log(filters.price);
  var splitted = filters.price.split("-", 2);
  var minPrice =+ splitted[0]
  var maxPrice =+ splitted[1]
  
  if (!filters || (filters.location === '' && filters.guests === '' && filters.price === '')) {
    return items;
  }
  return items.filter(item => {
    const locationMatch = filters.location === '' || item.location.toLowerCase().includes(filters.location.toLowerCase());
    const guestsMatch = filters.guests === '' || (item.minGuests <= numberValue &&  item.maxGuests >= numberValue);
    const priceMatch = filters.price === '' || (item.price >= minPrice && item.price <= maxPrice);

    return locationMatch && guestsMatch && priceMatch;



  });
  
}


}
