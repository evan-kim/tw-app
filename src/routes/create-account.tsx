import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Form, Switcher, Title, Wrapper } from "../components/auth-comp";
import GithubButton from "../components/github-btn";

export default function CreateAccount(){
    const navigate = useNavigate();
    const [ isLoading, setLoading ] = useState(false);
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value} } = e;
        if(name === "name") {
            setName(value);
        }else if(name === "email"){
            setEmail(value);
        }else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if(isLoading || name==='' || email==='' || password==='' ) return;
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
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
            <Title>Join to1 ❤️</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" value={name} placeholder="Name" onChange={onChange} type="text" required />
                <Input name="email" value={email} placeholder="Email" onChange={onChange} type="email" required />
                <Input name="password" value={password} placeholder="Password" onChange={onChange} type="password" required />
                <Input type="submit" value={ isLoading ? "Loading..." : "Create Account"} />
            </Form>
            { error !== "" ? <Error>{error}</Error> : null }
            <Switcher>회원이신가요? <Link to="/login">Login</Link></Switcher>
            <GithubButton />
        </Wrapper>
    );
}