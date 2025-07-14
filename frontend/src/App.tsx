import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./comps/footer";
import Navbar from "./comps/navbar";
import ProfilePage from "./profile/profilePage";
const Register = lazy(() => import("./auth/register"));
const Login = lazy(() => import("./auth/login"));
const ForgotPassword = lazy(() => import("./auth/forgot-password"));
const ResetPassword = lazy(() => import("./auth/resetPassword"));
const ProtectedRoute = lazy(() => import("./auth/protectedRoute"));
const CoverPage = lazy(() => import("./comps/cover-page"));
const Home = lazy(() => import("./comps/homepage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={"<Loader />"}>
        <div className="w-full top-0 z-50!">
          <Navbar />
        </div>
        <div className="mt-16 md:mt-20 lg:mt-18 bg-gray-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token?" element={<ResetPassword />} />
            <Route
              path="/secure-page"
              element={
                <ProtectedRoute kids={
                <CoverPage />
              
              } />

              }
            ></Route>
          </Routes>
        </div>

        <div className="fixed bottom-0 w-full bg-blue-900 backdrop-blur-md">
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
