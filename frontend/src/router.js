import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import UpdateTree from "./pages/updateTree/updateTree.js";
import LoginForm from "./pages/Auth/Login.js";
import SignupForm from "./pages/Auth/SignUp.js";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/update-tree/:_id" element={<UpdateTree />} />
                <Route
                    path="*"
                    element={
                        <div className="container">
                            <h1>Page not found</h1>
                            <button
                                className="backward-link"
                                onClick={() => (window.location.href = "/")}
                            >
                                Go to Home
                            </button>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
