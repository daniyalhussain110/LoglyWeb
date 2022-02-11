import React, { useState, useEffect } from 'react'
import '../../customcss/custom.css'
import { Form, Input, Button, Checkbox, Row, Col, Card, message  } from 'antd';
import { UserOutlined, LockOutlined, MailFilled, LockFilled } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../../assets/images/logo-logly.png'
import { toast, ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';
import { userLogin } from '../../store/Actions/UserAction'
import { useDispatch } from 'react-redux'

export default function Login() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ formerror, setFormError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false)

  const dispatch = useDispatch()
  let history = useHistory()

  const onsubmit = e => {
    e.preventDefault(); 
     setFormError(validate())
     
      const params = {
        email: email,
        password: password,
        "role": "breeder"
      }
      dispatch(userLogin(params))
      setIsSubmit(true)
     
  }

  const rememberMeInput = e => {
    setIsRememberMe(!isRememberMe)
    const user = localStorage.setItem('user', email)
    console.log(user)
  }

  const validate = () => {
    const error = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!email) {
      error.email = "Email is Required"
    } else if(!regex.test(email)) {
      error.email = 'This is not a valid email format!'
    }

    if(!password) {
      error.password = 'Password is required'
    }
     else if(password.length < 8) {
      error.password = "Password must be more than 8 characters";
     }
     return error;

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
      >
        <Input onChange={e => setEmail(e.target.value)}
         autoComplete='off' className='forms' prefix={<i className="fas fa-envelope"></i>} placeholder=' Email'/>
        <span className='text-danger'>{formerror.email}</span>
      </Form.Item>

      <Form.Item

      >
        <Input.Password   onChange={e => setPassword(e.target.value)}
         autoComplete='off'  className='forms ' prefix={<i className="fas fa-lock"></i>} placeholder=' Password' />
         <span  className='text-danger'>{formerror.password}</span>
      </Form.Item>
     
     <div className='row'>
       <div className='col-12 col-md-3'>
       <Form.Item className='remember' name="remember" >
        <Checkbox onChange={rememberMeInput} name='rememberMe'  className='remember-me'>Remember me</Checkbox>
      </Form.Item>
       </div>
      
      <div className='col-12 col-md-3'>
        <span><Link to='/resetEmailVerification' className='forgot'>&nbsp;&nbsp;&nbsp;&nbsp;Forgot password?</Link></span>
      </div>
      </div>
      <Form.Item>
        <Button  onClick={onsubmit} className='btn-bg-color mt-5' type="primary" htmlType="submit" block>
            LOGIN
        </Button>
      </Form.Item>
      <ToastContainer />
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

