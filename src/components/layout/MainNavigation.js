import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Great Students</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/students' className={navData => navData.isActive ? classes.active : '' }>
              All Students
            </NavLink>
          </li>
          <li>
            <NavLink to='/new-student' className={navData => navData.isActive ? classes.active : '' }>
              Add a Student
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
