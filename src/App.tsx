import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { useClient } from 'urql';
import Root from "./routes/root";
import LessonsCheckout, { action as lessonsCheckoutAction } from './routes/lessons_checkout'
import LessonsNew, { action as lessonsNewAction } from './routes/lessons_new'

function App() {
  const client = useClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <LessonsNew />, action: lessonsNewAction({client})},
        { path: "lessons/:id/checkout", element: <LessonsCheckout />, action: lessonsCheckoutAction({client}) },
        { path: "lessons/new", element: <LessonsNew />, action: lessonsNewAction({client}) },
      ],
    },
  ]);
  
  function ErrorBoundary() {
    let error = useRouteError();
    console.error("THIS IS THE BOUNDARY")
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return <div>An unexpected error occurred.</div>;
  }
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
