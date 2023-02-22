import { Form, redirect, useLoaderData } from "react-router-dom";
import { Client } from "urql";
import { CreateLessonDocument, GetStudentsDocument, GroupLesson, Lesson, LessonInput, OpenLessonDocument, Student } from '../graphql/generated'
import { getUser } from '../storage'

export const action = ({client}: {client: Client}) => async ({ request, params }: {request: any, params: any}) => {
  const formData = await request.formData();
  const school_id = formData.get("school_id");
  const student_id = formData.get("student_id");
  const user_id = getUser()?.id
  const lessonData: LessonInput = { 
    school: { id: school_id }, 
    student: { id: student_id },
    timeIn: new Date(),
    user: { id: user_id}
  }

  const result = await client.mutation(CreateLessonDocument, {lesson: lessonData}).toPromise()
  const resultData = result.data?.createLesson as Lesson
  if (resultData?.id && !result.error) {
    const lesson_id = resultData.id
    return redirect(`/lessons/${lesson_id}/checkout`);
  } else {
    const message="Unable to create lesson";
    throw new Response(result.error as any, { status: 500, statusText: message})
  }
};

export const loader = ({client}: {client: Client}) => async ({ request, params }: {request: any, params: any}) => {
  const result = await client.query(OpenLessonDocument,{userId: getUser()?.id}).toPromise()
  if (result.data?.openLesson?.id) {
    const lesson_id = result.data.openLesson.id;
    if ((result.data.openLesson as GroupLesson).lessonSet) {
      return redirect(`/group_lessons/${lesson_id}/checkout?remind=true`);
    }
    return redirect(`/lessons/${lesson_id}/checkout?remind=true`);
  }

  const result2 = await client.query(GetStudentsDocument,{}).toPromise()
  const students = result2.data?.students || []
  return {students}
}

function LessonsNew() {
  const {students} = useLoaderData() as {students: [Student]}

  if (!students?.length) {
    return <div>No students have been assigned to you.  Please check back later or contact your supervisor.</div>
  }

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
      students.map((student, i) => <Form method="post" className="tr" key={student.id}>
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