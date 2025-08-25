import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthForm.css";

export default function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/login`,
                formData
            );
            alert(response.data.message);
            localStorage.setItem("token", JSON.stringify(response.data.data));
            if (response.data.success) {
                setFormData({
                    email: "",
                    password: "",
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred during login.");
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="title">Login</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required minLength="6" />
                    <button type="submit" className="btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
