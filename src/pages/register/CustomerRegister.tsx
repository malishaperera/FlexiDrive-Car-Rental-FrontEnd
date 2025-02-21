import {useState} from "react";
import {useNavigate} from "react-router";


export default function CustomerRegister(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    return (
        <></>
    )
}