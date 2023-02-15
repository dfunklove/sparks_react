import { User } from "./graphql/generated"

const AUTH_TOKEN = 'auth-token';
const FLASH = 'flash';
const USER = 'user';

export const getFlash = () => localStorage.getItem(FLASH);
export const setFlash = (flash: string) => localStorage.setItem(FLASH, flash);
export const deleteFlash = () => localStorage.removeItem(AUTH_TOKEN);
export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = (token: string) => localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);
export const getUser = () => { 
  let user = localStorage.getItem(USER);
  return user ? JSON.parse(user) : null;
}
export const setUser = (user: User) => localStorage.setItem(USER, JSON.stringify(user));
export const deleteUser = () => localStorage.removeItem(USER);
