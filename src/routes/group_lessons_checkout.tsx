import { Form, redirect, useLoaderData, useParams } from "react-router-dom";
import { useQuery } from 'urql';
import { Lesson } from '../types'
import { GetGoalsDocument, GetGroupLessonDocument, LessonInputPartial, UpdateLessonDocument } from '../graphql/generated'
const MAX_GOALS_PER_STUDENT = 3

export const action = ({client}) => async ({ request, params }) => {
  const formData = await request.formData();
  console.log("formData", formData)
  return null
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
    throw new Response(result.error, { status: 404, statusText: message})
  }
};

export const loader = ({client}) => async ({ request, params }) => {
  const id = params["id"]
  var result = await client.query(GetGroupLessonDocument,  {id: id}).toPromise()
  const lesson = result.data?.groupLesson
  if (!lesson) {
    const message="Unable to find lesson"
    console.log(message, result.error)
    throw new Response(message, {status: 404, statusText: message})
  }
  result = await client.query(GetGoalsDocument).toPromise()
  const goals = result.data?.goals || []
  return {goals, lesson}
}

function GroupLessonsCheckout() {
  const {goals, lesson} = useLoaderData()
  const rating_scale = Array(10).fill().map((element, index) => index + 1)

  return <><h2>Lesson Checkout</h2>
      Lesson id: { lesson.id }, time in: { lesson.timeIn }

      <Form method="post">
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
        {lesson.lessonSet.map((lesson, i) => {
          var student_goals = lesson.student.goals
          while (student_goals.length < MAX_GOALS_PER_STUDENT) {
            student_goals.push({})
          }
          return <div className="tr">
            <input type="hidden" id="id" name="id" value={lesson.id}></input>
            <span className="td">{lesson.student.firstName}</span>
            <span className="td">{lesson.student.lastName}</span>
            <span className="td">{lesson.school.name}</span>
            <span className="td">
            { student_goals.map((sg, sg_i) => 
              <div className="all-inline">
              <select name={`rating${sg_i}_goalId`} defaultValue={sg.id}>
                <option value="">[None]</option>
                { goals.map((goal) => <option value={goal.id}>{goal.name}</option>) }
              </select>
              <select name={`rating${sg_i}_score`}>
                <option value=""></option>
                { rating_scale.map((val) => <option value={val}>{val}</option>)}
              </select>
              </div>
            )}
            </span>
            <textarea name="notes"></textarea>
          </div>
        })}
        </div>
      </div>
      <div className="tr">
        <span className="td"><button style={{width: "100%"}} type="submit">Finish Lesson</button></span>
      </div>
      </div>
      </Form>
    </>
}

export default GroupLessonsCheckout