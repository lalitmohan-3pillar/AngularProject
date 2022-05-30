import {environment} from 'src/environments/environment';

export const baseUrl=environment.apiurl ;

export const productUrl=baseUrl+'/products';
export const cartUrl=baseUrl+'/cart';
export const wishListUrl=baseUrl+'/wishlist';
export const registerUrl=baseUrl+'/registeruser';
export const OrderUrl=baseUrl+'/orderdata';