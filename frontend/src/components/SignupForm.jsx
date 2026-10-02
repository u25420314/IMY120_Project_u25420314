import {useState} from "react"
import { useNavigate } from "react-router-dom"

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
        setLoading(true)

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

            if(!response.ok){
                throw new Error(data.message || "Failed to signup");
            }
            console.log("Signup response:", data)
            
            if(onSignupSuccess){
                onSignupSuccess(data)
            }
            navigate("/login")
        }catch(e){
            console.error("Signup request failed: " ,e)
            setError("Somethinf went wrong. please try again")
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen bg-[var(--color-flick-teal)] flex flex-col items-center justify-center p-6">
            <div className="text-center mb-6">
                <h1 className="text-5xl font-black text-black">FLICK</h1>
                <p className="text-sm font-semibold text-black/80">Make your life a movie</p>
            </div>

            <div className="bg-white/20 p-8 rounded-xl shadow-md w-full max-w-sm backdrop-blur-sm border border-white/30">
                <h2 className="text-2xl font-bold text-center text-black mb-6">Sign Up</h2>
                {error && <p role="alert" className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-900 text-xs rounded">{error}</p> }
            </div>


            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Please enter your username"
                    className="w-full px-4 py-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email!"
                    className="w-full px-4 py-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please enter your password!"
                    className="w-full px-4 py-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Please re enter your password!"
                    className="w-full px-4 py-3 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition mt-2 cursor-pointer disabled:opacity-50">{loading ? "SIGNING UP..." : " SIGN UP" }</button>

                <div className="mt-6 text-center">
                    <p className="text-xs text-black/70 mb-2">Already have an account? {" "}<button type="button" onClick={onSwitchLogin} className="font-bold text-black underline hover:text-gray-800 cursor-pointer">Login</button></p>
                </div>
                


            </form>
        </div>
        
    )
}

export default SignupForm