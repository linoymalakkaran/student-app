import { Link } from 'react-router-dom';

import classes from './NoStudentsFound.module.css';

const NoStudentsFound = () => {
  return (
    <div className={classes.nostudents}>
      <p>No students found!</p>
      <Link className='btn' to='/new-student'>
        Add a Student
      </Link>
    </div>
  );
};

export default NoStudentsFound;
