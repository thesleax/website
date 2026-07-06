import * as React from "react";

export interface AuroraProps {
  colorStops?: string[];
  speed?: number;
  blend?: number;
  amplitude?: number;
  time?: number;
}

declare const Aurora: (props: AuroraProps) => React.JSX.Element;
export default Aurora;
