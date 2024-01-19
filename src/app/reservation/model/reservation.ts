export enum ReservationStatus{
    Waiting = "Waiting",
	Approved = "Approved",
	Rejected = "Rejected",
	Canceled = "Cancelled",
	Finished = "Finished"
}
export class Reservation{

    public id: number | null;
    public guestEmail: string;
    public accommodationId: number;
    public date: Date;
    public days: number;
    public guestNumber: number;
    public price: number; 
    public status: ReservationStatus;

    constructor(
        id: number | null,
        guestEmail: string,
        accommodationId: number,
        date: Date,
        days: number,
        guestNumber: number,
        price: number,
        status: ReservationStatus
         )
         {
            this.id = id;
            this.guestEmail = guestEmail;
            this.accommodationId = accommodationId;
            this.date = date;
            this.days = days;
            this.guestNumber = guestNumber;
            this.price = price; 
            this.status = status as ReservationStatus;
         }


}
