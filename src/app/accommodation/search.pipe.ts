import { Pipe, PipeTransform } from '@angular/core';
import { Accommodation } from './model/accommodation';
import { filter } from 'rxjs';

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
  var splitted = filters.price.split("-", 2);
  var minPrice =+ splitted[0]
  var maxPrice =+ splitted[1]

  if(filters.guests === null || filters.guests === undefined){
    filters.guests = 0;
    numberValue = 0;
  }

  function containsAllElements(listToCheck: any[] | undefined, elementsToCheck: any[] | undefined): boolean {
    if (!listToCheck || !elementsToCheck) {
      return false; // One of the arrays is undefined or null
    }
  
    return elementsToCheck.every(element =>
      listToCheck.some(item =>
        item && element && item.toString().toLowerCase().includes(element.toString().toLowerCase())
      )
    );
  }
  
  
  
  if (!filters || (filters.location === '' && filters.guests == 0 && filters.price === '' && filters.type === '' && filters.benefits[0] === '' && filters.start === '' && filters.end ==='' )) {
    return items;
  }
  return items.filter(item => {
    const locationMatch = filters.location === '' || item.location.toLowerCase().includes(filters.location.toLowerCase());
    const guestsMatch = filters.guests == 0 || (item.minGuests <= numberValue &&  item.maxGuests >= numberValue);
    const priceMatch = filters.price === '' || (item.price >= minPrice && item.price <= maxPrice);
    const typeMatch = filters.type === '' || item.accommodationType.toLowerCase().includes(filters.type.toLowerCase());
    const benefitsMatch = filters.benefits[0] === '' || containsAllElements(item.benefits, filters.benefits);
    const startDateMatch = filters.start === '' || (item.availabilityStart <= filters.start && item.availabilityEnd >= filters.start);
    const endDateMatch = filters.end === '' || (item.availabilityEnd >= filters.end && item.availabilityStart <= filters.end);

    return locationMatch && guestsMatch && priceMatch && typeMatch && benefitsMatch && startDateMatch && endDateMatch;


  });
  
}


}
