import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = ({ small }) => {
  return (
    <div className="justify-content-center flex-fill">
      <Spinner
        animation="border"
        className="align-self-center"
        size={small ? "sm" : undefined}
      />
    </div>
  );
};

export default Loading;
