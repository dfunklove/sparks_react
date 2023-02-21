import { useState } from 'react';
import { GroupLesson } from '../graphql/generated'
import LessonDisplay from './LessonDisplay';

type Props = {
  group_lesson: GroupLesson
}

function GroupLessonDisplay({ group_lesson }: Props) {
  const [expand, setExpand] = useState(false);

  return <>
    <div className="tr">
      <span className="td">
        <button className={`minimize ${expand === true ? "hidden" : ""}`} onClick={() => {setExpand(true)}}>+</button>
        <button className={`minimize ${expand === false ? "hidden" : ""}`} onClick={() => {setExpand(false)}}>-</button>
      </span>
      <span className="td">{group_lesson.lessonSet[0]?.school.name}</span>
      <span className="td">{group_lesson.user.firstName + " " + group_lesson.user.lastName}</span>
      <span className="td">Group Lesson</span>
      <span className="td">{group_lesson.timeIn && new Date(group_lesson.timeIn).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }</span>
      <span className="td">{group_lesson.timeOut ? new Date(group_lesson.timeOut).toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric', second: 'numeric',}) : "None"}</span>
      <span className="td">{group_lesson.timeIn && group_lesson.timeOut ? ((new Date(group_lesson.timeOut).valueOf()-new Date(group_lesson.timeIn).valueOf())/(60*1000)).toFixed() : "None"}</span>
      {Array(6).fill(0).map((e,i) => <span key={i} className="td"></span>)}
      <span className="td">{group_lesson.notes}</span>
    </div>
    {group_lesson.lessonSet.map(lesson => <LessonDisplay key={lesson.id} lesson={lesson} visible={expand} />)}
  </>
}

export default GroupLessonDisplay