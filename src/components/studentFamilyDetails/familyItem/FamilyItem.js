import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import StudentContext from "../../../store/student-context";
import { formatDate } from "../../../utils/helpers";
import classes from "./FamilyItem.module.css";
import { removeFamilyMemberDetails } from "../../../lib/api";
import Modal from "../../UI/modelPopUp/Modal";

const FamilyItem = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const studentCtx = useContext(StudentContext);
  const { sendRequest, status: familyDetailsStatus } = useHttp(
    removeFamilyMemberDetails
  );

  const editFamilyMemberDetails = () => {
    studentCtx.addSelectedMemberItem(props.familyDetails);
    props.startAddFamilyDetailHandler();
  };

  const removeFamilyMemberDetailsConfirmation = () => {
    setIsShowModal(true);
  };

  const removeFamilyMemberDetailsHandler = () => {
    sendRequest(props.familyDetails.ID);
  };

  const onCloseModal = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    if (familyDetailsStatus === "completed") {
      studentCtx.removeSelectedFamilyMemeber();
      setIsShowModal(false);
      props.forceRender();
    }
  }, [familyDetailsStatus]);

  if (isShowModal) {
    const removeFamilyMemberDetailsModalContent = (
      <React.Fragment>
        <div>
          <p>Are you sure you want to remove this family member ?</p>
          <button
            className="actions-confirm"
            onClick={removeFamilyMemberDetailsHandler}
          >
            Confirm
          </button>
          <button className="actions-button" onClick={onCloseModal}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
    return (
      <Modal onClose={onCloseModal}>
        {removeFamilyMemberDetailsModalContent}
      </Modal>
    );
  }

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
      <button
        className={`btn ${studentCtx.role}`}
        onClick={editFamilyMemberDetails}
      >
        Edit
      </button>
      <button
        className={`btn-remove ${studentCtx.role}`}
        onClick={removeFamilyMemberDetailsConfirmation}
      >
        Remove
      </button>
    </li>
  );
};

export default FamilyItem;
