export const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjA1MDIzOSwiZXhwIjoxNzMzNTg2MjM5fQ.vlAMLEwlVnkDYZRt5pz9QqaJtWoenAbf76gvrcNBSHk`,
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
  id?: number;
  name: string;
  description: string;
  profilImg: string;
};
export type CategoryModel = {
  id?: number;
  name: string;
};
//https://sore-gray-cygnet-wear.cyclic.app
export const endpoint = "https://kaalan-api-0p6d.onrender.com";
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
