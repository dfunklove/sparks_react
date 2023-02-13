import { Lesson, Rating } from '../graphql/generated'

const MAX_GOALS_PER_STUDENT = 3

type Props = {
    group_lesson_id?: string,
    lesson: Lesson,
}

function LessonDisplay({ group_lesson_id, lesson }: Props) {
    var ratings = lesson.ratingSet || []
    while (ratings.length < MAX_GOALS_PER_STUDENT) {
      ratings.push({} as Rating)
    }

    return <div className={`tr ${group_lesson_id? "group-lesson-"+group_lesson_id+" hidden" : ""}`}>
      <span className="td"></span>  
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
}

export default LessonDisplay