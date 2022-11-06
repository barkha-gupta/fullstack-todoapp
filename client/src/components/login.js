import "../App.css";
import {Link} from "react-router-dom";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
function Login()
{
    const navigate= useNavigate();
    const [user, setUser]= useState({
        email: "",
        password: ""
    })
    const handleInput = (e)=>{
        let name, value;
        name= e.target.name;
        value= e.target.value;
        // console.log(name, value)
        setUser({...user, [name]: value})
    }

    const handleSubmit= async(e) => {
        e.preventDefault();
        fetch("https://todolist10x-backend.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.message === 'Enter valid email') {
                alert("Enter valid email");
                return;
            }
            if (data.message === 'Enter the correct password') {
                alert("Enter the correct password");
                return;
            }
            if (data.message === "User Login Successful!") {
                localStorage.setItem('token', data.token)
                navigate('/todo')
            }
        })
    }
    return(
        <div className="login-container">
            <form method="POST" className="login-form"  >
                <div>
                    <h2>Member Login</h2>
                </div>
                
                <div>
                    <input type="text" placeholder="user email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}></input>
                </div>

                <div>
                    <input type="password" placeholder="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}></input>
                </div>

                <div>
                    <button type="submit"
                    onClick={handleSubmit}
                     >LOGIN</button>
                </div>

                <div>
                    <Link to="/register"><h4>Not Registered?</h4></Link>
                </div>
            </form>
        </div>
    )
}
export default Login;