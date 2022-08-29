export interface INavProps {
  title: string;
  children: object;
  path: string;
}
export interface IButtonProps {
  title: string;
  action?: ()=>void;
}

export interface IProductProps {
  hasActions?: boolean;
  design?: DesignType;
}

export interface IDesignProps {
  small?: boolean;
  hasMore?: boolean;
  hasActions?: boolean;
  design?: DesignType;
}
export interface IDesignSectionsProps {
  small?: boolean;
  grid?: boolean;
  designs?: DesignType[];
}

export interface IOrderTrackProps {
  active?: boolean;
  end?: boolean;
}

export interface SignupFormInput {
  name?: string;
  username?: string;
  email?: string;
  // isDesigner?: string;
  country?: string;
  password?: string;
}

export interface LoginFormInput {
  username?: string;
  password?: string;
}

export interface ForgotPasswordFormInput {
  email?: string;
}

export interface BodyMeasurement {
  body_Height?: string;
  bust_Circomference?: string;
  waist_circumference?: string;
  hips_bust_circumference?: string;
  elbow?: string;
  biceps?: string;
}

export interface AddressModal {
  isVisible?: boolean;
  setModalVisiblity: (value: boolean) => void;
  ontouchOutSide: Function;
  title?: string;
  user?: UserObject;
}

// export interface DeliveryData {
//   street_address?: string;
//   streen_number?: string;
//   postal_code?: string;
//   country?: string;
//   city?: string;
//   phone_number?: string;
// }

export interface DecodedToken {
  exp?: number;
  iat?: number;
  user_id: string;
}

export interface UserObject {
  email?: string;
  isDesigner?: boolean;
  streetAddress?: string;
  streetNumber?: string;
  postalCode?: string;
  city: string;
  _id?: string;
  name?: string;
  username?: string;
  password?: string;
  country?: string;
  followers?:string[];
  status:string;
  isAdmin:boolean;
  createdAt:string;
  phoneNumber:string;
}

export type ToastProps = {
  status:string;
  message:string;
}


export type Designer ={
city?: string,
country?: string, 
createdAt?: string,
email?: string,
followers: string[],
name?: string,
password?: string,
postalCode?: string,
streetAddress?: string,
streetNumber?: string,
username?: string,
_id?: string,
}

export type DesignType = {
  createdAt?: string,
designer_id?: Designer,
images?: string[],
name?: string,
updatedAt?: string,
votes?: string[],
_id?: string;
fabrics?: Fabric[];
cost_Price?:number;
selling_price?: number;
}

export type Fabric ={
  name?:string;
file_link?:string;
type:string;
description: string;
}

export type OrderType={
  order_id?: string;
}
