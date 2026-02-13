import { Fragment, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";

import Chat from "./Chat";
import Intro from "./Intro";
import Calls from "./Calls";
import Timeline from "./Timeline";
import Letter from "./Letter";
function App() {
  const [valentineAnswer, setValentineAnswer] = useState<boolean | undefined>();

  return (
    <Fragment>
<div className="scroll-smooth">
        <Intro />
      <Chat />
      <Calls />
      <Timeline />
      <Letter />
</div>
    </Fragment>
  );
}

export default App;
