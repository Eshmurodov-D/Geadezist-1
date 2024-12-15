import React from "react";
import { BrowserRouter } from "react-router-dom";
// import Dashboard2 from "./Client/dashboard2";
import AppRoutes from "./routes";

const App: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </div>
    );
};

export default App;
