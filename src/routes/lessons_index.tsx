import { useLoaderData } from "react-router-dom";
import { Client } from 'urql';
import GroupLessonDisplay from '../components/GroupLessonDisplay'
import LessonDisplay from '../components/LessonDisplay'
import { GetGroupLessonsDocument, GetLessonsDocument, GroupLesson, Lesson, Rating } from '../graphql/generated'
import { getUser } from '../storage'

export const loader = ({client}: {client: Client}) => async ({ request, params}: {request: any, params: any}) => {
  const user_id = getUser().id
  const result = await client.query(GetLessonsDocument,{userId: user_id}).toPromise()
  var lessons = result.data?.lessons || []
  const result2 = await client.query(GetGroupLessonsDocument,{userId: user_id}).toPromise()
  var group_lessons = result2.data?.groupLessons || []
  lessons = lessons.concat(group_lessons as any)
  lessons.sort((a, b) => {
    return new Date(a.timeIn).valueOf() - new Date(b.timeIn).valueOf()
  })
  return {lessons}
}

function LessonsIndex() {
  const {lessons} = useLoaderData() as {lessons: [Lesson|GroupLesson]}

  if (!lessons?.length) {
    return <div>No students have been assigned to you.  Please check back later or contact your supervisor.</div>
  }

  return <div>
    <h2>My Lessons</h2>
    <div className="stdnt table">
    <div className="thead">
      <div className="tr">
        <span className="td"></span>
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
        if ((lesson as any).lessonSet)
          return <GroupLessonDisplay key={i} group_lesson={lesson as GroupLesson}/>
        else
          return <LessonDisplay key={i} lesson={lesson as Lesson}/>
      })
    }
    </div>
  </div>
}

export default LessonsIndex