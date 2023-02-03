import { useLoaderData } from "react-router-dom";
import { Client } from 'urql';
import { GetLessonsDocument, Lesson, Rating } from '../graphql/generated'
import { getUser } from '../storage'

export const loader = ({client}: {client: Client}) => async ({ request, params}: {request: any, params: any}) => {
  const user_id = getUser().id
  const result = await client.query(GetLessonsDocument,{userId: user_id}).toPromise()
  const lessons = result.data?.lessons || []
  return {lessons}
}
const MAX_GOALS_PER_STUDENT = 3

function LessonsIndex() {
  const {lessons} = useLoaderData() as {lessons: [Lesson]}

  if (!lessons?.length) {
    return <div>No students have been assigned to you.  Please check back later or contact your supervisor.</div>
  }

  return <div>
    <h2>My Lessons</h2>
    <div className="stdnt table">
    <div className="thead">
      <div className="tr">
        <span className="td">School</span>
        <span className="td">Teacher</span>
        <span className="td">Student</span>
        <span className="td">Date</span>
        <span className="td">Time Out</span>
        <span className="td">Minutes</span>
        <span className="td">Goal</span>
        <span className="td"></span>
        <span className="td">Goal</span>
        <span className="td"></span>
        <span className="td">Goal</span>
        <span className="td"></span>
        <span className="td">Notes</span>
      </div>
    </div>

    { 
      lessons.map((lesson, i) => {
        var ratings = lesson.ratingSet
        while (ratings.length < MAX_GOALS_PER_STUDENT) {
          ratings.push({} as Rating)
        }

        return <div className="tr">
          <span className="td">{lesson.school.name}</span>
          <span className="td">{lesson.user.firstName + " " + lesson.user.lastName}</span>
          <span className="td">{lesson.student.firstName + " " + lesson.student.lastName}</span>        
          <span className="td">{lesson.timeOut && new Date(lesson.timeOut).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }</span>
          <span className="td">{lesson.timeOut && new Date(lesson.timeOut).toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric', second: 'numeric',})}</span>
          <span className="td">{lesson.timeIn && lesson.timeOut && ((new Date(lesson.timeOut).valueOf()-new Date(lesson.timeIn).valueOf())/(60*1000)).toFixed()}</span>
          { ratings.map((rating, index) => <>
            <span className="td">
              {rating.goal?.name}
            </span>
            <span className="td">
              {rating.score}
            </span>
          </>
          )}
          <span className="td">{lesson.notes}</span>
        </div> 
      })
    }
    </div>
  </div>
}

export default LessonsIndex