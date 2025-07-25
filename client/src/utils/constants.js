export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = `/api/auth`;
export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO_ROUTE = `${AUTH_ROUTES}/user-info`;
export const UPDATE_USER_INFO_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/upload-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-image`;