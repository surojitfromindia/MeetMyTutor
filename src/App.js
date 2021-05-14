import "./App.css";
import RAPI from "./API/RequestAPI";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./PageComponents/Dashboard";
import LoginPage from "./PageComponents/LoginPage";
import { SetFirstTheme } from "./Hooks/useTheme";

/*The Entry Point */
function App() {
  //check if sessonstorage has token, then validate it
  //if token is present Render the dashboard
  //else Render Welcome/landing
  //ping with auth token
  SetFirstTheme();

  const [comp, setComp] = useState();
  const [tk, settoken] = useState();
  useEffect(() => {
    RAPI()
      .get("/")
      .then(() => {
        setComp(<Dashboard />);
      })
      .catch((err) => {
        setComp(<LoginPage setToken={settoken} />);
      });
  }, [tk]);

  return (
    <div>
      <BrowserRouter>{comp}</BrowserRouter>
    </div>
  );
}

export default App;
