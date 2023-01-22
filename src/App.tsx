import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { useClient, useMutation } from 'urql';
import { CreateLessonDocument, GetLessonDocument } from './graphql/generated'
import Root from "./routes/root";
import LessonsCheckout, { loader as lessonsCheckoutLoader } from './routes/lessons_checkout'
import LessonsNew, { action as lessonsNewAction } from './routes/lessons_new'

function App() {
  const [createLessonResult, createLesson] = useMutation(CreateLessonDocument);
  const client = useClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <LessonsNew />, action: lessonsNewAction({createLesson})},
        { path: "lessons/:id/checkout", element: <LessonsCheckout />, loader: lessonsCheckoutLoader({client}) },
        { path: "lessons/new", element: <LessonsNew />, action: lessonsNewAction({createLesson}) },
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
