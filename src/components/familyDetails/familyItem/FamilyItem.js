import { formatDate } from "../../../utils/helpers";
import classes from "./FamilyItem.module.css";

const FamilyItem = (props) => {
  return (
    <li className={classes.item}>
      <div className="figure">
        <div className="blockstudent">
          <p>{props.familyDetails.firstName}</p>
        </div>
        <div className="figcaption">{props.familyDetails.lastName}</div>
      </div>
      <div className="figure">
        <div className="blockstudent">
          <p>Date of Birth</p>
        </div>
        <div className="figcaption">
          {formatDate(props.familyDetails.dateOfBirth)}
        </div>
      </div>
      <div className="figure">
        <div className="blockstudent">
          <p>RelationShip</p>
        </div>
        <div className="figcaption">{props.familyDetails.relationship}</div>
      </div>
      <button className="btn" onClick={props.startAddFamilyDetailHandler}>
        Family Member Details
      </button>
    </li>
  );
};

export default FamilyItem;
