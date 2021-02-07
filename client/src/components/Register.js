import React, { useState,Fragment } from "react";
import {Link} from "react-router-dom"
import {Container,Row,Col,Form} from 'react-bootstrap';
import RegisterIcon from "./images/RegisterIcon"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Register.css"

toast.configure()
const Register = ({setAuth})=>{

    const [inputs,setInputs ] = useState({
        email:"",
        password:"",
        firstName: "",
        lastName:""
    });

    const {email,password,firstName,lastName} = inputs;

    const onChange = (e) => {
        setInputs({...inputs,[e.target.name] : e.target.value});
    };


    
    const onSubmitForm =async(e) =>{
        e.preventDefault();

        try {

            const body = {email,password,firstName,lastName};

                const response = await fetch("http://localhost:5000/auth/register",{
                    method: "POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(body)});
        
                    const parseRes = await response.json();

                    console.log(parseRes)
                    if(parseRes==="Invalid Password"){
                        toast.dark(" ⚠️ Password must be between 6-20 char which contain at least one numeric digit, one uppercase, and one lowercase")
                    }
                    else if(parseRes==="Invalid Email"){
                        toast.dark("⚠️ Please enter the correct email address!")
                    }
                    else if(parseRes==="User already exists"){
                        toast.dark("⚠️ User already exists. Please login if you have created an account.")
                    }
                    else if(parseRes==="Missing Credentials"){
                        toast.dark(" ⚠️ Please enter all info!")
                    }else{
                        
                        localStorage.setItem("token",parseRes.token);
                        setAuth(true);
                    }
     
        } catch (error) {
            console.error(error.message)
        }
    }
    return(
        <div class="area container-fluid">
            <Container><Row class=""><Col><Link  to="/" ><h3 class="text-white text-center">Badgerdoro</h3></Link></Col></Row>
            <Row className="mt-4"><Col><h1 className = "text-center">Register</h1></Col></Row></Container>
        

        <Row className="justify-content-center">
            <Col xs={10}><RegisterIcon /></Col>
        </Row>

        <Form onSubmit={onSubmitForm} className="mt-4">
                <Form.Row className="justify-content-center"><Col xs={3} className="text-white">Email</Col><Col xs={7}>
                <Form.Control type="email" name="email" placeholder="bucky@gmail.com" value={email} onChange={e=>onChange(e)}></Form.Control></Col></Form.Row>
                <Form.Row className="justify-content-center mt-2"><Col xs={3} className="text-white">Password</Col><Col xs={7}><Form.Control  type="password" name="password" placeholder="@Bucky1940" value={password} onChange={e=>onChange(e)}></Form.Control></Col></Form.Row>
                <Form.Row className="justify-content-center mt-2"><Col xs={3} className="text-white">First Name</Col><Col xs={7}><Form.Control  type="name" name="firstName" placeholder="Buckingham" value={firstName} onkeyup="this.value = this.value.toUpperCase();" onChange={e=>onChange(e)}></Form.Control></Col></Form.Row>
                <Form.Row className="justify-content-center mt-2"><Col xs={3} className="text-white">Last Name</Col><Col xs={7}><Form.Control  type="name" name="lastName" placeholder="Badger" value={lastName} onkeyup="this.value = this.value.toUpperCase();" onChange={e=>onChange(e)}></Form.Control></Col></Form.Row>
                <Row className="justify-content-center mt-4"><Col xs={6}><button className="btn btn-success btn-block" >Submit</button></Col></Row>
                


            </Form>
            <ToastContainer  bodyClassName="text-white"/>
            <div class="text-center mt-2"><Link to="/login" class=" text-dark">Already have an account? Click to login.</Link></div>
            


        

        </div>
    );
};

export default Register;