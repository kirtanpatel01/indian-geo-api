import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminPanel } from "./components";
import { Admin, Landing } from "./pages";

function App() {
   return (
      <div className="min-h-screen">
         <BrowserRouter>
            <Routes>
               <Route path="/*" element={<Navigate to="/landing" replace />} />
               <Route path="/landing/*" element={<Landing />} />
               <Route path="/admin/*" element={<Admin />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
