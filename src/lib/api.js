import { isEmpty } from "../utils/helpers";

const BASE_URL = "http://localhost:8088/api";

export async function getAllStudents() {
  const response = await fetch(`${BASE_URL}/Students`);
  const studentData = await response.json();

  if (!response.ok) {
    throw new Error(studentData || "Could not fetch students.");
  }

  return studentData;
}

export async function getSingleStudent(studentId) {
  const response = await fetch(`${BASE_URL}/Students/${studentId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch student.");
  }

  return data;
}

export async function addOrUpdateStudent(studentData) {
  let response = null;
  if (studentData.ID) {
    response = await fetch(`${BASE_URL}/Students/${studentData.ID}`, {
      method: "PUT",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //just to fix bug in api, if we didn't' added dummy family member when we add student,
    //update family member api will throw an error(intrernal error 500)
    await addOrUpdateFamilyDetail({
      ID: null,
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      relationship: "",
    });
  } else {
    response = await fetch(`${BASE_URL}/Students`, {
      method: "POST",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // save student nationality
  await fetch(
    `${BASE_URL}/Students/${studentData.ID}/Nationality/${studentData.nationality}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create student.");
  }

  return data;
}

export async function getAllNationalities() {
  const response = await fetch(`${BASE_URL}/Nationalities `);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get FamilyDetails.");
  }

  return data;
}

export async function getStudentNationality(studentId) {
  const response = await fetch(`${BASE_URL}/Students/${studentId}/Nationality`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get nationality.");
  }

  return data;
}

export async function addOrUpdateFamilyDetail(requestData) {
  let response = null;
  if (!requestData.ID) {
    response = await fetch(
      `${BASE_URL}/Students/${requestData.studentId}/FamilyMembers`,
      {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    response = await fetch(`${BASE_URL}/FamilyMembers/${requestData.ID}`, {
      method: "PUT",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add familyDetail.");
  }

  return data;
}

export async function getAllFamilyDetails(studentId) {
  const response = await fetch(
    `${BASE_URL}/Students/${studentId}/FamilyMembers`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get FamilyDetails.");
  }

  const filteredData = data.filter((item) => !isEmpty(item.firstName));
  return filteredData;
}
