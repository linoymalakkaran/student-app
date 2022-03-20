import { useContext, useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import StudentContext from "../../../store/student-context";
import { formatDate } from "../../../utils/helpers";
import classes from "./FamilyItem.module.css";
import { removeFamilyMemberDetails } from "../../../lib/api";

const FamilyItem = (props) => {
  const studentCtx = useContext(StudentContext);
  const { sendRequest, status: familyDetailsStatus } = useHttp(
    removeFamilyMemberDetails
  );

  const editFamilyMemberDetails = () => {
    studentCtx.addSelectedMemberItem(props.familyDetails);
    props.startAddFamilyDetailHandler();
  };

  const removeFamilyMemberDetailsHandler = () => {
    sendRequest(props.familyDetails.ID);
  };
  
  useEffect(() => {
    if (familyDetailsStatus === "completed") {
      studentCtx.removeSelectedFamilyMemeber();
      props.forceRender();
    }
  }, [familyDetailsStatus]);

  // if (familyDetailsStatus === "completed") {
  //   // props.forceRender();
  // }

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
      <button className="btn-remove" onClick={removeFamilyMemberDetailsHandler}>
        Remove
      </button>
    </li>
  );
};

export default FamilyItem;
