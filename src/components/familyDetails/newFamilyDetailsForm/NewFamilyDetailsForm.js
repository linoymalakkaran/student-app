import { useRef, useEffect } from 'react';

import useHttp from '../../../hooks/use-http';
import { addFamilyDetail } from '../../../lib/api';
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import classes from './NewFamilyDetailsForm.module.css';

const NewFamilyDetailForm = (props) => {
  const familyDetailsTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addFamilyDetail);

  const { onAddedFamilyDetail } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedFamilyDetail();
    }
  }, [status, error, onAddedFamilyDetail]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = familyDetailsTextRef.current.value;

    // optional: Could validate here

    sendRequest({ familyDetailsData: { text: enteredText }, quoteId: props.quoteId });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='familyDetails'>Your FamilyDetail</label>
        <textarea id='familyDetails' rows='5' ref={familyDetailsTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add FamilyDetail</button>
      </div>
    </form>
  );
};

export default NewFamilyDetailForm;
