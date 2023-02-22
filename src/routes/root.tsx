import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { deleteToken, deleteUser, getToken } from "../storage";

export default function Root() {
  const flash = useLocation().state?.flash
  const navigate = useNavigate()
  return (
    <>
      <nav className="container-fluid">
        <ul><li><b><Link to={`/`}>Sparks for Success</Link></b></li></ul>
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
      <main id="detail" className="container">
        {flash && <mark>{flash}</mark>}
        <Outlet />
      </main>
    </>
  );
}