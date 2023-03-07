import { MAX_GOALS_PER_STUDENT } from "../constants";
import { Goal, Lesson } from "../graphql/generated";
import { checkFormErrors } from "../util";

export default function LessonInput({goals, index, lesson}: {goals: Goal[], index?: number, lesson: Lesson}) {
  var student_goals = lesson.student.goals
  while (student_goals.length < MAX_GOALS_PER_STUDENT) {
    student_goals.push({} as any)
  }
  const rating_scale = Array(10).fill(0).map((element, index) => 10 - index)
  const prefix = index !== undefined ? `student_${index}_` : ""

  return <div className="lesson-fields" key={lesson.id}>
    <input type="hidden" name={`${prefix}id`} value={lesson.id}></input>
    <span className="lesson-field student-name">
      <span className="student-first-name">{lesson.student.firstName} </span>
      <span className="student-last-name">{lesson.student.lastName}</span>
    </span>
    <label>Goals</label>
    <span className="lesson-field ratings">
    <div className="rating-list">
    { student_goals.map((sg, sg_i) => 
      <div className="rating" key={sg_i}>
        <select className="goal" name={`${prefix}rating${sg_i}_goalId`} defaultValue={sg.id} onChange={checkFormErrors}>
          <option value="">[None]</option>
          { goals.map((goal, g_i) => <option key={g_i} value={goal.id}>{goal.name}</option>) }
        </select>
        <select className="score" name={`${prefix}rating${sg_i}_score`} onChange={checkFormErrors} required={sg.id ? true : false}>
          <option value=""></option>
          { rating_scale.map((val, v_i) => <option key={v_i} value={val}>{val}</option>)}
        </select>
        <span className="error"></span>
      </div>
    )}
    </div>
    </span>
    <label>Notes</label>
    <span className="lesson-field notes">
      <textarea name={`${prefix}notes`} rows={4}></textarea>
    </span>
  </div>
}