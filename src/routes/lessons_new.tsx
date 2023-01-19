import { Form, Link, redirect } from "react-router-dom";
import { useQuery } from 'urql'
import { Student } from '../types'
import { GetStudentsDocument } from '../graphql/generated'

export async function action({ request, params }) {
  const formData = await request.formData();
  const lessonData = Object.fromEntries(formData);
  console.log(lessonData);
  const lesson = { id: 1 }; // create lesson
  return redirect(`/lessons/${lesson.id}/checkout`);
}

function LessonsNew() {
  const [results] = useQuery({
    query: GetStudentsDocument
  })

  if (!results.data)
    return <>No Students</>
  else
    var students: Student[] = results.data.students;
    return <div>
      <h2>Start Single Lesson</h2>
      <div className="stdnt table">
      <div className="thead">
        <div className="tr">
          <span className="td">F Name</span>
          <span className="td">L Name</span>
          <span className="td">School</span>
        </div>
      </div>

      { 
        students.map((student, i) => <Form method="post" className="tr">
          <input type="hidden" name="student_id" value={student.id}></input>
          <input type="hidden" name="school_id" value={student.school.id}></input>
          <span className="td">{student.firstName}</span>
          <span className="td">{student.lastName}</span>
          <span className="td">{student.school.name}</span>
          <span className="td"><button type="submit">Start Lesson</button></span>
        </Form>) 
      }
      
      </div>
    </div>
}

export default LessonsNew