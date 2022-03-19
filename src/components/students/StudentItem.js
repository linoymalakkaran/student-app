import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers";

import classes from "./StudentItem.module.css";

const StudentItem = (props) => {
  return (
    <li className={classes.item}>
      <div className="figure">
        <div className="blockstudent">
          <p>{props.firstName}</p>
        </div>
        <div className="figcaption">{props.lastName}</div>
      </div>
      <div className="figure">
        <div className="blockstudent">
          <p>Date of Birth</p>
        </div>
        <div className="figcaption">{formatDate(props.dateOfBirth)}</div>
      </div>
      <Link className="btn" to={`/students/${props.ID}`}>
        View Student Details
      </Link>
    </li>
  );
};

export default StudentItem;
