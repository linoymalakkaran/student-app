const BASE_URL = 'http://localhost:8088/api';

export async function getAllStudents() {
  const response = await fetch(`${BASE_URL}/Students`);
  const studentData = await response.json();

  if (!response.ok) {
    throw new Error(studentData || 'Could not fetch students.');
  }

  return studentData;
}

export async function getSingleStudent(studentId) {
  const response = await fetch(`${BASE_URL}/students/${studentId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch student.');
  }

  const loadedStudent = {
    id: studentId,
    ...data,
  };

  return loadedStudent;
}

export async function addStudent(studentData) {
  const response = await fetch(`${BASE_URL}/students.json`, {
    method: 'POST',
    body: JSON.stringify(studentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create student.');
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(`${BASE_URL}/comments/${requestData.studentId}.json`, {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(studentId) {
  const response = await fetch(`${BASE_URL}/comments/${studentId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
