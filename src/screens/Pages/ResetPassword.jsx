import React,{ useState } from 'react'
import Logo from '../../assets/images/logo-logly.png'
import { Card, Input, Button, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import key from '../../assets/images/key.png'
import { motion } from 'framer-motion';
import '../../customcss/custom.css'
import { useHistory } from 'react-router-dom'

export default function ResetPassword() {

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    let history = useHistory()

    const updatePassword = e => {
        if(newPassword === '' || confirmPassword === '') {
            message.error('Please Fill Out All Fields')  
        } else if(newPassword !== confirmPassword) {    
            message.error("Password Does'nt match")
        } else {
            history.push('/successpassword')
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
                                <img src={key} alt="" className='img-fluid width-sm' />
                            <h4 className=' text-center mt-3 fw-bolder'>Enter New Password</h4>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-12 col-md-6 mt-3'>
                                    
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password onChange={e => setNewPassword(e.target.value)} autoComplete='off' className='forms input' prefix={<i className="fas fa-lock"></i>} placeholder=' New Password' />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirmpassword"
                                        rules={[{ required: true, message: 'Please input your confirm password!' }]}
                                    >
                                        <Input.Password onChange={e => setConfirmPassword(e.target.value)} autoComplete='off' className='forms input' prefix={<i className="fas fa-lock"></i>} placeholder=' Confirm Password' />
                                    </Form.Item>
                                    
                                    </div>
                                </div>
                            </div>
                          
                                <Button onClick={updatePassword} type='primary mt-5 btn-bg col-5'>UPDATE </Button>
                                
                                
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
