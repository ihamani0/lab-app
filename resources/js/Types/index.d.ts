
import { LucideIcon } from "lucide-react";




export interface FiltersQuery  {
        search ?: string;
        category_id ?: string;
        brand_id ?: string;
        supplier_id?:string;
        sort_by ?: string;
        unit?:string;
        status?:string;
        type ?:string;
        doctor_id ?:string
        technician_id ?:string
        payment_status ?: string,
        amount_min ?:string,
        amount_max ?:string,
        date_from ?: string ,
        date_to ?: string
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
        ref: string | null;
        lot: string | null;
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

export interface Purchase {
    id : string | number
    supplier : Suppiler;
    invoice_number : string ;
    purchase_date : string ;
    status : string ;
    subtotal_amount : number;
    discount_amount : number;
    tax_amount : number;
    paid_amount : number;
    paid_amount : number;
    net_amount:number
    payment_status : string  ;
    currency:string ;
    invoice_url:string ;
    created_at : string ;
    updated_at : string;
    purchase_items :PurchaseItems[]
}

export interface PurchaseItems {
        material : Product
        ordered_quantity : number;
        received_quantity : number ;
        remaining_quantity  : number ;
        unit_price  : number ;
        discount_percentage  : number ;
        discount_amount  : number ;
        tax_percentage : number ;
        tax_amount : number ;
        total_price  : number ;
        batch_number : string ;
        expiry_date : string ;
}



export interface Stock {
    id: number;
    sku ?: string;
    ref ?: string ;
    lot ?:string;
    name: string;
    min_stock:string;
    quantity : string ;
    stock_movements : StockMovement;

}

export interface StockMovement {
        id: number;
        material : Product;
        type : "purchase_in" | "consumption_out" | "adjustment" ; //
        quantity: string ;
        movement_date ?: string | Date;
        raison?:string;
        last_move_date ?: string;
        last_move ?: string ;
}


type statusCase = "pending" |"delivered" |"in_progress" | "completed" | "on_hold" | "cancelled"

export interface Case {
    id : string | number;
    case_number :string,
    patient : Patient,
    doctor : Doctor ,
    technician : User ,
    assistant ?:string ,
    description ?:string ,
    received_date ?: string ,
    delivered_date ?: string ,
    total_cost ?:string ,
    paid_amount ?: string ,
    status: statusCase,
    notes ?:string;
    case_items : CaseItems[];

}

export interface CaseItems {
    id : string | number;
    service : Service;
    tooth_number : string ;
    description : string ;
    shade : string ;
    disk_type : string ;
    quantity : string ;
    unit_price : string ;
    status : statusCase ;
}



export interface Service {
    id: string;
    service_number: string;
    name: string;
    description: string;
    price: number;
}


export interface InvoiceCase {
    id: string;
    invoice_number : string ,
    case : Case ,
    total_amount : number ,
    tva_amount : number ,
    discount_amount : number ,
    net_amount : number ,
    invoice_date : string ,
    status : string ,
    payment_status : string ,
    payment_date :  Date | undefined ,
    note ?:string

}

export interface Consumption {

    total_quantity : string ;
    total_cost : string ;
    avg_unit_cost : string ;
    material_id : string ;
    material_name : string ;
    material_sku : string ;
    in_stock: string ;
    unit_price :  string ;
}
