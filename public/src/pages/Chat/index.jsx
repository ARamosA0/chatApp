import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { AllUseresRoutes } from "../../util/ApiRoutes";

const Chat = () => {

    const navigate = useNavigate();
    const [contact, setContact] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    



    
    useEffect(()=>{
        const getContact = async () => {
            if(!localStorage.getItem("chat-app-user")){
                navigate("/login")
            }else {
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            }
        }
        getContact();
        const getContactList = async () => {
            if(currentUser){
                if(currentUser.isAvatarImageSet){
                    const data = await axios.get(`${AllUseresRoutes}/${currentUser.id}`);
                    setContact(data.data);
                }else {
                    navigate("/setAvatar");
                }
            }
        }
        getContactList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <Container>
                <div className="container"></div>
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1024px) {
            grid-template-columns: 35% 65%;
        }
`;

export default Chat;