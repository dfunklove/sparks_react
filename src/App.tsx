import NewLesson from './components/NewLesson'
import { useQuery } from 'urql'
import { GetStudentsDocument } from './graphql/generated'

function App() {
  const [results] = useQuery({
    query: GetStudentsDocument
  })
  
  return (
    <div>
      {
        //results.data?.students.map((lesson, i) => <LessonDisplay lesson={lesson} key={i}/>)
        results.data ? <NewLesson students={results.data?.students}/> : "No students"
      }
      
    </div>
  )
}

export default App
