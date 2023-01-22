import {
  useLoaderData,
} from "react-router-dom";
import { Lesson } from '../types'
import { GetLessonDocument } from '../graphql/generated'

export const loader = ({client}) => async ({params}) => {
  const lesson_id = params.id;
  const result = await client.query(GetLessonDocument, { id: lesson_id }).toPromise()
  if (result.data) {
    console.log("Result.data", result.data)
    const lesson: Lesson = result.data.lesson;
    return { lesson };
  } else {
    console.log("Oh no!", result.error)
    throw new Response("Unable to fetch lesson", {status: 404})
  }
}

function LessonsCheckout() {
  const { lesson } = useLoaderData();
  return <><h2>Lesson Checkout</h2>
      Lesson id: { lesson.id }, time in: { lesson.timeIn }
    </>
}

export default LessonsCheckout