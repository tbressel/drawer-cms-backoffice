export class GetTemplateModel{
    id_articles!: number;
    templateChoice!: string;

    isTitleLeft!: boolean | null;
    isTitleRight!: boolean | null;
    isTitleCenter!: boolean | null;
    isTextLeft!: boolean | null;
    isTextRight!: boolean | null;
    isTextCenter!: boolean | null;
    isImageLeft!: boolean | null;
    isImageRight!: boolean | null;
    isImageCenter!: boolean | null;
    isAttachementLeft!: boolean | null;
    isAttachementRight!: boolean | null;
    isAttachementCenter!: boolean | null;

    page!: number;
}