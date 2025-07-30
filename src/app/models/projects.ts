export interface Project {
    id: number;
    name: string;
    owner: string;
    status: string;
    description: string;
    tasks: Array<number>;
};