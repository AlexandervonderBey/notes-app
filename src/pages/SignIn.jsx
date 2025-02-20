import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { signIn } from "../utils/localStorage";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = () => {
        // Validation
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        const result = signIn(email, password);
        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/home");
    };

    return (
        <div>
            <h1 className="text-center text-4xl font-black mt-12">Notes App</h1>
            <div className="container mx-auto my-20 p-6 w-full max-w-md bg-neutral rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Sign In</h2>

                {error && (
                    <div className="alert alert-warning shadow-lg mt-4">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current flex-shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                <div className="form-control mt-4">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="input input-bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control mt-4">
                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input input-bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-accent mt-6 w-full" onClick={handleSignIn}>
                    Sign In
                </button>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="link link-primary">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;