import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";



const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./auth/LoginForm/login.tsx";
// import AppRoutes from "./routes";
//
// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <AppRoutes />
//             </Routes>
//         </Router>
//     );
// }
//
// export default App;
