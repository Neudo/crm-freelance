import { ReactElement } from 'react';

export interface PageProps {
    auth?: {
        user: User;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface PageComponent {
    layout?: (page: ReactElement) => ReactElement;
}
