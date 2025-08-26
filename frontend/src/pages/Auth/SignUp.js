import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthForm.css";
import { toast } from "react-toastify";

export default function SignupForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/users/signup`,
                formData
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        } catch (error) {
            console.error("Signup failed:", error);
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred during signup.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="title">Signup</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        minLength="3"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        minLength="6"
                    />
                    <button type="submit" className="btn">
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}
