import { Form, redirect, useLoaderData, useSubmit } from "react-router-dom";
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
    throw new Response(result.error as any, { status: 500, statusText: message})
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
    throw new Response(message, {status: 404, statusText: message})
  }
  const result2 = await client.query(GetGoalsDocument,{}).toPromise()
  const goals = result2.data?.goals || []
  return {flash, goals, lesson}
}

function LessonsCheckout() {
  const submit = useSubmit();
  const {flash, goals, lesson} = useLoaderData() as {flash: string, goals: [Goal], lesson: Lesson}
  var student_goals = lesson.student.goals
  while (student_goals.length < MAX_GOALS_PER_STUDENT) {
    student_goals.push({} as any)
  }
  const rating_scale = Array(10).fill(0).map((element, index) => index + 1)

  const beforeSubmit = (event: any) => {
    event.preventDefault()    
    if (!checkForErrors())
      submit(event.currentTarget);
    return false;
  }

  /* 
   * if goal.value and !score.value, show an error message 
   */
  const checkForErrors = () => {
    var error = false;
    const goals = document.querySelectorAll(".goal");
    for (let i=0; i<goals.length; i++) {
      const scoreElement = goals[i].parentElement?.querySelector(".score") as HTMLInputElement
      const errorElement = goals[i].parentElement?.querySelector(".error") as HTMLElement
      if ((goals[i] as HTMLInputElement).value && !scoreElement.value) {
        errorElement.innerText = "Required";
        error = true;
      } else {
        errorElement.innerText = "";
      }
    }
    const errorElement = document.querySelector("label[for='submit']")
    if (errorElement) {
      if (error)
        errorElement.innerHTML = "Please correct the errors to continue"
      else
        errorElement.innerHTML = ""
    }
    return error;
  }

  return <><h2>Lesson Checkout</h2>
      <p>Lesson id: { lesson.id }, time in: { lesson.timeIn }</p>
      <div id="flash"><p>{flash}</p></div>

      <Form method="post" onSubmit={beforeSubmit}>
        <input type="hidden" id="id" name="id" value={lesson.id}></input>
        <label>Goals</label>
        <div className="rating-list">
        { student_goals.map((sg, index) => 
          <div className="all-inline rating">
            <select className="goal" name={`rating${index}_goalId`} defaultValue={sg.id} onChange={checkForErrors}>
              <option value="">[None]</option>
              { goals.map((goal) => <option value={goal.id}>{goal.name}</option>) }
            </select>
            <select className="score" name={`rating${index}_score`} onChange={checkForErrors}>
              <option value=""></option>
              { rating_scale.map((val) => <option value={val}>{val}</option>)}
            </select>
            <span className="error"></span>
          </div>
        )}
        </div>
        <div className="all-block">
          <label htmlFor="id">Notes</label>
          <textarea name="notes"></textarea>
          <button id="submit" type="submit">Finish Lesson</button>
          <label htmlFor="submit" className="error"></label>
        </div>
      </Form>
    </>
}

export default LessonsCheckout