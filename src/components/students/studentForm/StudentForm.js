import { Fragment, useEffect, useRef, useState } from "react";

import Card from "../../UI/card/Card";
import classes from "./StudentForm.module.css";
import DatePicker from "react-datepicker";
import "/node_modules/react-datepicker/dist/react-datepicker.css";
import useHttp from "../../../hooks/use-http";
import { getAllNationalities } from "../../../lib/api";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import { useLocation } from "react-router-dom";

const StudentForm = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("studentId");

  const [isEntering, setIsEntering] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(
    props.studentDetails?.dateOfBirth
      ? new Date(props.studentDetails.dateOfBirth)
      : new Date()
  );

  const [firstName, setFirstName] = useState(props.studentDetails.firstName);
  const [lastName, setLastName] = useState(props.studentDetails.lastName);
  const [nationality, setNationality] = useState(
    props.studentDetails.nationality
  );

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

    // optional: Could validate here

    props.onAddStudent({
      ID: studentId,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
    });
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
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

  return (
    <Fragment>
      {/* Prompt is currently not supported yet by v6 */}
      {/* <Prompt
        when={isEntering}
        message={(location) =>
          'Are you sure you want to leave? All your entered data will be lost!'
        }
      /> */}
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(firstName) => setFirstName(firstName)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(lastName) => setLastName(lastName)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="lastName">Date of Birth</label>
            <DatePicker
              id="lastName"
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="nationalities">Nationality</label>
            <select
              id="nationalities"
              value={nationality}
              onChange={(nationality) => setNationality(nationality)}
            >
              {nationalitiesList}
            </select>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Student
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default StudentForm;
