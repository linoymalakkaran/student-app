import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import StudentForm from '../components/students/StudentForm';
import useHttp from '../hooks/use-http';
import { addStudent } from '../lib/api';

const NewStudent = () => {
  const { sendRequest, status } = useHttp(addStudent);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'completed') {
      navigate('/students');
    }
  }, [status, navigate]);

  const addStudentHandler = (studentData) => {
    sendRequest(studentData);
  };

  return <StudentForm isLoading={status === 'pending'} onAddStudent={addStudentHandler} />;
};

export default NewStudent;
