import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    background-color:white;
    font-weight:600;
    padding:10px 20px;
    border-radius:50px;
    border:0;
    gap:5px;
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    color:black;
    margin-top:50px;
    cursor:pointer;
`;

const Logo = styled.img`
    height:25px;
`;

export default function GithubButton(){
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provieder = new GithubAuthProvider();
            await signInWithPopup(auth, provieder);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg" />
            Continue with Github
        </Button>
    )
}