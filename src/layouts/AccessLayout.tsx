import React from "react";
import { Outlet } from "react-router-dom";

export function AccessLayout() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
