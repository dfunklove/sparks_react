import { useQuery } from 'urql';
import { Form, redirect } from "react-router-dom";
import { Student } from '../types'
import { GetStudentsDocument, LessonInput } from '../graphql/generated'

export const action = ({createLesson}) => async ({ request, params }) => {
  const formData = await request.formData();
  const school_id = formData.get("school_id");
  const student_id = formData.get("student_id");
  const lessonData: LessonInput = { 
    school: { id: school_id }, 
    student: { id: student_id, school: { id: school_id } },
    timeIn: new Date(),
    user: { id: "1"}
  }

  console.log("Create Lesson data:")
  console.log(lessonData);
  // create lesson
  var lesson_id;
  var result = await createLesson({lesson: lessonData});
  
  if (result.error) {
    console.error("Oh no!", result.error)

    // TODO this doesn't work
    throw result.error
  }
  console.log("Create Lesson result:")
  console.log(result.data)
  if (result.data.createLesson) {
    lesson_id = result.data.createLesson.id
    console.log("got a lesson_id: "+lesson_id)
    return redirect(`/lessons/${lesson_id}/checkout`);
  } else {
    console.log("BADBADNOTGOOD")
    throw new Response("Thy flesh consumed")
  }
};

function LessonsNew() {
  const [results] = useQuery({
    query: GetStudentsDocument
  })

  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>

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