import { Form, redirect, useLoaderData } from "react-router-dom";
import { Client } from "urql";
import { GetGoalsDocument, GetLessonDocument, Goal, Lesson, LessonInputPartial, UpdateLessonDocument } from '../graphql/generated'
const MAX_GOALS_PER_STUDENT = 3

export const action = ({client}: {client: Client}) => async ({ request, params }: {request: any, params: any}) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const notes = formData.get("notes");
  const ratings = []
  for (let i=0; i < MAX_GOALS_PER_STUDENT; i++) {
    let goalId = formData.get(`rating${i}_goalId`)
    if (goalId?.length) {
      let score = parseInt(formData.get(`rating${i}_score`))
      ratings.push({goalId: goalId, score: score})
    }
  }

  const lessonData: LessonInputPartial = { 
    id: id,
    notes: notes,
    timeOut: new Date(),
    ratingSet: ratings,
  }

  const result = await client.mutation(UpdateLessonDocument, {lesson: lessonData}).toPromise()

  if (result.data?.updateLesson && !result.error) {
    return redirect(`/lessons/new`);
  } else {
    const message="Unable to update lesson";
    console.log(message, result.error)
    throw new Response(result.error as any, { status: 404, statusText: message})
  }
};

export const loader = ({client}: {client: Client}) => async ({ request, params }: {request: any, params: any}) => {
  const id = params["id"]
  var flash = ""
  const searchParams = new URLSearchParams(request.url.split('?')[1])
  if (searchParams?.get("remind"))
    flash = "Please finish open lesson before starting a new one"
  
  const result = await client.query(GetLessonDocument,  {id: id}).toPromise()
  const lesson = result.data?.lesson
  if (!lesson) {
    const message="Unable to find lesson"
    console.log(message, result.error)
    throw new Response(message, {status: 404, statusText: message})
  }
  const result2 = await client.query(GetGoalsDocument,{}).toPromise()
  const goals = result2.data?.goals || []
  return {flash, goals, lesson}
}

function LessonsCheckout() {
  const {flash, goals, lesson} = useLoaderData() as {flash: string, goals: [Goal], lesson: Lesson}
  var student_goals = lesson.student.goals
  while (student_goals.length < MAX_GOALS_PER_STUDENT) {
    student_goals.push({} as any)
  }
  const rating_scale = Array(10).fill(0).map((element, index) => index + 1)

  return <><h2>Lesson Checkout</h2>
      <p>Lesson id: { lesson.id }, time in: { lesson.timeIn }</p>
      <div id="flash"><p>{flash}</p></div>

      <Form method="post">
        <input type="hidden" id="id" name="id" value={lesson.id}></input>
        <label>Goals</label>
        { student_goals.map((sg, index) => 
          <div className="all-inline">
          <select name={`rating${index}_goalId`} defaultValue={sg.id}>
            <option value="">[None]</option>
            { goals.map((goal) => <option value={goal.id}>{goal.name}</option>) }
          </select>
          <select name={`rating${index}_score`}>
            <option value=""></option>
            { rating_scale.map((val) => <option value={val}>{val}</option>)}
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