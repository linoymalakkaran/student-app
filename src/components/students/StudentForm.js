import { Fragment, useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import classes from "./StudentForm.module.css";
import DatePicker from "react-datepicker";
import "/node_modules/react-datepicker/dist/react-datepicker.css";
import useHttp from "../../hooks/use-http";
import { getAllNationalities } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const StudentForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const {
    sendRequest,
    status,
    data: nationalities,
    error,
  } = useHttp(getAllNationalities, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;

    // optional: Could validate here

    props.onAddStudent({
      firstName: enteredFirstName,
      lastName: enteredLastName,
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
            <input type="text" id="firstName" ref={firstNameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" ref={lastNameInputRef} />
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
            <select id="nationalities">{nationalitiesList}</select>
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
