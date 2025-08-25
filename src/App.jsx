import { Routes, Route, Navigate } from "react-router-dom";
import Form from "./Form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/buat" replace />} />
      <Route path="/buat" element={<Form />} />
      <Route path="*" element={<h1>404 Not Found 😵</h1>} />
    </Routes>
  );
}

export default App;
