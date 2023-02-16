import { Form, redirect, useLoaderData, useSubmit } from "react-router-dom";
import { Client } from "urql";
import { GetGoalsDocument, GetLessonDocument, Goal, Lesson, LessonInputPartial, UpdateLessonDocument } from '../graphql/generated'
import { LessonType, MAX_GOALS_PER_STUDENT } from '../constants'
import { setLastLessonType } from "../storage";
import { checkFormErrors, setFlash } from "../util";
import LessonInput from "../components/LessonInput";

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
    setLastLessonType(LessonType.Single);
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
  setFlash(flash);
  const beforeSubmit = (event: any) => {
    event.preventDefault()    
    if (!checkFormErrors())
      submit(event.currentTarget);
    return false;
  }

  return <>
      <Form className="lessons-checkout" method="post" onSubmit={beforeSubmit}>
        <div className="all-block">
          <p className="time-in">Lesson started at: { new Date(lesson.timeIn).toLocaleString() }</p>
          <LessonInput goals={goals} lesson={lesson} />
          <button className="btn" id="submit" type="submit">Finish Lesson</button>
          <label htmlFor="submit" className="error"></label>
        </div>
      </Form>
    </>
}

export default LessonsCheckout