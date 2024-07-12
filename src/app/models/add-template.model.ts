export class AddTemplateModel {
    id_articles!: number;
    templateChoice!: string;

    titleLeft!: string | null;
    titleRight!: string | null;
    titleCenter!: string | null;
    textLeft!: string | null;
    textRight!: string | null;
    textCenter!: string | null;
    imageLeft!: File | null;
    imageRight!: File | null;
    imageCenter!: File | null;
    attachementLeft!: string | null;
    attachementRight!: string | null;
    attachementCenter!: string | null;

    page!: number;

}