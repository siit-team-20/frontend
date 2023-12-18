export class Accommodation {
    constructor(
        public id: number | null,
        public ownerEmail: string,
        public name: string,
        public description: string,
        public location: string,
        public minGuests: number,
        public maxGuests: number,
        public accommodationType: string,
        public benefits: Array<string>,
        public availabilityStart: Date,
        public availabilityEnd: Date,
        public isApproved: boolean,
        public isPriceByGuest: boolean,
        public price: number,
        public reservationCancellationDeadline: Date,
        public pictures: Array<string>
    ) {}
}