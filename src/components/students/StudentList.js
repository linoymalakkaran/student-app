import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import StudentItem from "./StudentItem";
import classes from "./StudentList.module.css";

const sortStudents = (students, ascending) => {
  return students.sort((studentA, studentB) => {
    if (ascending) {
      return studentA.firstName > studentB.firstName ? 1 : -1;
    } else {
      return studentA.firstName < studentB.firstName ? 1 : -1;
    }
  });
};

const StudentList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedStudents = sortStudents(props.students, isSortingAscending);

  const changeSortingHandler = () => {
    navigate({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedStudents.map((student) => (
          <StudentItem
            key={student.ID}
            ID={student.ID}
            firstName={student.firstName}
            lastName={student.lastName}
            dateOfBirth={student.dateOfBirth}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default StudentList;
