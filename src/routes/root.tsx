import { Link, Outlet, useNavigate } from "react-router-dom";
import { deleteToken, deleteUser, getToken } from "../storage";

export default function Root() {
  const navigate = useNavigate()
  return (
    <>
      <div className="navBar">
        <ul>
          <li><Link to={`lessons/new`}>New Lesson</Link></li>
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
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}