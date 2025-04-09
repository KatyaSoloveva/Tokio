import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import CreateTask from "./pages/CreateTask/CreateTask";
import About from "./pages/About/About";
import Header from "./components/Header/Header";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import MyTasks from "./pages/MyTasks/MyTasks";

export default function App() {
  return (
    <AuthProvider>
        <Header />
        <>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="register" element={<Registration />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="create" element={<CreateTask />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="tasks" element={<MyTasks />}></Route>
          </Routes>
        </>
    </AuthProvider>
  );
}
