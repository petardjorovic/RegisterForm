import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
