export interface INote {
    id: string;
    name: string;
    content: string;
    category: string;
    created: string;
    dates: string;
    archived: boolean;
}

export interface IUpdateNote {
    name?: string;
    content?: string;
    category?: string;
    dates?: string;
    archived?: boolean;
}

export interface INoteData {
    name: string;
    content: string;
    category: string;
    dates: string;
}

export interface IStats<T> {
    Task: T,
    RandomThought: T,
    Idea: T,
    Quote: T,
}

export interface IGroupStats {
    active: number,
    archived: number,
}
