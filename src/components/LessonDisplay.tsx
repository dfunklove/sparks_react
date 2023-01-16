import { Lesson } from '../types'

type Props = {
    lesson: Lesson
}

function LessonDisplay({ lesson }: Props) {
    return <p>
            {lesson.id}
        </p>
}

export default LessonDisplay