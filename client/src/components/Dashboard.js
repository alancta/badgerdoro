import React, { Fragment ,useEffect,useState} from "react";
import {Container,Row,Col} from 'react-bootstrap';
import UserIcon from './images/user'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'

const Dashboard = ({setAuth})=>{
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[badgerbucks,setBadgerbucks] = useState("");

    async function getNameAndReward(){
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method:"GET",
                headers: {"token": localStorage.token}
            });

            const parseRes = await response.json();

            setName(parseRes.user_name);
            setEmail(parseRes.user_email);
            setBadgerbucks(parseRes.badgerbucks);
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getNameAndReward();
    },[]);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    const logoutPopover = (
        <Popover id="popover-basic" >
          <Popover.Content>
              {name} <br></br> {email}<br></br> 
          <button className="btn btn-danger mt-4" onClick={e=> logout(e)}>Logout</button>
    </Popover.Content>
        </Popover>
      );

    return(
        <Fragment>
            <Container className="mt-4 container-fluid">
                <Row>
                    <Col xs={9} ><h2>Dashboard</h2></Col>
                    <Col xs={3}><OverlayTrigger  trigger="click" key="left" placement="left" overlay={logoutPopover}>
                    <Button variant="outline-dark" ><UserIcon class="w-100"/></Button>
  </OverlayTrigger></Col>
                </Row>

                </Container>

            <div></div>
        

        </Fragment>
    );
};

export default Dashboard;
