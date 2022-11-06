import "../App.css";
import {Link} from "react-router-dom";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
function Register()
{
    const navigate= useNavigate();
    const [user, setUser]= useState({
        email: "",
        password: "",
        cpassword: ""
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
        fetch('https://todolist10x-backend.herokuapp.com/register', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            }).then(res => res.json()).then(data => {
                console.log(data);
                if (data.message === 'User Already Registered!') {
                    alert("User Already Registered!");
                    return;
                }
                if (data.message === 'Enter valid email') {
                    alert("Enter valid email");
                    return;
                }
                if(data.message=== "User Registered!")
                {
                    navigate("/")
                }
            })
    }
    return(
        <div className="register-container">
            <form method="POST" className="register-form" onSubmit={handleSubmit} >
                <div>
                    <h2>Register</h2>
                </div>
                
                <div>
                    <input type="text" placeholder="User Email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}></input>
                </div>

                <div>
                    <input type="password" placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}></input>
                </div>

                <div>
                    <input type="password" placeholder="Confirm Password"
                    name="cpassword"
                    value={user.cpassword}
                    onChange={handleInput}></input>
                </div>

                <div>
                    <button type="submit"
                    >REGISTER</button>
                </div>

                <div>
                    <Link to="/"><h3 className="mem-login">Member Login</h3></Link>
                </div>
            </form>
        </div>
    )
}
export default Register;