import "./AuthForm.css"

export default function LoginForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("Login Successful ✅")
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="title">Login</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required minLength="6" />
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    )
}
