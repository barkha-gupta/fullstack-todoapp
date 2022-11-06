import "../App.css";
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
function Todo()
{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        let token = localStorage.getItem("token");
        fetch("https://todolist10x-backend.herokuapp.com/username", {
            method: "GET",
            headers: {
                "Authorization": token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUsername(data.email);
            });
    }, []);

    const handleLogout = () => {
        navigate('/', { replace: true });
        localStorage.clear();
    }
    return(
        <div className="main-container">
            <div className="user-container"> 
                <h2 style={{"paddingRight" : "20px"}} >{username}</h2>
            </div>
            <div className="submain-container">
                <div className="sidebar">
                    <div className="history">
                        <h2 style={{ color: "blueviolet" }}>To do List</h2>
                        <h3>History</h3>
                    </div>
                    <div className="logout">
                        <button onClick={handleLogout} className="btn">Logout</button>
                    </div>
                </div>

                <div className="activities">
                    <div className="addtodo">
                        <button className="btn-add">Add new activity</button>
                    </div>
                    <div className="activity-container">
                        <div className="head">
                            <div>Activity</div>
                            <div>Status</div>
                            <div>Time Taken</div>
                            <div>Action</div>
                        </div>
                        <div className="row">
                            <div>run</div>
                            <div>pending</div>
                            <div>00.10</div>
                            <div>start</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Todo;