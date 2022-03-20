import { useContext } from "react";
import StudentContext from "../../../store/student-context";
import { formatDate } from "../../../utils/helpers";
import classes from "./FamilyItem.module.css";

const FamilyItem = (props) => {
  const studentCtx = useContext(StudentContext);

  const editFamilyMemberDetails = () => {
    studentCtx.addSelectedMemberItem(props.familyDetails);
    props.startAddFamilyDetailHandler();
  };

  const removeFamilyMemberDetails = () => {};

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
      <button className="btn" onClick={editFamilyMemberDetails}>
        Edit
      </button>
      <button className="btn-remove" onClick={removeFamilyMemberDetails}>
        Remove
      </button>
    </li>
  );
};

export default FamilyItem;