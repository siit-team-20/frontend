export enum NotificationType {
    ReservationCreated = "ReservationCreated",
    ReservationCancelled = "ReservationCancelled",
    OwnerReviewAdded = "OwnerReviewAdded",
    AccommodationReviewAdded = "AccommodationReviewAdded",
    ReservationResponse = "ReservationResponse",
}

export class Notification {

    public id: number | null;
    public userEmail: string;
    public otherUserEmail: string;
    public type: NotificationType;
    public createdAt: Date;

    constructor(
        id: number | null,
        userEmail: string,
        otherUserEmail: string,
        type: NotificationType,
        createdAt: Date
    ) {
        console.log(createdAt)
        this.id = id;
        this.userEmail = userEmail;
        this.otherUserEmail = otherUserEmail;
        this.type = type;
        this.createdAt = createdAt;
    }
}

export const NotificationTypeMapping: Record<NotificationType, string> = {
    [NotificationType.ReservationCreated]: "ReservationCreated",
    [NotificationType.ReservationCancelled]: "ReservationCancelled",
    [NotificationType.OwnerReviewAdded]: "OwnerReviewAdded",
    [NotificationType.AccommodationReviewAdded]: "AccommodationReviewAdded",
    [NotificationType.ReservationResponse]: "ReservationResponse",
};