import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLoginSuccess, onSwitchtoSignup }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)



        //validation
        if(!email || !password){
            setError("All fields are required!")
            return
        }

        if(!email.includes("@")){
            setError("Please enter a valid email!")
        }

        setError("")

        try{
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password})

                
            })

            const data = await response.json()
            console.log("Login response:", data)

            if(!response.ok){
                throw new Error(data.error || "Failed to login")
            }

            if(onLoginSuccess){
                onLoginSuccess(data)
            }

            navigate("/home")
        }catch(e){
            console.error("Login request failed:", e)
            setError("Something went wrong, please try again")
        }
    }

    return(
        <div className="min-h-screen bg-[var(--color-flick-teal)] flex flex-col items-center justify-center p-6">
            <div className="text-center mb-6">
                <h1 className="text-5xl font-black text-black">FLICK</h1>
                <p className="text-sm font-semibold text-black/80">Make your life a movie</p>
            </div>

            <div className="bg-white/20 p-8 rounded-xl shadow-md w-full max-w-sm backdrop-blur-sm border border-white/30">
                <h2 className="text-2xl font-bold text-center text-black mb-6">Login</h2>
                {error && <p role="alert">{error}</p> }
            </div>
            <form onSubmit={handleSubmit}>
                

                


                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email address"
                    className="w-full px-4 py-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please enter your password"
                    className="w-full px-4 py-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition mt-2 cursor-pointer disabled:opacity-50">{loading ? 'LOGINING IN...' : 'LOGIN'}</button>
                <div className="mt-6 text-center">
                    <p className="text-xs text-black/70 mb-2">Don't have an account? {" "}<button type="button" onClick={onSwitchtoSignup} className="font-bold text-black underline hover:text-gray-800 cursor-pointer">Sign Up</button></p>
                </div>
                
            
            
            </form> 
        </div>
        
    )
}
export default LoginForm