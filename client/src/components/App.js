import Header from "./Header"
import '../css/App.css';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-div">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
