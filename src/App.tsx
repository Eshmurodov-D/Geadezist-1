import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard2 from "./Client/dashboard2";

const App: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard2" element={<Dashboard2 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
