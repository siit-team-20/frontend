import { Accommodation } from "./accommodation";

export class FavouriteAccommodation {

    public id: number | null;
    public guestEmail: string;
    public accommodation: Accommodation;

    constructor(
        id: number | null,
        guestEmail: string,
        accommodation: Accommodation
    ) {
        this.id = id;
        this.guestEmail = guestEmail;
        this.accommodation = accommodation;
    }

}