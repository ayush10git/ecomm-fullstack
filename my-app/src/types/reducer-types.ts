import { CartItem, ShippingInfo, User } from "./types";

export interface UserReducerInitialState{
    userReducer: any;
    user: User | null;
    loading: boolean;
}

export interface CartReducerInitialState{
    loading: boolean;
    cartItems: CartItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: ShippingInfo;
}