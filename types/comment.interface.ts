import { IUser } from "./user.interface";

export interface IComment {
    _id: string;
    postId: string;
    parentId?: string | null;
    text: string;
    likes?: string[] | null;
    createdAt: string;
    updatedAt: string;
    author: IUser;
    replies?: IComment[];
}