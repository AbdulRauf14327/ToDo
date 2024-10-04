import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import CharactersPage from "./pages/characterspage";
import CharacterDetail from "./pages/characterdetail";
import CustomersPage from "./pages/customerspage";
import AddTasksPage from "./pages/addtaskspage";
import CounterPage from "./pages/counterpage";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import PrivateRoutes from "./utilis/PrivateRoutes";
// import FormikLogin from "./components/auth/formiklogin";
// import FormikRegister from "./components/auth/formikregister";

function App() {
  const location = useLocation();
  const [isShowHeaderAndFooter, setIsShowHeaderAndFooter] = useState(false);

  useEffect(() => {
    if (
      location?.pathname === "/login" ||
      location?.pathname === "/register" ||
      location?.pathname === "/formiklogin" ||
      location?.pathname === "/formikregister"
    ) {
      setIsShowHeaderAndFooter(false);
    } else {
      setIsShowHeaderAndFooter(true);
    }
  }, [location?.pathname]);
  return (
    <>
      {isShowHeaderAndFooter && <MainLayout />}
      <Routes>
        {/* <Route path="/formiklogin" element={<FormikLogin />} />
        <Route path="/formikregister" element={<FormikRegister />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/" element={<PrivateRoutes />}>
          <Route path="/characterspage" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/customerspage" element={<CustomersPage />} />
          <Route path="/addtaskspage" element={<AddTasksPage />} />
          <Route path="/counterpage" element={<CounterPage />} />
        </Route> */}

        <Route path="/characterspage" element={<CharactersPage />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/customerspage" element={<CustomersPage />} />
        <Route path="/addtaskspage" element={<AddTasksPage />} />
        <Route path="/counterpage" element={<CounterPage />} />
      </Routes>
    </>
  );
}

export default App;
