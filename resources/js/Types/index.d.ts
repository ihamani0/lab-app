import { LucideIcon } from "lucide-react";

export interface FiltersQuery  {
        search ?: string
        category_id ?: string
        brand_id ?: string
        sort_by ?: string
        unit?:string
    }

export interface User {
    id: number;
    name: string;
    email: string;
    is_active?:boolean ;
    remember_token?: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Auth {
    user: User;
}



export interface BreadcrumbItem {
    title: string;
    href: string;
}


export interface Doctor   {
    id: string ;
    name: string;
    phone?: number;
    address?: string;
    email ?:string;
    cabine ?: string;
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


export interface FalshProps
{
    flash: { success?: string; error?: string };
    [key: string]: any;

}

export interface PaginationLink  {
    url: string | null;
    label: string;
    active: boolean;
};



export interface Category {
    id: string;
    name: string;
    description ?: string;
    create?: string;
    update?: string;
}

export interface Brands {
    id: number;
    name: string;
    description ?: string;
    category : {
        id : string ,
        name : string
    } ;
    create: string;
    update: string;
}


type UnitType = 'piece' | 'gram' | 'ml' | 'disk' | string;

interface Product {
        id : string ;
        sku: string | null;
        name: string;
        description?: string | null;
        image?: File | string | null;
        price : number ;
        unit: UnitType; // or StrictUnitType if you want strict validation
        stock_quantity: number;
        min_stock?: number;
        thumb ?: string | null ;
        barcode?: string | null;
        qrcode?: string | null;
        imageUrl ?: string | null ;
        brand : {
            id : string ,
            name : string
        } ,
        category: {
            id : string ,
            name : string
            brands : Brands[]
        };
        created_at: string;
        updated_at: string;
}


export interface Suppiler {
    id: number;
    name: string;
    phone?: string;
    address?: string;
    description?:string;
    email?: string;
    website ?: string;
    logo ?: File | string | null;
    facebook ?: string;
    instagram ?: string;
    whatsapp ?: string;
    logoUrl?:string;
    created_at: string;
    updated_at: string;
}

