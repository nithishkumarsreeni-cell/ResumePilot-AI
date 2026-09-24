import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AnalysisDetails from "./pages/AnalysisDetails";
import AnalysisHistory from "./pages/AnalysisHistory";

import UploadResume from "./components/UploadResume";
import AnalyzeResume from "./components/AnalyzeResume";

import "./App.css";


function ProtectedRoute({ children }) {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    return isLoggedIn
        ?
        children
        :
        <Login />;

}


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* Register */}

                <Route
                    path="/"
                    element={<Register />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Login */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Upload Resume */}

                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <UploadResume />
                        </ProtectedRoute>
                    }
                />


                {/* Analyze Resume */}

                <Route
                    path="/analyze"
                    element={
                        <ProtectedRoute>
                            <AnalyzeResume />
                        </ProtectedRoute>
                    }
                />


                {/* Analysis Details */}

                <Route
                    path="/analysis-details"
                    element={
                        <ProtectedRoute>
                            <AnalysisDetails />
                        </ProtectedRoute>
                    }
                />


                {/* Analysis History */}

                <Route
                    path="/analysis-history"
                    element={
                        <ProtectedRoute>
                            <AnalysisHistory />
                        </ProtectedRoute>
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}


export default App;