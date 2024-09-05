import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import HomeMakerDashboard from "./Components/HomeMakerDashboard";
import UserReg from "./Components/UserReg";
import HomeReg from "./Components/HomeReg";
import AddArea from "./Components/AddArea";
import BlockUser from "./Components/BlockUser";
import AddMaker from "./Components/AddMaker";
import AddCategory from "./Components/AddCategory";
import ViewOrder from "./Components/ViewOrder";
import AddFood from "./Components/AddFood";
import MyOrder from "./Components/MyOrder";
import Menu from "./Components/Menu";
import Kitchen from "./Components/Kitchen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route path="addArea" element={<AddArea />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="addMaker" element={<AddMaker />} />
            <Route path="blockUser" element={<BlockUser />} />
          </Route>
          <Route path="/userDashboard" element={<UserDashboard />}>
            <Route path="myOrder" element={<MyOrder />} />
            <Route path="menu" element={<Menu />} />
            <Route path="kitchen" element={<Kitchen />} />
          </Route>
          <Route path="/homeMakerDashboard" element={<HomeMakerDashboard />}>
            <Route path="viewOrder" element={<ViewOrder />} />
            <Route path="addFood" element={<AddFood />} />
          </Route>
          <Route path="/UserReg" element={<UserReg />} />
          <Route path="/HomeReg" element={<HomeReg />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
