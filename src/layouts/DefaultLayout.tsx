import React from "react";
import { Outlet } from "react-router-dom";
// import { SpeedInsights } from "@vercel/speed-insights/react";
// import { Analytics } from "@vercel/analytics/react";

export function DefaultLayout() {
  return (
    <React.Fragment>
      {/* <SpeedInsights />
      <Analytics /> */}
      <Outlet />
    </React.Fragment>
  );
}
