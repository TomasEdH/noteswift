export interface User {
    _id: number;
    user: User;
    email: string;
    name: string;
    password: string;
    __v: number
}

export interface UserContextType {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export type Note = {
    _id: number;
    title: string;
    content: string;
    tags: string[];
    isPinned: boolean;
    __v: number;
}