import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import Home from "./Home";
import AuthLayout from "./AuthLayout";
import SingleProduct from "./SingleProduct";

function App() {
  return (

   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Signup" replace />} />


        <Route path="/Signup"
          element={
            <AuthLayout protectedRoute={false}>
              <Signup />
            </AuthLayout>
          }
        />

        <Route path="/Login"
          element={
            <AuthLayout protectedRoute={false}>
              <Login />
            </AuthLayout>
          }
        />


        <Route path="/Home"
          element={
            <AuthLayout protectedRoute={true}>
              <Home />
            </AuthLayout>
          }
        />

        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;