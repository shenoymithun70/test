import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header/Header";
import MetricForm from "./metricForm/MetricForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <MetricForm />
    </>
  );
}

export default App;
