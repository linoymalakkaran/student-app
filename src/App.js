import { Route, Routes, Navigate, Link } from "react-router-dom";

import AllStudents from "./pages/AllStudents";
import StudentDetail from "./pages/StudentDetail";
import NewStudent from "./pages/NewStudent";
import NotFound from "./pages/NotFound";
import FamilyDetails from "./components/familyDetails/familyDetails/FamilyDetails";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/students" />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/new-student" element={<NewStudent />} />
        <Route path="/student/:studentId" element={<StudentDetail />}>
          <Route
            path=""
            element={
              <div className="centered">
                <Link className="btn--flat" to={`family-details`}>
                  Load Family Details
                </Link>
              </div>
            }
          />
          <Route path={`family-details`} element={<FamilyDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
