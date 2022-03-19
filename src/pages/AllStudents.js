import { useEffect } from "react";

import StudentList from "../components/students/studentList/StudentList";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import NoStudentsFound from "../components/students/noStudentsFound/NoStudentsFound";
import useHttp from "../hooks/use-http";
import { getAllStudents } from "../lib/api";

const AllStudents = () => {
  const {
    sendRequest,
    status,
    data: loadedStudents,
    error,
  } = useHttp(getAllStudents, true);

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

  if (
    status === "completed" &&
    (!loadedStudents || loadedStudents.length === 0)
  ) {
    return <NoStudentsFound />;
  }

  return <StudentList students={loadedStudents} />;
};

export default AllStudents;
