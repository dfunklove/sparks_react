import { Form, redirect, useLoaderData, useParams } from "react-router-dom";
import { useQuery } from 'urql';
import { Lesson } from '../types'
import { GetGoalsDocument, GetLessonDocument, LessonInputPartial, UpdateLessonDocument } from '../graphql/generated'
const MAX_GOALS_PER_STUDENT = 3

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
  var result = await client.query(GetLessonDocument,  {id: id}).toPromise()
  const lesson = result.data?.lesson
  if (!lesson) {
    const message="Unable to find lesson"
    console.log(message, result.error)
    throw new Response(message, {status: 404, statusText: message})
  }
  result = await client.query(GetGoalsDocument).toPromise()
  const goals = result.data?.goals || []
  return {goals, lesson}
}

function LessonsCheckout() {
  const {goals, lesson} = useLoaderData()
  var student_goals = lesson.student.goals
  while (student_goals.length < MAX_GOALS_PER_STUDENT) {
    student_goals.push({})
  }
  var select_index = 0

  return <><h2>Lesson Checkout</h2>
      Lesson id: { lesson.id }, time in: { lesson.timeIn }

      <Form method="post">
        <input type="hidden" id="id" name="id" value={lesson.id}></input>
        <label>Goals</label>
        { student_goals.map((sg) => 
          <div className="all-inline">
          <select name={`goal${select_index++}`} value={sg.id}>
            <option value="">[None]</option>
            { goals.map((goal) => <option value={goal.id}>{goal.name}</option>) }
          </select>
          </div>
        )}
        <label htmlFor="id">Notes</label>
        <textarea name="notes"></textarea>
        <button type="submit">Finish Lesson</button>
      </Form>
    </>
}

export default LessonsCheckout