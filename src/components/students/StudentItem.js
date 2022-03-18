import { Link } from "react-router-dom";

import classes from "./StudentItem.module.css";

const StudentItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockstudent>
          <p>{props.firstName}</p>
        </blockstudent>
        <figcaption>{props.lastName}</figcaption>
      </figure>
      <Link className="btn" to={`/students/${props.ID}`}>
        View Student Details
      </Link>
    </li>
  );
};

export default StudentItem;
