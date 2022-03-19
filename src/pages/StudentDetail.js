import { Fragment, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleStudent, getStudentNationality } from "../lib/api";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import StudentForm from "../components/students/studentForm/StudentForm";
import { addOrUpdateStudent } from "../lib/api";

const StudentDetail = () => {
  const { sendRequest, status } = useHttp(addOrUpdateStudent);
  const addStudentHandler = (studentData) => {
    sendRequest(studentData);
  };

  const params = useParams();

  const { studentId } = params;

  const {
    sendRequest: sendSingleStudentRequest,
    status: statusSingleStudent,
    data: loadedStudent,
    error,
  } = useHttp(getSingleStudent, true);

  useEffect(() => {
    sendSingleStudentRequest(studentId);
  }, [sendSingleStudentRequest, studentId]);

  let {
    sendRequest: sendStudentNationalityRequest,
    status: studentNationalityStatus,
    data: studentNationalitity,
    error: studentNationalityError,
  } = useHttp(getStudentNationality, true);

  useEffect(() => {
    sendStudentNationalityRequest(studentId);
  }, [sendStudentNationalityRequest, studentId]);

  if (studentNationalityError) {
    return <p className="centered focused">{studentNationalityError}</p>;
  }

  if (
    statusSingleStudent === "pending" ||
    studentNationalityStatus === "pending"
  ) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedStudent.ID) {
    return <p>No student found!</p>;
  }
  loadedStudent.nationality = studentNationalitity?.nationality?.ID || null;

  return (
    <Fragment>
      <StudentForm
        studentDetails={loadedStudent}
        isLoading={status === "pending"}
        onAddStudent={addStudentHandler}
      />
      <Outlet />
    </Fragment>
  );
};

export default StudentDetail;
