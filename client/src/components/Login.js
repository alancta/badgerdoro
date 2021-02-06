import React, { Fragment,useState } from "react";
import {Link} from "react-router-dom"
import LoginIcon from "./images/LoginIcon"
import {Container,Row,Col,Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";


const Login = ({setAuth})=>{

    const [inputs,setInputs] = useState({
        email:"",
        password:""
    });

    const {email, password } = inputs;

    const onChange = (e) => {
        setInputs({...inputs,[e.target.name] : e.target.value});
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            

            const body = {email,password};
            
            const response = await fetch("http://localhost:5000/auth/login",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(body)});

            const parseRes = await response.json();

            if(parseRes.token){
                localStorage.setItem("token",parseRes.token);
                setAuth(true);
                // toast.success("login successfully!");
            }else{
                setAuth(false);
                toast.warning("❌ Invalid email or password. Please try again!");
            }
            

        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <div class="area container-fluid">
            <Container><Row class=""><Col><Link  to="/" ><h3 class="text-white text-center">Badgerdoro</h3></Link></Col></Row>
            <Row className="mt-4"><Col><h1 class="text-center text-black">Login</h1></Col></Row></Container>
            
            <Container className="pt-5">
            <Row className="justify-content-center">
            
                <Col xs={10}><LoginIcon class=""/></Col>
                
            </Row>
            </Container>
            
            <Form onSubmit={onSubmitForm} className="mt-4">
                <Form.Row className="justify-content-center"><Col xs={8}>
                <Form.Control type="email" name="email" placeholder="email" value={email} onChange={e=>onChange(e)}></Form.Control></Col></Form.Row>
                <Form.Row className="justify-content-center mt-2"><Col xs={8}><Form.Control  type="password" name="password" placeholder="password" value={password} onChange={e=>onChange(e)}></Form.Control></Col></Form.Row>
                <Row className="justify-content-center mt-4"><Col xs={6}><button className="text-white btn  btn-block border border-white bg-secondary "> Login</button></Col></Row>
                


            </Form>
            <ToastContainer bodyClassName="text-dark"/>
            <div class="text-center  pt-2"><Link  to="/register" class="text-dark hover-underline">New user? Click here to register.</Link></div>
            
        </div>
        


        
    );
};

export default Login;
