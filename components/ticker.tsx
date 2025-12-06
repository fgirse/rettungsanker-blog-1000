import React from "react";
import MyComponent from "./bundesliga-marquee";
import Marquee from "react-fast-marquee";

const App = () => (
  <div className="w-full overflow-hidden">
    <Marquee>
      <MyComponent />
    </Marquee>
  </div>
);

export default App;
