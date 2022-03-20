import React from "react";

const StudentContext = React.createContext({
  selectedFamilyMember: {},
  role: "Admin",
  addSelectedMemberItem: (item) => {},
  changeRole: (item) => {},
  removeSelectedFamilyMemeber: (item) => {},
  clearStudent: () => {},
});

export default StudentContext;
