export class OwnerReview {

    public id: number | null;
    public guestEmail: string;
    public ownerEmail: string;
    public comment: string;
    public rating: string;
    public isReported: boolean;

    constructor(
        id: number | null,
        guestEmail: string,
        ownerEmail: string,
        comment: string,
        rating: string,
        isReported: boolean
    ) {
        this.id = id;
        this.guestEmail = guestEmail;
        this.ownerEmail = ownerEmail;
        this.comment = comment;
        this.rating = rating;
        this.isReported = isReported;
    }

}