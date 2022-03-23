import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import StudentForm from "../components/students/studentForm/StudentForm";
import useHttp from "../hooks/use-http";
import { addOrUpdateStudent } from "../lib/api";

const NewStudent = () => {
  const { sendRequest, status } = useHttp(addOrUpdateStudent);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("/students");
    }
  }, [status, navigate]);

  const addStudentHandler = (studentData) => {
    sendRequest(studentData);
  };

  const studentDetails = {
    ID: null,
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    nationality: 2,
  };
  return (
    <Fragment>
      <StudentForm
        isLoading={status === "pending"}
        studentDetails={studentDetails}
        onAddStudent={addStudentHandler}
      />
      <Outlet />
    </Fragment>
  );
};

export default NewStudent;
