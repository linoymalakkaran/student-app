import { useContext, useEffect, useState } from "react";

import useHttp from "../../../hooks/use-http";
import { addOrUpdateFamilyDetail, getAllNationalities } from "../../../lib/api";
import { isEmpty, isValidDate } from "../../../utils/helpers";
import Card from "../../UI/card/Card";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import classes from "./NewFamilyDetailsForm.module.css";
import DatePicker from "react-datepicker";
import StudentContext from "../../../store/student-context";

const NewFamilyDetailForm = (props) => {
  const studentId = props.studentId;
  const studentCtx = useContext(StudentContext);
  const familyMemberId = studentCtx?.selectedFamilyMember?.ID || null;

  const {
    sendRequest,
    data: familyDetailsResponse,
    status,
    error,
  } = useHttp(addOrUpdateFamilyDetail);
  const { sendRequest: sendNationalityRequest, data: nationalities } = useHttp(
    getAllNationalities,
    true
  );

  const [firstName, setFirstName] = useState(
    studentCtx?.selectedFamilyMember?.firstName || ""
  );
  const [lastName, setLastName] = useState(
    studentCtx?.selectedFamilyMember?.lastName || ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    studentCtx?.selectedFamilyMember?.dateOfBirth
      ? new Date(studentCtx?.selectedFamilyMember?.dateOfBirth)
      : new Date()
  );
  const [relationShip, setRelationship] = useState(
    studentCtx?.selectedFamilyMember?.relationship || "Parent"
  );
  const [nationality, setNationality] = useState(
    studentCtx?.selectedFamilyMember?.nationality || "2"
  );

  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    dateOfBirth: true,
    relationShip: true,
    nationality: true,
  });

  useEffect(() => {
    sendNationalityRequest();
  }, [sendNationalityRequest]);

  useEffect(() => {
    if (status === "completed" && !error) {
      props.onCloseFamilyDetailHandler();
      props.onForceRender();
    }
  }, [status, error, familyDetailsResponse, studentId]);

  let nationalitiesList =
    nationalities &&
    nationalities.length > 0 &&
    nationalities.map((item, i) => {
      return (
        <option key={i} value={item.ID}>
          {item.Title}
        </option>
      );
    });

  let relationshipList = ["Parent", "Sibling", "Spouse"].map((item, i) => {
    return (
      <option key={i} value={item}>
        {item}
      </option>
    );
  });

  const closeFamilyDetail = () => {
    studentCtx.removeSelectedFamilyMemeber();
    props.onCloseFamilyDetailHandler();
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    //#region form validation
    const enteredFirstNameIsValid = !isEmpty(firstName);
    const enteredLastNameIsValid = !isEmpty(lastName);
    const enteredDateOfBirthIsValid = isValidDate(dateOfBirth);
    const enteredRelationShipIsValid = !isEmpty(relationShip);
    const enteredNationalityIsValid = !isEmpty(nationality);

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      dateOfBirth: enteredDateOfBirthIsValid,
      relationShip: enteredRelationShipIsValid,
      nationality: enteredNationalityIsValid,
    });

    const formIsValid =
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredDateOfBirthIsValid &&
      enteredRelationShipIsValid &&
      enteredNationalityIsValid;

    if (!formIsValid) {
      return;
    }
    //#endregion form validation

    sendRequest({
      ID: familyMemberId || "",
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      relationship: relationShip,
      nationality: nationality,
      studentId: studentId,
    });
  };

  const firstNameControlClasses = `${classes.control} ${
    formInputsValidity.firstName ? "" : classes.invalid
  }`;
  const lastNameControlClasses = `${classes.control} ${
    formInputsValidity.lastName ? "" : classes.invalid
  }`;
  const dateOfBirthControlClasses = `${classes.control} ${
    formInputsValidity.dateOfBirth ? "" : classes.invalid
  }`;
  const relationShipControlClasses = `${classes.control} ${
    formInputsValidity.relationShip ? "" : classes.invalid
  }`;
  const nationalityControlClasses = `${classes.control} ${
    formInputsValidity.nationality ? "" : classes.invalid
  }`;

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        {status === "pending" && (
          <div className="centered">
            <LoadingSpinner />
          </div>
        )}

        <div className={firstNameControlClasses}>
          <label className="required" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          {!formInputsValidity.firstName && (
            <p className={classes.invalidLabel}>Please enter the first name</p>
          )}
        </div>
        <div className={lastNameControlClasses}>
          <label className="required" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          {!formInputsValidity.lastName && (
            <p className={classes.invalidLabel}>Please enter the last name</p>
          )}
        </div>
        <div className={dateOfBirthControlClasses}>
          <label className="required" htmlFor="lastName">
            Date of Birth
          </label>
          <DatePicker
            id="lastName"
            selected={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
          {!formInputsValidity.dateOfBirth && (
            <p className={classes.invalidLabel}>
              Please enter the valid Date of Birth
            </p>
          )}
        </div>
        <div className={relationShipControlClasses}>
          <label className="required" htmlFor="relationShip">
            RelationShip
          </label>
          <select
            id="relationShip"
            value={relationShip}
            onChange={(event) => setRelationship(event.target.value)}
          >
            {relationshipList}
          </select>
          {!formInputsValidity.nationality && (
            <p className={classes.invalidLabel}>Please select a relationShip</p>
          )}
        </div>
        <div className={nationalityControlClasses}>
          <label className="required" htmlFor="nationalities">
            Nationality
          </label>
          <select
            id="nationalities"
            value={nationality}
            onChange={(event) => setNationality(event.target.value)}
          >
            {nationalitiesList}
          </select>
          {!formInputsValidity.nationality && (
            <p className={classes.invalidLabel}>Please select a nationality</p>
          )}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            onClick={closeFamilyDetail}
            className="close-btn"
          >
            Cancel
          </button>
          {familyMemberId ? (
            <button className={`btn ${studentCtx.role}`}>
              Update Family Details
            </button>
          ) : (
            <button className="btn">Add Family Details</button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default NewFamilyDetailForm;
