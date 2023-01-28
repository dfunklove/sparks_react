import { Form, redirect, useLoaderData, useParams } from "react-router-dom";
import { useQuery } from 'urql';
import { Lesson } from '../types'
import { GetLessonDocument, LessonInputPartial, UpdateLessonDocument } from '../graphql/generated'

export const action = ({client}) => async ({ request, params }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const notes = formData.get("notes");
  const lessonData: LessonInputPartial = { 
    id: id,
    notes: notes,
    timeOut: new Date(),
  }

  const result = await client.mutation(UpdateLessonDocument, {lesson: lessonData}).toPromise()

  if (result.data?.updateLesson && !result.error) {
    return redirect(`/lessons/new`);
  } else {
    const message="Unable to update lesson";
    console.log(message, result.error)
    throw new Response(result.error, { status: 404, statusText: message})
  }
};

export const loader = ({client}) => async ({ request, params }) => {
  const id = params["id"]
  const result = await client.query(GetLessonDocument,  {id: id}).toPromise()
  const lesson = result.data?.lesson
  if (!lesson) {
    const message="Unable to find lesson"
    console.log(message, result.error)
    throw new Response(message, {status: 404, statusText: message})
  }
  return {lesson}
}

function LessonsCheckout() {
  const {lesson} = useLoaderData()

  return <><h2>Lesson Checkout</h2>
      Lesson id: { lesson.id }, time in: { lesson.timeIn }

      <Form method="post">
        <input type="hidden" id="id" name="id" value={lesson.id}></input>
        <label htmlFor="id">Notes</label>
        <textarea name="notes"></textarea>
        <button type="submit">Finish Lesson</button>
      </Form>
    </>
}

export default LessonsCheckout