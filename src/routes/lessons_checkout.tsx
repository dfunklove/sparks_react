import {
  Form,
  redirect, 
  useParams,
} from "react-router-dom";
import { useQuery } from 'urql';
import { Lesson } from '../types'
import { GetLessonDocument, LessonInputPartial } from '../graphql/generated'

export const action = ({updateLesson}) => async ({ request, params }) => {
  console.log("checkout action")
  const formData = await request.formData();
  const id = formData.get("id");
  const notes = formData.get("notes");
  const lessonData: LessonInputPartial = { 
    id: id,
    notes: notes,
    timeOut: new Date(),

    // TODO using demo data because the graphql mutation doesn't know what "partial" means
    school: { id: "1" }, 
    student: { id: "1", school: { id: "1" } },
    timeIn: new Date(),
    user: { id: "1"}
  }

  console.log("Update Lesson data:")
  console.log(lessonData);
  // update lesson
  var lesson_id;
  var result = await updateLesson({lesson: lessonData});
  
  if (result.error) {
    console.error("Oh no!", result.error)

    // TODO this doesn't work
    throw result.error
  }
  console.log("Update Lesson result:")
  console.log(result.data)
  if (result.data.updateLesson) {
    lesson_id = result.data.updateLesson.id
    console.log("got a lesson_id: "+lesson_id)
    return redirect(`/lessons/new`);
  } else {
    console.log("BADBADNOTGOOD")
    throw new Response("Thy flesh consumed")
  }
};

function LessonsCheckout() {
  console.log("checkout component")

  const { id } = useParams();
  const [result] = useQuery({
    query: GetLessonDocument,
    variables: { id: id }
  })
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>

  console.log("Result", result)

  var lesson: Lesson
  if (result.data) {
    console.log("Result.data", result.data)
    lesson = result.data.lesson;
  } else {
    console.log("Oh no!", result.error)
    throw new Response("Unable to fetch lesson", {status: 404})
  }
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