import React, {useState} from 'react'
import Logo from '../../assets/images/logo-logly.png'
import { Card, Input, Button, Form, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { ResendVerifyByCode, userVerifyCode } from '../../store/Actions/UserAction';

export default function EmailVerification() {
    let history = useHistory();
    const dispatch = useDispatch()
    const [error, setError] = useState("")
   
    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')
    const [otp5, setOtp5] = useState('')
    const [otp6, setOtp6] = useState('')

    const [otp7, setOtp7] = useState('')
    const [otp8, setOtp8] = useState('')
    const [otp9, setOtp9] = useState('')
    const [otp10, setOtp10] = useState('')
    const [otp11, setOtp11] = useState('')
    const [otp12, setOtp12] = useState('')

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

    const inputfocus1 = (element) => {
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

    const otpsubmit = (e) => {
        e.preventDefault();
        if(otp1 === '' || otp2 === '' || otp3 === '' || otp4 === '' || otp5 === '' || otp6 === '') {
            message.error('Please Fill Out All Fields')
        } else {
            const params = {
                "smscode": parseInt(otp1.toString() + otp2.toString() + otp3.toString() + otp4.toString() + otp5.toString() + otp6.toString()),
               "mobile": parseInt(otp7.toString() + otp8.toString() + otp9.toString() + otp10.toString() + otp11.toString() + otp12.toString())
            }
            dispatch(userVerifyCode(params))
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
                                        <label htmlFor="">Phone Verification</label> <br />
                                        <Input autoComplete='off' onKeyUp={(e) => inputfocus(e)} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} tabIndex="1" onChange={e => setOtp1(e.target.value)}  autoFocus={true} maxLength="1" className='m-1 widths b-r' />
                                        <Input 
                                        autoComplete='off'
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                          tabIndex="2" onChange={e => setOtp2(e.target.value)}  maxLength="1" className='m-1 widths  b-r' />
                                        <Input
                                        autoComplete='off'
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                          tabIndex="3" onChange={e => setOtp3(e.target.value)}  maxLength="1" className='m-1 widths  b-r' />
                                        <Input
                                        autoComplete='off'
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                         tabIndex="4" onChange={e => setOtp4(e.target.value)}  maxLength="1" className='m-1 widths b-r' />
                                        <Input
                                        autoComplete='off'
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                        tabIndex="5" onChange={e => setOtp5(e.target.value)}  maxLength="1" className='m-1 widths b-r' />
                                        <Input
                                        autoComplete='off' 
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                       tabIndex="6" onChange={e => setOtp6(e.target.value)}  maxLength="1" className='m-1 widths b-r' />
                                    </Form>
                                  
                                </div>

                                <div className='d-flex justify-content-center flex-row p-4'>
                                    <Form>
                                    <label htmlFor="">Email Verification</label><br />
                                        <Input autoComplete='off' onKeyUp={(e) => inputfocus(e)} onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} tabIndex="1" onChange={e => setOtp7(e.target.value)}  autoFocus={true} maxLength="1" className='m-1 widths b-r' />
                                        <Input 
                                        autoComplete='off'
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                          tabIndex="2" onChange={e => setOtp8(e.target.value)}  maxLength="1" className='m-1 widths  b-r' />
                                        <Input
                                        autoComplete='off'
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                          tabIndex="3" onChange={e => setOtp9(e.target.value)}  maxLength="1" className='m-1 widths  b-r' />
                                        <Input
                                        autoComplete='off'
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                         tabIndex="4" onChange={e => setOtp10(e.target.value)}  maxLength="1" className='m-1 widths b-r' />
                                        <Input
                                        autoComplete='off'
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                        tabIndex="5" onChange={e => setOtp11(e.target.value)}  maxLength="1" className='m-1 widths b-r' />
                                        <Input
                                        autoComplete='off' 
                                        onKeyUp={(e) => inputfocus(e)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}
                                       tabIndex="6" onChange={e => setOtp12(e.target.value)}  maxLength="1" className='m-1 widths b-r' />
                                    </Form>
                                  
                                </div>

                                <Button className='btn btn-border'>Resend Verification Code</Button>
                                <br />
                                
                                    <Button onClick={otpsubmit} type='primary mt-3 btn-bg col-4'>CONTINUE </Button>
                               
                                <br />
                                <Link to="/registereddetails"> 
                                <Button className='mt-3 btns-borders col-4'>CANCEL </Button>  </Link>  
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
