import React from "react";
import "./FullPageLoader.css";
import { Spinner } from "react-bootstrap";

const FullPageLoader = () => {
  return (
    <div className="loader-container">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default FullPageLoader;
