import React, { useState } from 'react'
import '../../customcss/custom.css'
import { Form, Input, Button, Checkbox, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined, MailFilled, LockFilled, CheckCircleFilled } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion';
import Logo from '../../assets/images/logo-logly.png'


export default function WelcomeScreen() {
    const [toggleCard, setToggleCard] = useState("businessServiceProvider")
    
 
    const toggleButton = (index) => {
        setToggleCard(index)
        console.log(index)
    }

    const Status = () => {
        if(toggleCard === "petLover") {
            window.location.href = "/petlover"
        }
        else if(toggleCard === "businessServiceProvider") {
            window.location.href = "/businessprovider" 
        }
        else if(toggleCard === "businessAccount") {
            window.location.href = "/businessaccount" 
        }
        else if(toggleCard === "charityAccount") {
            window.location.href = "/charityaccount" 
        }
        else if(toggleCard === "businessListing") {
            window.location.href = "/businesslisting" 
        }
        else {
            
        }

    }


     
    return (
        <div>
            <section id='img-bg'>
            <div className='overlay'>
            <div className='bone-bg'>
            <h1 className='logo'></h1>
                <div className='container mt-5 py-5'>
                    <div className='row justify-content-center'>
                        <div className='col-12 col-md-3'>
                        
                        </div>
                        <div className='col-12 col-md-3'>
                        <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                        >
                        <h1 className='bold'>Welcome,</h1>
                            <p className='f-size'>Let's Get Started</p>

                              
                                <Button onClick={() => toggleButton("petLover")} className={(toggleCard === "petLover" ? 'active-list'  : 'inActive-list') + ' mt-4 fonts-sizes'} type="primary" block> Pet Lover 

                                    <span className='text-right'>25463810</span>
                                </Button> 
                               
                                <Button onClick={() => toggleButton("businessServiceProvider")} className={(toggleCard === "businessServiceProvider" ? 'active-list' : 'inActive-list') + ' mt-4 fonts-sizes'} type="primary" block>Business Service Provider  <span className='text-right'>25463810 </span></Button> 

                                <Button onClick={() => toggleButton("businessAccount")} className={(toggleCard === "businessAccount" ? 'active-list' : 'inActive-list') + ' mt-4 fonts-sizes'} type="primary" block>Business Account  <span className='text-right'>25463810</span></Button> 

                                <Button onClick={() => toggleButton("charityAccount")} className={(toggleCard === "charityAccount" ? 'active-list' : 'inActive-list') + ' mt-4 fonts-sizes'} type="primary" block>Charity Account  <span className='text-right'>25463810</span></Button> 

                                <Button onClick={() => toggleButton("businessListing")} className={(toggleCard === "businessListing" ? 'active-list' : 'inActive-list') + ' mt-4 fonts-sizes'} type="primary" block>Business Listing  <span className='text-right'>25463810</span></Button> 
                          
                                <Button  className='btn-bg mt-4 fonts-sizes' type="primary"><Link to="/" className="text-white">BACK</Link></Button> 
                               
                                <Button onClick={Status} className='btn-bg mt-4 btn-col-width fonts-sizes col-8 ms-3' type="primary">CONTINUE  <i className="fas fa-arrow-circle-right ml"></i></Button>
                            
                        </motion.div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                <img src={Logo} alt="" className='float-right'  height="100" />
            </section>
        </div>
    )
}
