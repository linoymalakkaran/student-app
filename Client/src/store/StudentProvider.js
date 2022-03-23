import { useReducer } from "react";
import StudentContext from "./student-context";

const defaultStudentState = {
  selectedFamilyMember: null,
  role: "Admin",
};

const studentReducer = (state, action) => {
  if (action.type === "SELECTED_FAMILY_MEMBER") {
    const newState = {
      ...state,
      selectedFamilyMember: action.selectedFamilyMember,
    };
    return newState;
  }

  if (action.type === "SELECTED_ROLE") {
    const newState = {
      ...state,
      role: action.role,
    };
    return newState;
  }

  if (action.type === "REMOVE_SELECTED_FAMILY_MEMBER") {
    const newState = {
      ...state,
      selectedFamilyMember: null,
    };
    return newState;
  }

  if (action.type === "RESET") {
    return defaultStudentState;
  }

  return defaultStudentState;
};

const StudentProvider = (props) => {
  const [studentState, dispatchStudentAction] = useReducer(
    studentReducer,
    defaultStudentState
  );

  const addSelectedMemberItemHandler = (item) => {
    dispatchStudentAction({
      type: "SELECTED_FAMILY_MEMBER",
      selectedFamilyMember: item,
    });
  };

  const changeRoleHandler = (item) => {
    dispatchStudentAction({ type: "SELECTED_ROLE", role: item });
  };

  const resetStudentHandler = () => {
    dispatchStudentAction({ type: "RESET" });
  };

  const removeSelectedFamilyMemeberHandler = () => {
    dispatchStudentAction({ type: "REMOVE_SELECTED_FAMILY_MEMBER" });
  };

  const studentContext = {
    selectedFamilyMember: studentState.selectedFamilyMember,
    role: studentState.role,
    addSelectedMemberItem: addSelectedMemberItemHandler,
    changeRole: changeRoleHandler,
    removeSelectedFamilyMemeber: removeSelectedFamilyMemeberHandler,
    clearStudent: resetStudentHandler,
  };

  return (
    <StudentContext.Provider value={studentContext}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
