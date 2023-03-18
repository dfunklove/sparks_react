import { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import { Client } from 'urql';
import GroupLessonDisplay from '../components/GroupLessonDisplay'
import LessonDisplay from '../components/LessonDisplay'
import { GetGroupLessonsDocument, GetLessonsDocument, GroupLesson, Lesson, Rating } from '../graphql/generated'
import { getUser } from '../storage'

export const loader = ({client}: {client: Client}) => async ({ request, params}: {request: any, params: any}) => {
  const user_id = getUser()?.id
  if (!user_id)
    return {}
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

  if (!lessonData?.length) {
    return <div>Nothing here yet.  As you finish lessons, they will appear here.</div>
  }

  return <div>
    <h2>My Lessons</h2>
    <div className="stdnt table">
    <div className="thead">
      <div className="tr">
        <span className="td no-border-left"></span>
        <span className="td" onClick={() => sortLessons('school.name')}>School</span>
        <span className="td" onClick={() => sortLessons('user.firstName,user.lastName')}>Teacher</span>
        <span className="td" onClick={() => sortLessons('student.firstName,student.lastName')}>Student</span>
        <span className="td" onClick={() => sortLessons('timeOut')}>Date</span>
        <span className="td" onClick={() => sortLessons('timeOut')}>Time Out</span>
        <span className="td" onClick={() => sortByMinutes()}>Length</span>
        {/*<span className="td" onClick={() => sortLessons('ratingSet[0].goal.name')}>Goal</span>
        <span className="td"></span>
        <span className="td" onClick={() => sortLessons('ratingSet[1].goal.name')} >Goal</span>
        <span className="td"></span>
        <span className="td" onClick={() => sortLessons('ratingSet[2].goal.name')}>Goal</span>
        <span className="td"></span>
        */}
        <span className="td">Goals</span>
        <span className="td" onClick={() => sortLessons('notes')}>Notes</span>
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

  function sortByMinutes() {
    if ((lessons[0] as any)?.minutes === undefined)
      lessons.forEach((lesson) => {
        (lesson as any).minutes = lesson.timeIn && lesson.timeOut ? (new Date(lesson.timeOut).valueOf()-new Date(lesson.timeIn).valueOf())/(60*1000) : 0
      });
    sortLessons('minutes')
  }
  function sortLessons(field: string) {
    const lessons_temp = Array.from(lessons)
    if (field === sortField)
      lessons_temp.reverse()
    else {
      const fields = field.split(',')
      lessons_temp.sort((a, b) => {
        const avalues = fields.map((field) => indexByFields(a, field.split('.')))
        const bvalues = fields.map((field) => indexByFields(b, field.split('.')))
        var result = 0
        for (let i=0; i<avalues.length; i++)
          if (avalues[i] && bvalues[i])
            if (avalues[i].localeCompare)
              result += avalues[i].localeCompare(bvalues[i])
            else
              result += bvalues[i] - avalues[i]
        return result
      })
    }
    setLessons(lessons_temp as any)
    setSortField(field)
  }
}
function hasKey<O extends Object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj
}
function indexByFields(obj: any, fields: string[]) {
  return fields.reduce((obj, field) => accessWithIndex(obj,field), obj)
}
function accessWithIndex(obj: any, field: string) {
  const cleanField = removeIndex(field)
  if (hasKey(obj, cleanField)) {
    const index = extractIndex(field)
    return index ? obj[cleanField][index] : obj[cleanField]
  } else {
    return obj
  }
}
function extractIndex(field: string) {
  const match = field.match(/\[(\d+)\]/)
  return match ? match[1] : null
}
function removeIndex(field: string) {
  return field.split('[')[0]
}

export default LessonsIndex