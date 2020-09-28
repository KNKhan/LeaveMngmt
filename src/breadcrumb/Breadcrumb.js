import React from "react";

function Breadcrumb(props) {
  return (
    <div className="card title-bar">
      Home/ <span className="blue">{props.page}</span>
    </div>
  );
}

export default Breadcrumb;
