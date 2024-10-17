import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Input, Form, Switcher, Title, Wrapper } from "../components/auth-comp";
import GithubButton from "../components/github-btn";

export default function Login(){
    const navigate = useNavigate();
    const [ isLoading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value} } = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if(isLoading || email==='' || password==='' ) return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch(e){
            // setError(e);
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        }finally {
            setLoading(false);
        }
    };
    return (
        <Wrapper>
            <Title>Login to1 ❤️</Title>
            <Form onSubmit={onSubmit}>
                <Input name="email" value={email} placeholder="Email" onChange={onChange} type="email" required />
                <Input name="password" value={password} placeholder="Password" onChange={onChange} type="password" required />
                <Input type="submit" value={ isLoading ? "Loading..." : "Log in"} />
            </Form>
            { error !== "" ? <Error>{error}</Error> : null }
            <Switcher>회원이 아니신가요? <Link to="/create-account">Join</Link></Switcher>
            <GithubButton />
        </Wrapper>
    );
}