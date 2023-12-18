export enum AccommodationType {
    Hotel = "Hotel",
    Apartment = "Apartment",
    Motel = "Motel",
    Studio = "Studio",
}
export class Accommodation {

    public id: number | null;
    public ownerEmail: string;
    public name: string;
    public description: string;
    public location: string;
    public minGuests: number;
    public maxGuests: number;
    public accommodationType: AccommodationType;
    public benefits: Array<string>;
    public availabilityStart: Date;
    public availabilityEnd: Date;
    public isApproved: boolean;
    public isPriceByGuest: boolean;
    public price: number;
    public reservationCancellationDeadline: number;

    constructor(
        id: number | null,
        ownerEmail: string,
        name: string,
        description: string,
        location: string,
        minGuests: number,
        maxGuests: number,
        accommodationType: string,
        benefits: string,
        availabilityStart: Date,
        availabilityEnd: Date,
        isPriceByGuest: string,
        price: number,
        reservationCancellationDeadline: number
    ) {
        this.id = id;
        this.ownerEmail = ownerEmail;
        this.name = name;
        this.description = description;
        this.location = location;
        this.minGuests = minGuests;
        this.maxGuests = maxGuests;
        this.accommodationType = accommodationType as AccommodationType;
        this.benefits = benefits.split(",").map(item => item.trim());
        this.availabilityStart = availabilityStart;
        this.availabilityEnd = availabilityEnd;
        this.isApproved = false;
        if (isPriceByGuest == "perGuest") {
            this.isPriceByGuest = true;
        }
        else {
            this.isPriceByGuest = false;
        }
        this.reservationCancellationDeadline = reservationCancellationDeadline;
        this.price = price;
    }
}

export const AccommodationTypeMapping: Record<AccommodationType, string> = {
    [AccommodationType.Apartment]: "Apartment",
    [AccommodationType.Hotel]: "Hotel",
    [AccommodationType.Motel]: "Motel",
    [AccommodationType.Studio]: "Studio",
};