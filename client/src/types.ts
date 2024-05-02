export type User = {
    _id: number;
    email: string;
    name: string;
    password: string;
    __v: number
}

export type UserContextType = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};