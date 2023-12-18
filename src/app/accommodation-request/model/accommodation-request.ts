import { Accommodation } from "../../accommodation/model/accommodation";

export class AccommodationRequest {
    constructor(
        public id: number | null,
        public oldAccommodation: Accommodation | null,
        public newAccommodation: Accommodation,
        public type: string
    ) { }
}