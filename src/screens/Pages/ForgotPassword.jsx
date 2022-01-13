import React, { useState } from 'react'
import Logo from '../../assets/images/logo-logly.png'
import { Card, Input, Button, Form, Radio  } from 'antd';
import { Link } from 'react-router-dom';
import Lock from '../../assets/images/Lock.png'
import { motion } from 'framer-motion';
import '../../customcss/custom.css'

export default function ForgotPassword() {
    const [value, setValue] = useState(1)

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

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
                                    <Radio.Group onChange={onChange} value={value}>
                                        <Radio className='radio ms-3' value={1}><i className="fas fa-envelope"></i> <span className='ms-1'>Send code via email</span> <br /> <p className='ms-4'>qwe*****@g****.com</p></Radio>
                                        <Radio value={2} className='radio mt-3'><i className="fas fa-mobile-alt"></i><span className='ms-1'> Send code via sms </span> <br /> <p>+12*********26</p></Radio>
                                    </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <Link to="/otp" className='text-white'>
                                <Button type='primary mt-5 btn-bg col-5'>CONTINUE </Button></Link>
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
