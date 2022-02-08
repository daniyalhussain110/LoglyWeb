import React, { useState, useEffect }  from 'react'
import Logo from '../../assets/images/logo-logly.png'
import { Card, Input, Button, Form, Typography, Statistic, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { resetForgetPasswordByCode, userForgotPassword } from '../../store/Actions/UserAction';

const REST_INTERVAL_S = 150;

const formatTime = (time) => 
    `${String(Math.floor(time / 60)).padStart(2)}:${String(
        time % 60
    ).padStart(2)}`;


const Timer = ({ time }) => {
    const timeRemain = REST_INTERVAL_S - (time % REST_INTERVAL_S);
    return (
        <>
            <span>{formatTime(timeRemain)}</span>
        </>
    )
}


export default function OtpVerification() {
    let history = useHistory()
    const [time, setTime] = useState(0);

    const IntervalTimerFunctional = () => {
        useEffect(() => {
            const timeId = setInterval(() => {
                setTime((t) => t + 1);
            }, 1000);
            return () => clearInterval(timeId)
        }, []);
        return <Timer time={time} />;
    }

    const [otp1, setOpt1] = useState('')
    const [otp2, setOpt2] = useState('')
    const [otp3, setOpt3] = useState('')
    const [otp4, setOpt4] = useState('')
    const [otp5, setOpt5] = useState('')
    const [otp6, setOpt6] = useState('')

    const dispatch = useDispatch()


    const otpsubmit = (e) => {
        e.preventDefault();
        
        if(otp1 === '' || otp2 === '' || otp3 === '' || otp4 === '' || otp5 === '' || otp6 === '') {
            message.error('Please Fill Out All Fields')
        } else {
            const params = {
                code:parseInt(otp1.toString()+otp2.toString()+otp3.toString()+otp4.toString()+otp5.toString()+otp6.toString())
            }
    
            dispatch(resetForgetPasswordByCode(params))
        }
    }

  


    const inputfocus = (element) => {
        if(element.key === "Delete" || element.key === "Backspace" ) {
            const next = element.target.tabIndex - 2
            if(next > -1) {
                element.target.form.elements[next].focus();
            }
        } else {
            const next = element.target.tabIndex;
            if (next < 6) {
                console.log("next");
                element.target.form.elements[next].focus()
            }
        }   
    }
    return (
        <>
           <section id='img-bg'>
                <div className='opacity-bg'>
                    <div className='container padds'>
                        <div className='row justify-content-center align-items-center'>
                            <div className='col-12 col-md-8'>
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                            <Card className='text-center opac p-5'>
                            <h4 className=' text-center fw-bolder'>Enter The Verification Code</h4>
                                <p>Please check your email. We
                                sent you a verification code.</p>
                                <div className='d-flex justify-content-center flex-row p-4'>
                                    <Form>
                                        <Input autoComplete='off' onKeyUp={(e) => inputfocus(e)} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} tabIndex="1" onChange={e => setOpt1(e.target.value)}  autoFocus={true} maxLength="1" className='m-1 widths b-r' />
                                        <Input autoComplete='off' onKeyUp={(e) => inputfocus(e)} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} tabIndex="2" onChange={e => setOpt2(e.target.value)}   maxLength="1" className='m-1 widths  b-r' />
                                        <Input autoComplete='off' onKeyUp={(e) => inputfocus(e)} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} tabIndex="3"  onChange={e => setOpt3(e.target.value)}    maxLength="1" className='m-1 widths  b-r' />
                                        <Input autoComplete='off' onKeyUp={(e) => inputfocus(e)} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} tabIndex="4" onChange={e => setOpt4(e.target.value)}   maxLength="1" className='m-1 widths b-r' />
                                        <Input autoComplete='off' onKeyUp={(e) => inputfocus(e)} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} tabIndex="5"  onChange={e => setOpt5(e.target.value)}    maxLength="1" className='m-1 widths b-r' />
                                        <Input autoComplete='off' onKeyUp={(e) => inputfocus(e)} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} tabIndex="6"  onChange={e => setOpt6(e.target.value)}    maxLength="1" className='m-1 widths b-r' />
                                    </Form>
                                </div>
                                <Button className='btn btn-border'>Resend Code <IntervalTimerFunctional /></Button>
                                <br />
                                
                                <Button onClick={otpsubmit} type='primary mt-3 btn-bg col-4'>CONTINUE </Button>
                                <br />
                                <Link to="/">  
                                <Button className='mt-3 btns-borders col-4'>CANCEL </Button>   </Link> 
                                <ToastContainer />
                            </Card>
                            </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={Logo} alt="" className='float-right'  height="100" />
           </section>
        </>
    )
}
