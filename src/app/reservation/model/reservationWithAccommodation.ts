import { Accommodation } from "../../accommodation/model/accommodation";

export class ReservationWithAccommodation {

    public id: number | null;
    public guestEmail: string;
    public accommodation: Accommodation;
    public date: Date;
    public days: number;
    public guestNumber: number;
    public price: number;
    public status: string;

    constructor(
        id: number | null,
        guestEmail: string,
        accommodation: Accommodation,
        date: Date,
        days: number,
        guestNumber: number,
        price: number,
        status: string
    ) {
        this.id = id;
        this.guestEmail = guestEmail;
        this.accommodation = accommodation;
        this.date = date;
        this.days = days;
        this.guestNumber = guestNumber;
        this.price = price;
        this.status = status;
    }


}