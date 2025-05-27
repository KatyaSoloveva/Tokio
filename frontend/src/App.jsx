import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import CreateTask from "./pages/CreateTask/CreateTask";
import Header from "./components/Header/Header";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import MyTasks from "./pages/MyTasks/MyTasks";
import MyPage from "./pages/MyPage/MyPage";
import EditProfile from "./pages/EditProfile/EditProfile";

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
          <Route path="tasks" element={<MyTasks />}></Route>
          <Route path="tasks/:id" element={<MyTasks />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="edit_profile" element={<EditProfile />} />
        </Routes>
      </>
    </AuthProvider>
  );
}
