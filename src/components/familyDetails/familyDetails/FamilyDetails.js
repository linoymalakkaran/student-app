import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./FamilyDetails.module.css";
import NewFamilyDetailForm from "../newFamilyDetailsForm/NewFamilyDetailsForm";
import useHttp from "../../../hooks/use-http";
import { getAllFamilyDetails } from "../../../lib/api";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import FamilyDetailsList from "../familyDetailsList/FamilyDetailsList";

const FamilyDetails = () => {
  const [isAddingFamilyDetail, setIsAddingFamilyDetail] = useState(false);
  const params = useParams();

  const { studentId } = params;

  const {
    sendRequest,
    status,
    data: loadedFamilyDetails,
  } = useHttp(getAllFamilyDetails);

  useEffect(() => {
    sendRequest(studentId);
  }, [studentId, sendRequest]);

  const startAddFamilyDetailHandler = () => {
    setIsAddingFamilyDetail(true);
  };

  const addedFamilyDetailHandler = useCallback(() => {
    sendRequest(studentId);
  }, [sendRequest, studentId]);

  let familyDetails;

  if (status === "pending") {
    familyDetails = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    status === "completed" &&
    loadedFamilyDetails &&
    loadedFamilyDetails.length > 0
  ) {
    familyDetails = (
      <FamilyDetailsList
        familyDetails={loadedFamilyDetails}
        startAddFamilyDetailHandler={startAddFamilyDetailHandler}
      />
    );
  }

  if (
    status === "completed" &&
    (!loadedFamilyDetails || loadedFamilyDetails.length === 0)
  ) {
    familyDetails = <p className="centered">No family Details added yet !</p>;
  }

  return (
    <section className={classes.familyDetails}>
      <h2>Student Family Details</h2>
      {!isAddingFamilyDetail && (
        <button className="btn" onClick={startAddFamilyDetailHandler}>
          Add Family Detail
        </button>
      )}
      {isAddingFamilyDetail && (
        <NewFamilyDetailForm
          studentId={studentId}
          onAddedFamilyDetail={addedFamilyDetailHandler}
        />
      )}
      {familyDetails}
    </section>
  );
};

export default FamilyDetails;
