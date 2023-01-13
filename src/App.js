import { Route, Routes } from "react-router-dom";
import LogIn from "./LogIn";
import Register from "./Register";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
