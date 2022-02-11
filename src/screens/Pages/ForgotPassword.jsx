import React, { useState } from 'react'
import Logo from '../../assets/images/logo-logly.png'
import { Card, Input, Button, Form, Radio  } from 'antd';
import { Link } from 'react-router-dom';
import Lock from '../../assets/images/Lock.png'
import { motion } from 'framer-motion';
import '../../customcss/custom.css'
import { resendCodeVerification, forgotPhoneVerification } from '../../store/Actions/UserAction';
import { useDispatch } from 'react-redux'

export default function ForgotPassword(props) {
    const [value, setValue] = useState(1)

    const [email, setEmail] = useState(props.history.location.state.email)
    const [phone, setPhone] = useState(props.history.location.state.phone)
    const [checkedValue, setCheckValue] = useState(null)
    const [sliceEmail, setSliceEmail] = useState(email.slice(0, 3)  + '*****' + email.slice(13, 23))
    const [slicePhone, setSlicePhone] = useState('+16' + '*********' + '00')
    const dispatch = useDispatch();

    // const onChange = e => {
    //     console.log('radio checked', e.target.value);
    //     setValue(e.target.value);
    //   };
    // console.log(props.location.state.dataAnimal.email)

    console.log(email, phone)

    const resendCode = e => {
        e.preventDefault();
        const params = {
            email: email,
            phone: '+16282107500'
        
        }
        console.log(params, checkedValue)
        // dispatch(resendCodeVerification(params))
        if(checkedValue == 1){
            dispatch(resendCodeVerification(params))
        }else if(checkedValue == 2){
            dispatch(forgotPhoneVerification(params))      
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
                                <img src={Lock} alt="" className='img-fluid width-sm' />
                            <h4 className=' text-center mt-3 fw-bolder'>Reset Your Password</h4>
                            <p >How do you want to get the code to reset your password?</p>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-12 col-md-6 envelope'>
                                    <Radio.Group onChange={(e)=> setCheckValue(e.target.value)} value={checkedValue}>
                                        <Radio value={1}  className='radio ms-3'><i className="fas fa-envelope" ></i> <span className='ms-1'>Send code via email</span> <br /> <p className='ms-4'>{sliceEmail}</p></Radio>
                                        <Radio value={2} className='radio mt-3'><i className="fas fa-mobile-alt" ></i><span className='ms-1'> Send code via sms </span> <br /> <p>{slicePhone}</p></Radio>
                                    </Radio.Group>
                                    </div>
                                </div>
                            </div>
                           
                                <Button onClick={resendCode} type='primary mt-5 btn-bg col-5'>CONTINUE </Button>
                                <br />   
                            <Link to="/" className='text-white'>
                                <Button className='mt-3 btns-borders col-4'>CANCEL </Button>   </Link>
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
