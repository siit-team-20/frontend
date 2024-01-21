export class AccommodationReview {

    public id: number | null;
    public guestEmail: string;
    public accommodationId: number;
    public comment: string;
    public rating: string;
    public isApproved: boolean;
    public submitDate: Date;

    constructor(
        id: number | null,
        guestEmail: string,
        accommodationId: number,
        comment: string,
        rating: string,
        isApproved: boolean,
        submitDate: Date
    ) {
        this.id = id;
        this.guestEmail = guestEmail;
        this.accommodationId = accommodationId;
        this.comment = comment;
        this.rating = rating;
        this.isApproved = isApproved;
        this.submitDate = submitDate;
    }

}