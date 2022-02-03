import React, { useState } from 'react'
import Logo from '../../assets/images/logo-logly.png'
import { Card, Input, Button, Form, Radio  } from 'antd';
import { Link } from 'react-router-dom';
import Mail from '../../assets/images/email.png'
import { motion } from 'framer-motion';
import '../../customcss/custom.css'
import { MailFilled } from '@ant-design/icons'
import '../../customcss/custom.css'
import { userForgotPassword } from '../../store/Actions/UserAction';
import { useDispatch } from 'react-redux'

export default function ResetEmailVerification() {
    const [value, setValue] = useState(1)

    const dispatch = useDispatch()

    const [email , setEmail] = useState('')

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

      const forgotPassword = e => {
          e.preventDefault();
          const params = {
              email: email
          }
            dispatch(userForgotPassword(params))
      }
    return (
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
                        <img src={Mail} alt="" className='img-fluid width-sm widths-mail' />
                    <h4 className=' text-center mt-3 fw-bolder'>Verify Your Email</h4>
                    <p >How do you want to get the code to verify your email?</p>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-12 col-md-6 envelope'>
                            
                             <Form.Item
                                        name="email"
                                        rules={[
                                            { 
                                                required: true, 
                                                message: 'please input your Email!' 
                                            },

                                            {
                                                pattern: new RegExp(/\S+@\S+\.\S+/),
                                                message: 'please enter your valid email'
                                            }
                                        ]}
                                        
                                    >
                                        <Input onChange={e => setEmail(e.target.value)} autoComplete='off' className='forms input' prefix={<MailFilled />} placeholder=' Enter Your Email' />
                                    </Form.Item>
                            </div>
                        </div>
                    </div>
                  
                        <Button onClick={forgotPassword} type='primary mt-3 btn-bg col-5'>CONTINUE </Button>
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
    )
}
