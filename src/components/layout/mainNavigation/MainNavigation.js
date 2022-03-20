import { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import StudentContext from "../../../store/student-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const roleInputRef = useRef();
  const studentCtx = useContext(StudentContext);

  const setRole = () => {
    studentCtx.changeRole(roleInputRef.current.value);
  };

  let roleList = ["Admin", "Registrar"].map((item, i) => {
    return (
      <option key={i} value={item}>
        {item}
      </option>
    );
  });
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Students App</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <select
              id="role"
              ref={roleInputRef}
              onChange={(event) => setRole()}
            >
              {roleList}
            </select>
          </li>
          <li>
            <NavLink
              to="/students"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              All Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-student"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Add a Student
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
