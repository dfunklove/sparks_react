import { User } from "./graphql/generated"

const AUTH_TOKEN = 'auth-token';
const FLASH = 'flash';
const LAST_LESSON_TYPE = 'last-lesson-type';
const USER = 'user';

export const getFlash = () => localStorage.getItem(FLASH);
export const setFlash = (flash: string) => localStorage.setItem(FLASH, flash);
export const deleteFlash = () => localStorage.removeItem(AUTH_TOKEN);
export const getLastLessonType = () => localStorage.getItem(LAST_LESSON_TYPE);
export const setLastLessonType = (lesson_type: string) => localStorage.setItem(LAST_LESSON_TYPE, lesson_type);
export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = (token: string) => localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);
export const getUser = () => { 
  let user = localStorage.getItem(USER);
  return user ? JSON.parse(user) : null;
}
export const setUser = (user: User) => localStorage.setItem(USER, JSON.stringify(user));
export const deleteUser = () => localStorage.removeItem(USER);
