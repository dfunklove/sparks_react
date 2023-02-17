import { useState } from 'react';
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
    return new Date(b.timeIn).valueOf() - new Date(a.timeIn).valueOf()
  })
  return {lessons}
}

function LessonsIndex() {
  const {lessons: lessonData} = useLoaderData() as {lessons: [Lesson|GroupLesson]};
  const[lessons, setLessons] = useState(lessonData);
  const[sortField, setSortField] = useState("");

  if (!lessons?.length) {
    return <div>Nothing here yet.  As you finish lessons, they will appear here.</div>
  }

  return <div>
    <h2>My Lessons</h2>
    <div className="stdnt table">
    <div className="thead">
      <div className="tr">
        <span className="td"></span>
        <span className="td" onClick={() => {sortLessons('school.name')}}>School</span>
        <span className="td" onClick={() => {sortLessons('user.firstName,user.lastName')}}>Teacher</span>
        <span className="td" onClick={() => {sortLessons('student.firstName,student.lastName')}}>Student</span>
        <span className="td" onClick={() => {sortLessons('timeOut')}}>Date</span>
        <span className="td" onClick={() => {sortLessons('timeOut')}}>Time Out</span>
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
          return <GroupLessonDisplay key={lesson.id} group_lesson={lesson as GroupLesson}/>
        else
          return <LessonDisplay key={lesson.id} lesson={lesson as Lesson}/>
      })
    }
    </div>
  </div>

  function sortLessons(field: string) {
    function hasKey<O extends Object>(obj: O, key: PropertyKey): key is keyof O {
      return key in obj
    }
    function combineFields(obj: any, fields: string[]) {
      return fields.reduce((combined, field) => combined.concat(indexByFields(obj, field.split('.'))), "")
    }
    function indexByFields(obj: any, fields: string[]) {
      return fields.reduce((obj, field) => {
        if (hasKey(obj, field)) 
          return obj[field] 
        else
          return obj
        }, 
        obj
      )
    }

    const lessons_temp = Array.from(lessons)
    if (field === sortField)
      lessons_temp.reverse()
    else {
      const fields = field.split(',')
      lessons_temp.sort((a, b) => {
        const aval = combineFields(a, fields)
        const bval = combineFields(b, fields)
        if (aval?.localeCompare)
          return aval.localeCompare(bval)
        else
          return 0
      })
    }
    setLessons(lessons_temp as any)
    setSortField(field)
  }
}

export default LessonsIndex