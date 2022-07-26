import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import loader from "../../assets/loader.gif";
import { SetAvatarRoute } from "../../util/ApiRoutes";

const SetAvatar = () => {

    const api = 'http://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
            return;
        }
    };
    useEffect( () => {
        const fetchData = async () => {
            const data = []
            for(let i=0; i<4;i++){
                const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString('base64'));
            }
            setAvatar(data);
            setIsLoading(false);
        }
    },[]); 
    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div className={`avatar ${selectedAvatar === index ?"selected" : ""}`} key={index}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar}/>
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
            <ToastContainer />
        </>
    );
}

const Container = styled.div``

export default SetAvatar;