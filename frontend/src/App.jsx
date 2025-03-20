import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Opportunities from "./pages/Opportunities/Opportunities";
import About from "./pages/About/About";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import Tasks from "./pages/Tasks/Tasks";
import api from "./api";

export default function App() {
  return (
    <AuthProvider>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="register" element={<Registration />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="opportunities" element={<Opportunities />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="tasks" element={<Tasks />}></Route>
          </Routes>
        </Container>
    </AuthProvider>
  );
}
