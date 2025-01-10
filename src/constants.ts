export const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTczNjUzNDYyNCwiZXhwIjoxNzY4MDcwNjI0fQ.0bi2vZ3gcbpj_SnpM9s_rdXrCUpwkZS7p4Wu-Ucy-24`,
  "Content-Type": "application/json",
};

export type BookModel = {
  id?: number;
  title: string;
  publicationDate: string;
  cover: string;
  description: string;
  category: string;
  nbrPage: string;
  author: string;
  bookLink: string;
};

export type AuthorModel = {
  author: Author;
  books: BookModel[];
};

export type Author = {
  id?: number;
  name: string;
  description: string;
  profilImg: string;
};
export type CategoryModel = {
  id?: number;
  name: string;
  icon: string;
};
//https://kaalan-api-0p6d.onrender.com
export const endpoint = "https://kaalan-api.onrender.com";
export interface Admin {
  emailAddress: string;
  password?: string;
  username: string;
  firstname: string;
  lastname: string;
  role: string;
  token?: string;
}

export interface ApiErrorResponse {
  message: string;
  // Ajoutez d'autres propriétés si nécessaire
}
