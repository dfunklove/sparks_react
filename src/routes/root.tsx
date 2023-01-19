import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="navBar">
        <ul>
          <li><Link to={`lessons/new`}>New Lesson</Link></li>
        </ul>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}