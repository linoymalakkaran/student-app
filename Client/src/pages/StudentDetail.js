import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleStudent, getStudentNationality } from "../lib/api";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import StudentForm from "../components/students/studentForm/StudentForm";
import { addOrUpdateStudent } from "../lib/api";
import Modal from "../components/UI/modelPopUp/Modal";

const StudentDetail = () => {
  const { sendRequest, status: addOrUpdateStudentStatus } =
    useHttp(addOrUpdateStudent);
  const addStudentHandler = (studentData) => {
    sendRequest(studentData);
  };
  const [isShowModal, setIsShowModal] = useState(false);

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

  const onCloseModal = () => {
    setIsShowModal(false);
  };

  const showSuccessModal = useCallback(function () {
    const didSubmitModalContent = (
      <React.Fragment>
        <div>
          <p>Student details updated successfully</p>
          <button className="actions-button" onClick={onCloseModal}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
    return <Modal onClose={onCloseModal}>{didSubmitModalContent}</Modal>;
  }, []);

  useEffect(() => {
    if (addOrUpdateStudentStatus === "completed") {
      setIsShowModal(true);
    }
  }, [addOrUpdateStudentStatus]);

  if (addOrUpdateStudentStatus === "completed" && isShowModal) {
    return showSuccessModal();
  }

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
  loadedStudent.nationality = studentNationalitity?.nationality?.ID || 2;

  return (
    <Fragment>
      <StudentForm
        studentDetails={loadedStudent}
        isLoading={addOrUpdateStudentStatus === "pending"}
        onAddStudent={addStudentHandler}
      />
      <Outlet />
    </Fragment>
  );
};

export default StudentDetail;
