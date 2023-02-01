import { User } from "./graphql/generated"

const AUTH_TOKEN = 'auth-token';
const USER = 'user';

export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = (token: string) => localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);
export const getUser = () => JSON.parse(localStorage.getItem(USER) || "");
export const setUser = (user: User) => localStorage.setItem(USER, JSON.stringify(user));
export const deleteUser = () => localStorage.removeItem(USER);
