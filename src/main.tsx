import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { createClient, Provider } from 'urql';
import Root from "./routes/root";
import LessonsCheckout, { loader as lessonsCheckoutLoader } from './routes/lessons_checkout'
import LessonsNew, { action as lessonsNewAction } from './routes/lessons_new'
import './App.css'

const client = createClient({
  url: import.meta.env.VITE_API_URL || 'http://localhost:8000/graphql',
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <LessonsNew />, action: lessonsNewAction},
      { path: "lessons/:id/checkout", element: <LessonsCheckout />, loader: lessonsCheckoutLoader },
      { path: "lessons/new", element: <LessonsNew />, action: lessonsNewAction },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>An unexpected error occurred.</div>;
}