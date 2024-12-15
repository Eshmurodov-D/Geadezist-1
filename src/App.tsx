import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Client from "./Client/Client.tsx";

const App: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <BrowserRouter>
                <Routes>
                    <Route path="/Client" element={<Client />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
