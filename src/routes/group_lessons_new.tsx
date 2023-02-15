import { Form, redirect, useLoaderData } from "react-router-dom";
import { Client } from "urql";
import { CreateGroupLessonDocument, GetStudentsDocument, GroupLesson, OpenLessonDocument, Student } from '../graphql/generated'
import { getUser } from '../storage'

export const action = ({client}: {client: Client}) => async ({ request, params }: {request: any, params: any}) => {
  const formData = await request.formData();
  const student_count = parseInt(formData.get("student_count"));
  const student_ids = []
  for (let i=0; i < student_count; i++) {
    const selected = formData.get(`student_${i}_selected`);
    if (selected) {
      const id = formData.get(`student_${i}_id`);
      student_ids.push(id)
    }
  }

  const result = await client.mutation(CreateGroupLessonDocument, {userId: getUser().id, studentIds: student_ids}).toPromise()
  const resultData = result.data?.createGroupLesson as GroupLesson
  if (resultData?.id && !result.error) {
    const lesson_id = resultData.id
    return redirect(`/group_lessons/${lesson_id}/checkout`);
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

function tally(e: any) {
  const student_count = document.getElementById("student_count") as HTMLInputElement
  let val = parseInt(student_count.value);
  if (e.target.checked)
    val++
  else
    val--
    student_count.value = val.toString()
}

function GroupLessonsNew() {
  const {students} = useLoaderData() as {students: [Student]}

  if (!students?.length) {
    return <div>No students have been assigned to you.  Please check back later or contact your supervisor.</div>
  }

  return <div>
    <h2>Start Group Lesson</h2>
    <Form method="post">
    <input type="hidden" name="student_count" id="student_count" defaultValue={0}/>

    <div className="stdnt table">
      <div className="tr">
        <div className="stdnt table">
        <div className="thead">
          <div className="tr">
            <span className="td">&nbsp;</span>
            <span className="td">F Name</span>
            <span className="td">L Name</span>
            <span className="td">School</span>
          </div>
        </div>

        { 
          students.map((student, i) => <div className="tr" key={student.id}>
            <input type="hidden" name={`student_${i}_id`} value={student.id}/>
            <input type="hidden" name={`student_${i}_school_id`} value={student.school.id}/>
            <span className="td"><input type="checkbox" name={`student_${i}_selected`} onClick={tally}/></span>
            <span className="td">{student.firstName}</span>
            <span className="td">{student.lastName}</span>
            <span className="td">{student.school.name}</span>
          </div>) 
        }
        </div>
      </div>
      <div className="tr">
        <span className="td" column-span="all"><button style={{width: "100%"}} type="submit">Start Lesson</button></span>
      </div>
    </div>
    </Form>
  </div>
}

export default GroupLessonsNew