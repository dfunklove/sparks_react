import LessonDisplay from './LessonDisplay';
import { GroupLesson, Lesson } from '../graphql/generated'

type Props = {
  group_lesson: GroupLesson
}

function GroupLessonDisplay({ group_lesson }: Props) {
  function showGroupLesson() {
    const toShow = document.getElementsByClassName("group-lesson-"+group_lesson.id);
    for (let i=0; i < toShow.length; i++) {
      (toShow[i] as HTMLElement).classList.remove("hidden")
    }
    const toHide = document.getElementsByClassName("expand-button-"+group_lesson.id);
    for (let i=0; i < toHide.length; i++) {
      (toHide[i] as HTMLElement).classList.add("hidden")
    }
    return null
  }
  function hideGroupLesson() {
    const toShow = document.getElementsByClassName("expand-button-"+group_lesson.id);
    for (let i=0; i < toShow.length; i++) {
      (toShow[i] as HTMLElement).classList.remove("hidden")
    }
    const toHide = document.getElementsByClassName("group-lesson-"+group_lesson.id);
    for (let i=0; i < toHide.length; i++) {
      (toHide[i] as HTMLElement).classList.add("hidden")
    }
    return null
  }

  return <>
    <div className="tr">
      <span className="td">
        <button className={`minimize expand-button-${group_lesson.id}`} onClick={showGroupLesson}>+</button>
        <button className={`minimize hidden group-lesson-${group_lesson.id}`} onClick={hideGroupLesson}>-</button>
      </span>
      <span className="td">{group_lesson.lessonSet[0]?.school.name}</span>
      <span className="td">{group_lesson.user.firstName + " " + group_lesson.user.lastName}</span>
      <span className="td">Group Lesson</span>
      <span className="td">{group_lesson.timeOut && new Date(group_lesson.timeOut).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }</span>
      <span className="td">{group_lesson.timeOut && new Date(group_lesson.timeOut).toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric', second: 'numeric',})}</span>
      <span className="td">{group_lesson.timeIn && group_lesson.timeOut && ((new Date(group_lesson.timeOut).valueOf()-new Date(group_lesson.timeIn).valueOf())/(60*1000)).toFixed()}</span>
      {Array(6).fill(0).map((e,i) => <span key={i} className="td"></span>)}
      <span className="td">{group_lesson.notes}</span>
    </div>
    {group_lesson.lessonSet.map(lesson => <LessonDisplay key={lesson.id} group_lesson_id={group_lesson.id} lesson={lesson}/>)}
    <div className={`tr group-lesson-${group_lesson.id} hidden`}>
    </div>
  </>
}

export default GroupLessonDisplay