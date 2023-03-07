import { Form, redirect, useLoaderData, useSubmit } from "react-router-dom";
import { Client } from "urql";
import { GetGoalsDocument, GetGroupLessonDocument, GroupLessonInputPartial, Goal, GroupLesson, LessonInputPartial, UpdateGroupLessonDocument } from '../graphql/generated'
import { LessonType, MAX_GOALS_PER_STUDENT } from '../constants'
import { setLastLessonType } from "../storage";
import { checkFormErrors } from "../util";
import LessonInput from "../components/LessonInput";

export const action = ({client}: {client: Client}) => async ({ request, params }: {request: any, params: any}) => {
  const formData = await request.formData();
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
    setLastLessonType(LessonType.Group);
    return redirect(`/group_lessons/new`);
  } else {
    const message="Unable to update lesson";
    throw new Response(result.error as any, { status: 500, statusText: message})
  }
};

export const loader = ({client}: {client: Client}) => async ({ request, params }: {request: any, params: any}) => {
  const id = params["id"]
  const result = await client.query(GetGroupLessonDocument,  {id: id}).toPromise()
  const group_lesson = result.data?.groupLesson
  const result2 = await client.query(GetGoalsDocument,{}).toPromise()
  const goals = result2.data?.goals || []
  return {goals, group_lesson}
}

function GroupLessonsCheckout() {
  const submit = useSubmit();
  const {goals, group_lesson} = useLoaderData() as {goals: [Goal], group_lesson: GroupLesson}
  const beforeSubmit = (event: any) => {
    event.preventDefault()    
    if (!checkFormErrors())
      submit(event.currentTarget);
    return false;
  }

  if (!group_lesson) {
    const message="Unable to find lesson"
    throw new Response(message, {status: 404, statusText: message})
  }

  return <Form className="group-lessons-checkout" method="post" onSubmit={beforeSubmit}>
    <h2>Group Lesson Checkout</h2>
    <p>
      <span className="time-in">Lesson started at: { new Date(group_lesson.timeIn).toLocaleString() }</span>
      <br/>
      <span className="school">School: {group_lesson.school.name}</span>
    </p>
    <input type="hidden" name="id" value={group_lesson.id}></input>
    <input type="hidden" name="student_count" value={group_lesson.lessonSet.length}></input>
    <div className="table responsive">
    <div className="tr responsive">
      <div className="table responsive">
      <div className="thead responsive">
        <div className="tr responsive">
          <span className="td responsive">Name</span>
          <span className="td responsive">Goals/Ratings</span>
          <span className="td responsive">Student Notes</span>
        </div>
      </div>
      {group_lesson.lessonSet.map((lesson, i) => <LessonInput goals={goals} index={i} key={lesson.id} lesson={lesson}/>)}
      </div>
    </div>
    <div className="tr responsive" style={{textAlign: "center"}}>
      <span className="td responsive">
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
}

export default GroupLessonsCheckout