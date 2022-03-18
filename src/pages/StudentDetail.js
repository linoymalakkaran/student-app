import { Fragment, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

import HighlightedStudent from "../components/students/HighlightedStudent";
import useHttp from "../hooks/use-http";
import { getSingleStudent } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const StudentDetail = () => {
  const params = useParams();

  const { studentId } = params;

  const {
    sendRequest,
    status,
    data: loadedStudent,
    error,
  } = useHttp(getSingleStudent, true);

  useEffect(() => {
    sendRequest(studentId);
  }, [sendRequest, studentId]);

  if (status === "pending") {
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

  return (
    <Fragment>
      <HighlightedStudent
        firstName={loadedStudent.firstName}
        lastName={loadedStudent.lastName}
      />
      <Outlet />
    </Fragment>
  );
};

export default StudentDetail;
