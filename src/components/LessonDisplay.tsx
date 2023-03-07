import React from 'react';
import { Lesson, Rating } from '../graphql/generated'
import { msToTime } from '../util'

const MAX_GOALS_PER_STUDENT = 3

type Props = {
    lesson: Lesson,
    visible?: boolean,
}

function LessonDisplay({ lesson, visible }: Props) {
    var ratings = lesson.ratingSet || []
    for (let i=0; ratings.length < MAX_GOALS_PER_STUDENT; i++) {
      ratings.push({id: i.toString()} as Rating) // need ids for keys
    }

    return <div className={`tr ${visible === false ? "hidden" : ""}`}>
      <span className="td no-border-left"></span>  
      <span className="td">{lesson.school.name}</span>
      <span className="td">{lesson.user.firstName + " " + lesson.user.lastName}</span>
      <span className="td">{lesson.student.firstName + " " + lesson.student.lastName}</span>        
      <span className="td">{lesson.timeIn && new Date(lesson.timeIn).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }</span>
      <span className="td">{lesson.timeOut ? new Date(lesson.timeOut).toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric'}) : "None"}</span>
      <span className="td">{lesson.timeIn && lesson.timeOut ? msToTime(new Date(lesson.timeOut).valueOf()-new Date(lesson.timeIn).valueOf()) : "None"}</span>
      <span className="td">
        <details>
          <summary>Goals</summary>
      { ratings.map((rating, index) => <React.Fragment key={rating.id}>
          <span className="td">{rating.goal?.name}</span>
          <span className="td">{rating.score}</span>
        </React.Fragment>
      )}
        </details>
      </span>
      <span className="td">{lesson.notes}</span>
    </div> 
}

export default LessonDisplay