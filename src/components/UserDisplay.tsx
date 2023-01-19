import { Lesson } from '../types'
import MessageDisplay from './MessageDisplay'

type Props = {
    user: Lesson
}

function UserDisplay({ user }: Props) {
    return <p>
            {user.id}
        </p>
}

export default UserDisplay