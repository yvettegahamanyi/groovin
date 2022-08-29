export enum EbackendEndpoints{
    // user routes
    CREATE_USER = '/user/register',
    LOGIN_USER = '/user/login',
    GET_USER = '/user/one/',
    UPDATE_USER='/user/shipping',

    // design routes

    CREATE_DESIGN = '/design/register',
    UPDATE_DESIGN = '/design/update/',
    GET_DESIGNS = '/design/all',

    
    // order routes
    GET_ORDER_BY_CUSTOMERID = '/order/customer/'

}

export enum EhttpMethod{
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT'
}