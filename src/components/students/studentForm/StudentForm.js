import { Fragment, useContext, useEffect, useState } from "react";

import Card from "../../UI/card/Card";
import classes from "./StudentForm.module.css";
import DatePicker from "react-datepicker";
import "/node_modules/react-datepicker/dist/react-datepicker.css";
import useHttp from "../../../hooks/use-http";
import { getAllNationalities } from "../../../lib/api";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";
import { isEmpty, isValidDate } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import StudentContext from "../../../store/student-context";

const StudentForm = (props) => {
  const navigate = useNavigate();
  const studentCtx = useContext(StudentContext);
  const params = useParams();
  const { studentId } = params;

  const [firstName, setFirstName] = useState(props.studentDetails.firstName);
  const [lastName, setLastName] = useState(props.studentDetails.lastName);
  const [nationality, setNationality] = useState(
    props.studentDetails.nationality
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    props.studentDetails?.dateOfBirth
      ? new Date(props.studentDetails.dateOfBirth)
      : new Date()
  );

  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    dateOfBirth: true,
    nationality: true,
  });

  const {
    sendRequest: sendNationalityRequest,
    status: nationalityStatus,
    data: nationalities,
    error: nationalityError,
  } = useHttp(getAllNationalities, true);

  useEffect(() => {
    sendNationalityRequest();
  }, [sendNationalityRequest]);

  if (nationalityError) {
    return <p className="centered focused">{nationalityError}</p>;
  }

  if (nationalityError) {
    return <p className="centered focused">{nationalityError}</p>;
  }

  if (nationalityStatus === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  function submitFormHandler(event) {
    event.preventDefault();

    //#region form validation
    const enteredFirstNameIsValid = !isEmpty(firstName);
    const enteredLastNameIsValid = !isEmpty(lastName);
    const enteredDateOfBirthIsValid = isValidDate(dateOfBirth);
    const enteredNationalityIsValid = !isEmpty(nationality);

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      dateOfBirth: enteredDateOfBirthIsValid,
      nationality: enteredNationalityIsValid,
    });

    const formIsValid =
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredDateOfBirthIsValid &&
      enteredNationalityIsValid;

    if (!formIsValid) {
      return;
    }
    //#endregion form validation

    props.onAddStudent({
      ID: studentId,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      nationality: nationality,
    });
  }

  const cancel = () => {
    navigate("/students");
  };

  let nationalitiesList =
    nationalities.length > 0 &&
    nationalities.map((item, i) => {
      return (
        <option key={i} value={item.ID}>
          {item.Title}
        </option>
      );
    });

  const firstNameControlClasses = `${classes.control} ${
    formInputsValidity.firstName ? "" : classes.invalid
  }`;
  const lastNameControlClasses = `${classes.control} ${
    formInputsValidity.lastName ? "" : classes.invalid
  }`;
  const dateOfBirthControlClasses = `${classes.control} ${
    formInputsValidity.dateOfBirth ? "" : classes.invalid
  }`;
  const nationalityControlClasses = `${classes.control} ${
    formInputsValidity.nationality ? "" : classes.invalid
  }`;

  return (
    <Fragment>
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
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
              <p className={classes.invalidLabel}>
                Please enter the first name
              </p>
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
              onChange={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
            />
            {!formInputsValidity.dateOfBirth && (
              <p className={classes.invalidLabel}>
                Please enter the valid Date of Birth
              </p>
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
              <p className={classes.invalidLabel}>
                Please select a nationality
              </p>
            )}
          </div>
          <div className={classes.actions}>
            <button type="button" onClick={cancel} className="close-btn">
              Cancel
            </button>
            {studentId ? (
              <button className={`btn ${studentCtx.role}`}>
                Update Student
              </button>
            ) : (
              <button className="btn">Add Student</button>
            )}
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default StudentForm;
