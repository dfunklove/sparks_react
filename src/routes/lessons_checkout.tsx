import { Form, redirect, useParams } from "react-router-dom";
import { useQuery } from 'urql';
import { Lesson } from '../types'
import { GetLessonDocument, LessonInputPartial } from '../graphql/generated'

export const action = ({updateLesson}) => async ({ request, params }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const notes = formData.get("notes");
  const lessonData: LessonInputPartial = { 
    id: id,
    notes: notes,
    timeOut: new Date(),
  }

  var result = await updateLesson({lesson: lessonData});
  
  if (result.error) {
    console.error("Oh no!", result.error)

    // TODO this doesn't work
    throw result.error
  }
  if (result.data.updateLesson) {
    return redirect(`/lessons/new`);
  } else {
    const message="Unable to update lesson";
    console.log(message, result.error)
    throw new Response(message, { status: 404, statusText: message})
  }
};

function LessonsCheckout() {
  const { id } = useParams();
  const [result] = useQuery({
    query: GetLessonDocument,
    variables: { id: id }
  })
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>

  var lesson: Lesson
  if (!data) {
    throw new Response("Unable to find lesson", {status: 404, statusText: "Unable to find lesson"})
  }
  lesson = data.lesson;
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