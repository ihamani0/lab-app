import { LucideIcon } from "lucide-react";




export interface BreadcrumbItem {
    title: string;
    href: string;
}


export interface Doctor   {
    id: string ;
    name: string;
    phone: number;
    address: string;
}

export interface Patient   {
    id: number;
    name: string;
    phone: string;
    address: string;

    doctor : {
        id : number ,
        name : string
    };
};


export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title : string,
    href : string,
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}
