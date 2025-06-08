import React from "react";
import { useLocation } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Form Submitted Successfully</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default SuccessPage;
