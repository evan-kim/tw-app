import { useState } from "react";
import styled from "styled-components"

const Form = styled.form`
    display:flex;flex-direction:column;gap:10px;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding:20px;
    border-radius:20px;
    font-size:16px;
    color:white;
    background-color: black;
    width:100%;
    resize:none;
    &::placeholder {
        font-size:16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    &:focus {
        outline:none;
        border-color:#1d9bf0;
    }
`;

const AttachFileButton = styled.label`
    padding:10px 0;
    color:#1d9bf0;
    text-align:center;
    border-radius:20px;
    border:1px solid #1d9bf0;
    font-size:14px;
    font-weight:600;
    cursor:pointer;
`;

const AttachFileInput = styled.input`
    display:none;
`;

const SubmitBtn = styled(AttachFileButton)`
    border:none;
    background-color: #1d9bf0;
    color:white;
    font-size:16px;
    &:hover,
    &:active {
        opacity:0.9;
    }
`;

export default function PostTweetForm(){
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { files } = e.target;
        if(files && files.length ===1){
            setFile(files[0]);
        }
    }

    return (
        <Form>
            <TextArea onChange={onChange} value={tweet} rows={5} maxLength={180} placeholder="What is happening?!"/>
            <AttachFileButton htmlFor="file">{ file ? "Photo added💕" : "Add photo"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>
            <SubmitBtn as="input" type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>
        </Form>
    )
}