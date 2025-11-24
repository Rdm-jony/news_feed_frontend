import { IUser } from "./user.interface";

export enum IPrivacy {
    PUBLIC = "public",
    PRIVATE = "private"
}

export interface IPost {
    _id?: string;
    author: IUser;
    content: string;
    images?: string[] | null;
    privacy: IPrivacy;
    likes: string[];
    createdAt: Date;
    comments: number;
    updatedAt: Date;
}
