export interface Comment {
    id?: number;
    text: string;
    date?: string;
    postId: number;
    userId?: number;

    User?: {
        username: string;
    };
}
