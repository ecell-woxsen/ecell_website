import React, { ReactNode } from "react";

export default function CoreTeamCardWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="core-team-card-wrapper">
      {children}
    </div>
  );
}
