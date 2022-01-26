import React, { useState } from 'react'
import '../../customcss/custom.css'
import { Form, Input, Button, Checkbox, Row, Col, Card  } from 'antd';
import { UserOutlined, LockOutlined, MailFilled, LockFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../../assets/images/logo-logly.png'
import { toast, ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';
import { userLogin } from '../../store/Actions/UserAction'
import { useDispatch } from 'react-redux'

export default function Login() {
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("")
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [msg, setMsg] = useState("")
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = loginData

  const dispatch = useDispatch()

  const onChangeHandleInput = e => {
    setLoginData({...loginData, [e.target.value]: e.target.name})
  }

  const onsubmit = e => {
    e.preventDefault();
    dispatch(userLogin(loginData))
    console.log(loginData)

  }

    return (
        <>
           <section id='img-bg'>
                <div className='overlay'>
                <div className='bone-bg'>
                <h1 className='logo'></h1>
             
                <div className='container mt-5 py-5'>
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
                      
<Form
      name="basic"
      wrapperCol={{ span: 11}}
      initialValues={{ remember: true }}
      className='mt-5'
      autoComplete="off"
    >
      <Form.Item
      className='form-text'
        name="email"
        onChange={onChangeHandleInput}
        value={email}
        rules={[
          { 
            required: true,
            message: 'Please input your email!' 
          },
        ]}
      >
        <Input autoComplete='off' className='forms' prefix={<i class="fas fa-envelope"></i>} placeholder=' Email'/>
      </Form.Item>
      <Form.Item
        name="password"
        onChange={onChangeHandleInput}
        value={password}
        rules={[
          { 
            required: true, 
            message: 'Please input your password!' 
          },
        ]}
       
      >
        <Input.Password autoComplete='off'  className='forms ' prefix={<i class="fas fa-lock"></i>} placeholder=' Password' />
      </Form.Item>
     <div className='row'>
       <div className='col-12 col-md-3'>
       <Form.Item className='remember' name="remember" >
        <Checkbox className='remember-me'>Remember me</Checkbox>
      </Form.Item>
       </div>
      
      <div className='col-12 col-md-3'>
        <span><Link to='/resetEmailVerification' className='forgot'>&nbsp;&nbsp;&nbsp;&nbsp;Forgot password?</Link></span>
      </div>
      </div>
      <Form.Item>
        <Button  className='btn-bg-color mt-5' type="primary" htmlType="submit" block>
          <Link to="/welcome">
            LOGIN
          </Link>
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
                <img src={Logo} alt="" className='float-right'  height="100" />
           </section>
        </>
    )
}

// onClick={onsubmit}