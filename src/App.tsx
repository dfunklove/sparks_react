import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { useClient } from 'urql';
import Login from "./routes/login"
import ProtectedRoute from "./routes/protected_route";
import Root from "./routes/root";
import GroupLessonsCheckout, { action as groupLessonsCheckoutAction, loader as groupLessonsCheckoutLoader } from './routes/group_lessons_checkout'
import GroupLessonsNew, { action as groupLessonsNewAction, loader as groupLessonsNewLoader } from './routes/group_lessons_new'
import LessonsCheckout, { action as lessonsCheckoutAction, loader as lessonsCheckoutLoader } from './routes/lessons_checkout'
import LessonsNew, { action as lessonsNewAction, loader as lessonsNewLoader } from './routes/lessons_new'
import { action as loginAction } from "./routes/login"

function App() {
  const client = useClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Root /></ProtectedRoute>,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <LessonsNew />, action: lessonsNewAction({client}), loader: lessonsNewLoader({client})},
        { path: "lessons/:id/checkout", element: <LessonsCheckout />, action: lessonsCheckoutAction({client}), loader: lessonsCheckoutLoader({client}) },
        { path: "lessons/new", element: <LessonsNew />, action: lessonsNewAction({client}), loader: lessonsNewLoader({client}) },
        { path: "group_lessons/new", element: <GroupLessonsNew />, action: groupLessonsNewAction({client}), loader: groupLessonsNewLoader({client}) },
        { path: "group_lessons/:id/checkout", element: <GroupLessonsCheckout />, action: groupLessonsCheckoutAction({client}), loader: groupLessonsCheckoutLoader({client}) },
      ],
    },
    {
      path: "/login",
      element: <Login/>,
      errorElement: <ErrorBoundary />,
      action: loginAction({client}),
    }
  ]);
  
  function ErrorBoundary() {
    let error = useRouteError();
    console.error("THIS IS THE BOUNDARY", error)
    return <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  }
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
