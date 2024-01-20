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
    public availabilityDates: Array<DateRange>
    public isApproved: boolean;
    public isPriceByGuest: boolean;
    public reservationCancellationDeadline: number;
    public isAutomaticAcceptance: boolean;

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
        availabilityDates: Array<DateRange>,
        isPriceByGuest: string,
        reservationCancellationDeadline: number,
        isAutomaticAcceptance: string
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
        this.availabilityDates = availabilityDates;
        this.isApproved = false;
        if (isPriceByGuest == "perGuest") {
            this.isPriceByGuest = true;
        }
        else {
            this.isPriceByGuest = false;
        }
        this.reservationCancellationDeadline = reservationCancellationDeadline;
        if (isAutomaticAcceptance == "automatic") {
            this.isAutomaticAcceptance = true;
        }
        else {
            this.isAutomaticAcceptance = false;
        }
    }
}

export class DateRange {

    public startDate: Date;
    public endDate: Date;
    public price: number;

    constructor(
        startDate: Date,
        endDate: Date,
        price: number
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }

    public IsOverlapping(other: DateRange) : boolean {

        if (other.startDate <= this.startDate && other.endDate <= this.startDate)
            return false;
        if (other.startDate >= this.endDate && other.endDate >= this.endDate)
            return false;
        return true;

    }

    public IsBetween(other: DateRange) : boolean {

        if (this.startDate >= other.startDate && this.endDate <= other.endDate)
            return true;
        return false;

    }

    public SetTimeToZero() {
        this.startDate.setHours(0, 0, 0, 0);
        this.endDate.setHours(0, 0, 0, 0);
    }
}

export const AccommodationTypeMapping: Record<AccommodationType, string> = {
    [AccommodationType.Apartment]: "Apartment",
    [AccommodationType.Hotel]: "Hotel",
    [AccommodationType.Motel]: "Motel",
    [AccommodationType.Studio]: "Studio",
};