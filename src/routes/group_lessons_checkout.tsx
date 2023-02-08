import { Form, redirect, useLoaderData, useSubmit } from "react-router-dom";
import { Client } from "urql";
import { GetGoalsDocument, GetGroupLessonDocument, GroupLessonInputPartial, Goal, GroupLesson, LessonInputPartial, UpdateGroupLessonDocument } from '../graphql/generated'
const MAX_GOALS_PER_STUDENT = 3

export const action = ({client}: {client: Client}) => async ({ request, params }: {request: any, params: any}) => {
  const formData = await request.formData();
  console.log("formData", formData)
  const id = formData.get("id");
  const notes = formData.get("notes");
  const timeOut = new Date();
  const student_count = parseInt(formData.get("student_count"));
  const lessons: LessonInputPartial[] = []
  for (let s=0; s < student_count; s++) {
    const lesson: LessonInputPartial = {id:"0"}
    lesson.id = formData.get(`student_${s}_id`)
    lesson.notes = formData.get(`student_${s}_notes`)
    lesson.ratingSet = []
    for (let r=0; r < MAX_GOALS_PER_STUDENT; r++) {
      let goalId = formData.get(`student_${s}_rating${r}_goalId`)
      if (goalId?.length) {
        let score = parseInt(formData.get(`student_${s}_rating${r}_score`))
        lesson.ratingSet.push({goalId: goalId, score: score})
      }
    }
    lesson.timeOut = timeOut
    lessons.push(lesson)
  }

  const group_lesson: GroupLessonInputPartial = { 
    id: id,
    notes: notes,
    timeOut: timeOut,
    lessonSet: lessons,
  }

  const result = await client.mutation(UpdateGroupLessonDocument, {groupLesson: group_lesson}).toPromise()

  if (result.data?.updateGroupLesson && !result.error) {
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

  const result = await client.query(GetGroupLessonDocument,  {id: id}).toPromise()
  const group_lesson = result.data?.groupLesson
  if (!group_lesson) {
    const message="Unable to find lesson"
    console.log(message, result.error)
    throw new Response(message, {status: 404, statusText: message})
  }
  const result2 = await client.query(GetGoalsDocument,{}).toPromise()
  const goals = result2.data?.goals || []
  return {flash, goals, group_lesson}
}

function GroupLessonsCheckout() {
  const submit = useSubmit();
  const {flash, goals, group_lesson} = useLoaderData() as {flash: string, goals: [Goal], group_lesson: GroupLesson}
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
      <p>Lesson id: { group_lesson.id }, time in: { group_lesson.timeIn }</p>
      <div id="flash"><p>{flash}</p></div>

      <Form method="post" onSubmit={beforeSubmit}>
      <input type="hidden" name="id" value={group_lesson.id}></input>
      <input type="hidden" name="student_count" value={group_lesson.lessonSet.length}></input>
      <div className="stdnt table">
      <div className="tr">
        <div className="stdnt table">
        <div className="thead">
          <div className="tr">
            <span className="td">F Name</span>
            <span className="td">L Name</span>
            <span className="td">School</span>
            <span className="td">Goals/Ratings</span>
            <span className="td">Student Notes</span>
          </div>
        </div>
        {group_lesson.lessonSet.map((lesson, i) => {
          var student_goals = lesson.student.goals
          while (student_goals.length < MAX_GOALS_PER_STUDENT) {
            student_goals.push({} as any)
          }
          return <div className="tr">
            <input type="hidden" name={`student_${i}_id`} value={lesson.id}></input>
            <span className="td">{lesson.student.firstName}</span>
            <span className="td">{lesson.student.lastName}</span>
            <span className="td">{lesson.school.name}</span>
            <span className="td">
            <div className="rating-list">
            { student_goals.map((sg, sg_i) => 
              <div className="all-inline rating">
                <select className="goal" name={`student_${i}_rating${sg_i}_goalId`} defaultValue={sg.id} onChange={checkForErrors}>
                  <option value="">[None]</option>
                  { goals.map((goal) => <option value={goal.id}>{goal.name}</option>) }
                </select>
                <select className="score" name={`student_${i}_rating${sg_i}_score`} onChange={checkForErrors}>
                  <option value=""></option>
                  { rating_scale.map((val) => <option value={val}>{val}</option>)}
                </select>
                <span className="error"></span>
              </div>
            )}
            </div>
            </span>
            <textarea name={`student_${i}_notes`}></textarea>
          </div>
        })}
        </div>
      </div>
      <div className="tr" style={{textAlign: "center"}}>
        <span className="td">
          <div className="all-block">
            <label htmlFor="notes">Group Notes</label>
            <textarea id="notes" name="notes" style={{width: "100%"}}></textarea>
            <button style={{width: "100%"}} type="submit">Finish Lesson</button>
            <label htmlFor="submit" className="error"></label>
          </div>
        </span>
      </div>
      </div>
      </Form>
    </>
}

export default GroupLessonsCheckout