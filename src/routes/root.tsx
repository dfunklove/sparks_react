import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { deleteToken, deleteUser, getToken } from "../storage";

export const loader = async ({ request, params }: {request: any, params: any}) => {
  const searchParams = new URLSearchParams(request.url.split('?')[1])
  const flash = searchParams?.get("flash")
  return { flash }
}

export default function Root() {
  const {flash} = useLoaderData() as any
  const navigate = useNavigate()
  return (
    <>
      <nav className="container-fluid">
        <ul><li><b><Link to={`/`}>Sparks for Succes</Link></b></li></ul>
        <ul>
          <li><Link to={`lessons/new`}>Single Lesson</Link></li>
          <li><Link to={`group_lessons/new`}>Group Lesson</Link></li>
          <li><Link to={`lessons`}>My Lessons</Link></li>
        { getToken() &&
          <li><a href="#"
            onClick={() => {
              deleteToken()
              deleteUser()
              navigate(`/login`);
            }}
          >
            Logout
          </a></li>
        }
        </ul>
      </nav>
      <p id="flash">{flash}</p>
      <main id="detail" className="container">
        <Outlet />
      </main>
    </>
  );
}