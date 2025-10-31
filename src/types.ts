
export type UserRole = 'Administrador' | 'Vendedor' | 'Market' | 'Consultas' | 'Visitante';

export interface User {
  name: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

export interface ProductSupplier {
  name: string;
  cost: number;
}

export interface Product {
  id: string;
  name: string;
  spec: string;
  price: number;
  suppliers: ProductSupplier[];
  productTypes: string[];
  productLines: string[];
}

export interface Supplier {
    name: string;
    address: string;
    details: string;
    phone: string;
    paymentMethods: string[];
    productTypes: string[];
    productLines: string[];
}

export type Page = 'dashboard' | 'consultas' | 'drones' | 'marketing' | 'produtos' | 'perfil' | 'admin' | 'sobre';
