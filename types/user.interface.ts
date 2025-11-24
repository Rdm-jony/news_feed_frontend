
export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string | null;
    isActive: boolean;
}
