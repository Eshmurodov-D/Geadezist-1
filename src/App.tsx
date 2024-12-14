import React from "react";
import AppRoutes from "./routes";
import {BrowserRouter, Route} from "react-router-dom";
import Dashboard2 from "./Client/dashboard2.tsx";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <AppRoutes />
          <Route path="/dashboard2" element={<Dashboard2 />} />
      </BrowserRouter>

    </div>
  );
};

export default App;
