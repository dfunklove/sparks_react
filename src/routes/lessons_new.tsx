import { Form, redirect } from "react-router-dom";
import { useQuery } from 'urql';
import { Student } from '../types'
import { CreateLessonDocument, GetStudentsDocument, LessonInput } from '../graphql/generated'

export const action = ({client}) => async ({ request, params }) => {
  const formData = await request.formData();
  const school_id = formData.get("school_id");
  const student_id = formData.get("student_id");
  const lessonData: LessonInput = { 
    school: { id: school_id }, 
    student: { id: student_id, school: { id: school_id } },
    timeIn: new Date(),
    user: { id: "1"}
  }

  const result = await client.mutation(CreateLessonDocument, {lesson: lessonData}).toPromise()
  
  if (result.error) {
    console.error("Create lesson error", result.error)
    throw new Error(result.error)
  }
  if (result.data.createLesson) {
    const lesson_id = result.data.createLesson.id
    return redirect(`/lessons/${lesson_id}/checkout`);
  } else {
    const message="Unable to create lesson";
    console.log(message, result.error)
    throw new Response(message, { status: 404, statusText: message})
  }
};

function LessonsNew() {
  const [results] = useQuery({
    query: GetStudentsDocument
  })

  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>
  if (!data) return <>No Students</>

  var students: Student[] = data.students;
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