import { Route, Routes, Navigate, Link } from "react-router-dom";

import AllStudents from "./pages/AllStudents";
import StudentDetail from "./pages/StudentDetail";
import NewStudent from "./pages/NewStudent";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/students" />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/students/:studentId" element={<StudentDetail />} />
        <Route path="/new-student" element={<NewStudent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
