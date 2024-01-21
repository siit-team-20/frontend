import { Pipe, PipeTransform } from '@angular/core';
import { ReservationWithAccommodation } from './model/reservationWithAccommodation';

@Pipe({
  name: 'searchReservation',
  standalone: true
})
export class SearchReservationPipe implements PipeTransform {

  transform(items: ReservationWithAccommodation[], filters: any): any[]{
    

    if (!items) {
      return [];
    }

    
    if (!filters || (filters.start === '' && filters.end === '' && filters.status === '' && filters.name === '')) {
      return items;
    }
    return items.filter(item => {
      filters.start = (new Date(filters.start)).setHours(0, 0, 0, 0);
      const startDateMatch = filters.start === '' || (new Date(item.date)>= new Date(filters.start) && new Date(new Date(item.date).setDate(new Date(item.date).getDate() + item.days)) >= new Date(filters.start));
      const endDateMatch = filters.end === '' || (new Date(new Date(item.date).setDate(new Date(item.date).getDate() + item.days)) <= new Date(filters.end) && new Date(item.date) <= new Date(filters.end));
      const statusMatch = filters.status === ''|| item.status.toLowerCase().includes(filters.status.toLowerCase());
      const nameMatch = filters.name === '' || item.accommodation.name.toLowerCase().includes(filters.name.toLowerCase());
      return startDateMatch && endDateMatch && statusMatch && nameMatch;
  
    });
    
  }

}
