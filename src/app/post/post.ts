export interface Post {
    id?: number;
    title: string;
    text: string;
    likes?: number;
    date?: Date;
    image: string;
}