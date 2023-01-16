import { Student } from '../types'

type Props = {
    students: Student[]
}

function NewLesson({ students }: Props) {
    return <div>
      <h2>Start Single Lesson</h2>
      <table className='stdnt'>
      <tr>
        <th>F Name</th>
        <th>L Name</th>
        <th>School</th>
      </tr>

      { 
        students.map((student, i) => <tr>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.school.name}</td>
          <td><button>Start Lesson</button></td>
        </tr>) 
      }
      
      </table>
    </div>
}

export default NewLesson