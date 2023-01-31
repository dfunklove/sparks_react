import { Form, redirect, useLoaderData, useParams } from "react-router-dom";
import { useQuery } from 'urql';
import { Lesson } from '../types'
import { GetGoalsDocument, GetGroupLessonDocument, GroupLessonInputPartial, LessonInputPartial, UpdateGroupLessonDocument } from '../graphql/generated'
const MAX_GOALS_PER_STUDENT = 3

export const action = ({client}) => async ({ request, params }) => {
  const formData = await request.formData();
  console.log("formData", formData)
  const id = formData.get("id");
  const notes = formData.get("notes");
  const timeOut = new Date();
  const student_count = parseInt(formData.get("student_count"));
  const lessons: LessonInputPartial[] = []
  for (let s=0; s < student_count; s++) {
    const lesson: LessonInputPartial = {}
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
    throw new Response(result.error, { status: 404, statusText: message})
  }
};

export const loader = ({client}) => async ({ request, params }) => {
  const id = params["id"]
  var result = await client.query(GetGroupLessonDocument,  {id: id}).toPromise()
  const group_lesson = result.data?.groupLesson
  if (!group_lesson) {
    const message="Unable to find lesson"
    console.log(message, result.error)
    throw new Response(message, {status: 404, statusText: message})
  }
  result = await client.query(GetGoalsDocument).toPromise()
  const goals = result.data?.goals || []
  return {goals, group_lesson}
}

function GroupLessonsCheckout() {
  const {goals, group_lesson} = useLoaderData()
  const rating_scale = Array(10).fill().map((element, index) => index + 1)

  return <><h2>Lesson Checkout</h2>
      Lesson id: { group_lesson.id }, time in: { group_lesson.timeIn }

      <Form method="post">
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
            student_goals.push({})
          }
          return <div className="tr">
            <input type="hidden" name={`student_${i}_id`} value={lesson.id}></input>
            <span className="td">{lesson.student.firstName}</span>
            <span className="td">{lesson.student.lastName}</span>
            <span className="td">{lesson.school.name}</span>
            <span className="td">
            { student_goals.map((sg, sg_i) => 
              <div className="all-inline">
              <select name={`student_${i}_rating${sg_i}_goalId`} defaultValue={sg.id}>
                <option value="">[None]</option>
                { goals.map((goal) => <option value={goal.id}>{goal.name}</option>) }
              </select>
              <select name={`student_${i}_rating${sg_i}_score`}>
                <option value=""></option>
                { rating_scale.map((val) => <option value={val}>{val}</option>)}
              </select>
              </div>
            )}
            </span>
            <textarea name={`student_${i}_notes`}></textarea>
          </div>
        })}
        </div>
      </div>
      <div className="tr" style={{textAlign: "center"}}>
        <label htmlFor="notes">Group Notes</label>
        <textarea id="notes" name="notes" style={{width: "100%"}}></textarea></div>
        <span className="td"><button style={{width: "100%"}} type="submit">Finish Lesson</button></span>
      </div>
      </Form>
    </>
}

export default GroupLessonsCheckout