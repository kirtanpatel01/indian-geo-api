import React from "react";
import { Link } from "react-router-dom";

function Landing() {
   return (
      <div className="min-h-screen flex items-center justify-center">
         <Link to={"/admin"} className="primary-btn">
            Go to Admin Panel
         </Link>
      </div>
   );
}

export default Landing;
