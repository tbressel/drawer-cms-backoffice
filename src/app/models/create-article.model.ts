export class CreateArticleModel {
    id_article!: number;
    title!: string;
    description!: string;
    idTagsList!: number[];
    idCategory!: string;
    coverImage!: File | null;
}