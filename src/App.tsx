import React from "react";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";

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
