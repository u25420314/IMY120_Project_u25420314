import {useState} from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../config";
import { saveUser } from "../session"

function SignupForm({ onSignupSuccess, onSwitchLogin }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        

        //validation
        if(!username || !email || !password || !confirmPassword){
            setError("All field are required!")
            return
        }

        if(!email.includes("@")){
            setError("Please enter a valid email!")
            return
        }

        if(password != confirmPassword){
            setError("Passwords do not match!")
            return
        }

        setError("")
        setLoading(true)

        try{
            const response = await fetch(`${API_URL}/api/signup`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({ username, email, password})

            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || "Failed to signup");
            }
            console.log("Signup response:", data)
            
            saveUser(data)

            if(onSignupSuccess){
                onSignupSuccess(data)
            }

            navigate("/home")
        }catch(e){
            console.error("Signup request failed: " ,e)
            setError(e.message || "Something went wrong. please try again")
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <section className="auth-card">
            <h2>SIGN UP</h2>

            <form onSubmit={handleSubmit}>
                {error && <p role="alert">{error}</p>}

                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Pick a username"
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a password"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Type it again"
                    />
                </div>

                <button type="submit" disabled={loading}>{loading ? "SIGNING UP..." : "SIGN UP"}</button>
            </form>

            <div className="auth-switch">
                <p>Already have an account?</p>
                <button type="button" onClick={onSwitchLogin}>LOGIN</button>
            </div>
        </section>
        
    )
}

export default SignupForm