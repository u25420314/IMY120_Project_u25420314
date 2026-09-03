import {useState} from "react"
import { useNavigate } from "react-router-dom"

function SignupForm({ onSwitch }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event){
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

        try{
            const response = await fetch("http://localhost:3000/api/signup" , {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({ username, email, password})

            })

            const data = await response.json()
            console.log("Signup response:", data)
            

            navigate("/home")
        }catch(e){
            console.error("Signup request failed: " ,e)
            setError("Somethinf went wrong. please try again")
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {error && <p role="alert">{error}</p> }
            
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Please enter your username"
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your email!"
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter your password!"
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Please re enter your password!"
            />

            <button type="submit">Sign up</button>

            <p>Already have an account? {" "}<button type="button" onClick={onSwitch}>Login</button></p>


        </form>
    )
}

export default SignupForm