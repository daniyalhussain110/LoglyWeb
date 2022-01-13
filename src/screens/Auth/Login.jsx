import React from 'react'
import '../../customcss/custom.css'
import { Form, Input, Button, Checkbox, Row, Col, Card  } from 'antd';
import { UserOutlined, LockOutlined, MailFilled, LockFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
    return (
        <>
           <section id='img-bg'>
                <div className='overlay'>
                <div className='bone-bg'>
                <h1 className='logo'>LOGLY</h1>
                <div className='container'>
                    <div className='row displays-flexs'>
                        <div className='col-12 col-md-6'>

                        </div>
                        <div className='col-12 col-md-6 inputs'>
                        <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                            <h1 className='bold reg-acc'>Welcome,</h1>
                            <p className='f-size reg-get'>Let's Get Started</p>
                            {/* <form action="">
                              <div className='form-group'>
                                <div className='col-12 col-md-6'>
                                  <input className='form-control' type="text" placeholder='Email' />
                                </div>
                              </div>

                              <div className='form-group mt-3'>
                                <div className='col-12 col-md-6'>
                                  <input className='form-control' type="text" placeholder='Password' />
                                </div>
                              </div>
                            </form> */}

<Form
      name="basic"
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      className='mt-5'
      autoComplete="off"
    >
      <Form.Item
      className='form-text'
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input className='forms' prefix={<i class="fas fa-envelope"></i>} placeholder=' Email'/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password className='forms ' prefix={<i class="fas fa-lock"></i>} placeholder=' Password' />
      </Form.Item>

     <div className='row'>
       <div className='col-12 col-md-3'>
       <Form.Item className='remember' name="remember" >
        <Checkbox className='remember-me'>Remember me</Checkbox>
      </Form.Item>
       </div>
      
      <div className='col-12 col-md-3'>
        <span><Link to='/forgotpassword' className=' forgot'>Forgotpassword?</Link></span>
      </div>
      </div>
      <Form.Item>
        <Button className='btn-bg-color mt-5' type="primary" htmlType="submit" block>
          <Link to="/welcome">LOGIN</Link>
        </Button>
      </Form.Item>
    </Form>
    <div className='login ms-1'>
      <span className='s-f'>Don't Have an account yet? <Link to='/register' className='color-link'>Register Here</Link></span>
    </div>
    </motion.div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
           </section>
        </>
    )
}
