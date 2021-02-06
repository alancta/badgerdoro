import "./Dashboard.css"
import React, { Fragment ,useEffect,useState} from "react";
import {Container,Row,Col} from 'react-bootstrap';
import UserIcon from './images/user';
import WalletIcon from './images/wallet.png';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Timer from './Timer';
const Dashboard = ({setAuth})=>{
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[email,setEmail] = useState("");
    const[badgerbucksvalue,setBadgerbucks] = useState(0);

    async function getNameAndReward(){
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method:"GET",
                headers: {"token": localStorage.token}
            });

            const parseRes = await response.json();

            setFirstName(parseRes.user_firstname);
            setLastName(parseRes.user_lastname);
            setEmail(parseRes.user_email);
            setBadgerbucks(parseRes.badgerbucks);
        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    const logoutPopover = (
        <Popover id="popover-basic" >
          <Popover.Content>
              {firstName} {lastName} <br></br> {email}<br></br> 
          <button className="btn btn-danger mt-4" onClick={e=> logout(e)}>Logout</button>
    </Popover.Content>
        </Popover>
      );


    const addBadgerBucks = async () => {

        // setBadgerbucks(badgerbucksvalue+100);
        const badgerbucks = 100;
        const body = {email,badgerbucks};
        try {
            const response = await fetch("http://localhost:5000/reward/",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });

            // const parseRes = await response.json();
            
            // setBadgerbucks(parseRes.badgerbucks);
        } catch (error) {
            console.error(error.message)
        }

        
    };




    useEffect(() => {
        getNameAndReward();
    });



    return(
        <div className="color vh-100" >
        <Fragment >
            <Container className="mt-4 mb-lg-4 container-fluid">
                <Row>
                    <Col xs={10} lg={11}><h2 class="text-danger">Dashboard</h2></Col>
                    <Col xs={2} lg={1}><OverlayTrigger  trigger="click" key="left" placement="left" overlay={logoutPopover}>
                    <Button variant="outline-dark" ><UserIcon class="w-100"/></Button>
  </OverlayTrigger></Col>
                </Row>

                </Container>
                <Container className="mt-4 mt-lg-5">
                    <Row>
                        <Col xs={12}><Timer addBadgerBucks={addBadgerBucks}/></Col>
                    </Row>
                    <Row className="mt-4 justify-content-center">
                        <Col xs={12} lg={5}><div class="card bg-light border  border-2 rounded rounded-3"><div class="card-body">
                            <h6 class="card-title text-center text-danger">Your Rewards</h6>
                            <div class="d-flex justify-content-center"><img src={WalletIcon} class="w-25" alt="wallet icon" /><h4 class="px-4 py-4 card-text text-center text-danger">BB {badgerbucksvalue}</h4></div>
                            
                            </div></div></Col>
                            
                    </Row>
                </Container>

        </Fragment>
        </div>
    );
};

export default Dashboard;
