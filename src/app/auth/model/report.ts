export class Report {

    public id: number | null;
    public reporterEmail: string;
    public reportedEmail: string;

    constructor(
        id: number | null,
        reporterEmail: string,
        reportedEmail: string,
    ) {
        this.id = id;
        this.reporterEmail = reporterEmail;
        this.reportedEmail = reportedEmail;
    }

}