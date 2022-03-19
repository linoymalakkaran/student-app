import { useEffect, useState } from "react";

import useHttp from "../../../hooks/use-http";
import { addOrUpdateFamilyDetail, getAllNationalities } from "../../../lib/api";
import { isEmpty, isValidDate } from "../../../utils/helpers";
import Card from "../../UI/card/Card";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import classes from "./NewFamilyDetailsForm.module.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const NewFamilyDetailForm = (props) => {
  const navigate = useNavigate();
  const studentId = props.studentId;

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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    props.studentDetails?.dateOfBirth
      ? new Date(props.studentDetails.dateOfBirth)
      : new Date()
  );
  const [relationShip, setRelationship] = useState("Parent");
  const [nationality, setNationality] = useState("2");

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
      //navigate(`/student/${studentId}/family-details`);
      window.location.href = `/student/${studentId}/family-details`;
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
      ID: props.familyMemberId || "",
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
          <label htmlFor="firstName">First Name</label>
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
          <label htmlFor="lastName">Last Name</label>
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
          <label htmlFor="lastName">Date of Birth</label>
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
          <label htmlFor="relationShip">RelationShip</label>
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
          <label htmlFor="nationalities">Nationality</label>
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
          <button className="btn">Add Family Details</button>
        </div>
      </form>
    </Card>
  );
};

export default NewFamilyDetailForm;
