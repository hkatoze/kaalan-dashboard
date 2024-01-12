import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Errorpage from "./routes/Errorpage";

import App from "./App";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import Mainpage from "./routes/main/Mainpage";

import Profilboard from "./routes/main/board/profilboard/Profilboard";
import Helpboard from "./routes/main/board/helpboard/Helpboard";
import { Authorsboard } from "./routes/main/board/authorsboard/Authorsboard";
import { Booksboard } from "./routes/main/board/booksboard/Booksboard";
import { Dashboard } from "./routes/main/board/dashboard/Dashboard";
import { Dashview } from "./routes/main/board/dashboard/Components/Dashview/Dashview";
import { Usersboard } from "./routes/main/board/usersboard/Usersboard";
import Addbook from "./routes/main/board/booksboard/Components/addbook/Addbook";
import AddAuthor from "./routes/main/board/authorsboard/Components/addAuthor/AddAuthor";
import { Categoriesboard } from "./routes/main/board/categoriesboard/Categoriesboard";
import AddCategory from "./routes/main/board/categoriesboard/Components/addCategory/AddCategory";
import { Booksview } from "./routes/main/board/booksboard/Components/booksview/Booksview";
import Bookview from "./routes/main/board/booksboard/Components/booksview/bookview/Bookview";
import { EditBook } from "./routes/main/board/booksboard/Components/booksview/editBook/EditBook";
import { Authorsview } from "./routes/main/board/authorsboard/Components/authorsView/AuthorsView";
import AuthorView from "./routes/main/board/authorsboard/Components/authorsView/authorView/AuthorView";
import { EditAuthor } from "./routes/main/board/authorsboard/Components/editAuthor/EditAuthor";
import { CategoriesView } from "./routes/main/board/categoriesboard/Components/categoriesView/CategoriesView";
 
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "mainpage",
        element: <Mainpage />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [{ path: "dashview", element: <Dashview /> }],
          },
          {
            path: "booksboard",
            element: <Booksboard />,
            children: [
              { path: "booksview", element: <Booksview /> },
              { path: "booksview/:bookId", element: <Bookview /> },
              { path: "booksview/editBook/:bookId", element: <EditBook /> },
              {
                path: "addbook",
                element: <Addbook />,
              },
            ],
          },
          {
            path: "authorsboard",
            element: <Authorsboard />,
            children: [
              { path: "authorsview", element: <Authorsview /> },
              { path: "authorsview/:authorId", element: <AuthorView /> },
              { path: "authorsview/editAuthor/:authorId", element: <EditAuthor /> },
              {
                path: "addauthor",
                element: <AddAuthor />,
              },
            ],
          },

          {
            path: "categoriesboard",
            element: <Categoriesboard />,
            children: [
              { path: "categoriesview", element: <CategoriesView /> },
              {
                path: "addcategory",
                element: <AddCategory />,
              },
            ],
          },
          { path: "usersboard", element: <Usersboard /> },

          { path: "profilboard", element: <Profilboard /> },
          { path: "helpboard", element: <Helpboard /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
