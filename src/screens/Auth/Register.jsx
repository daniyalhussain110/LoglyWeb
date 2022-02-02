import React, {useState, useEffect} from 'react'
import '../../customcss/custom.css'
import { Form, Input, Button, Select, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailFilled, LockFilled, PhoneFilled, FlagFilled, } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom'
import {TransitionGroup, CSSTransition } from 'react-transition-group';
import { motion } from 'framer-motion';
import { Icon } from '@ant-design/icons'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Logo from '../../assets/images/logo-logly.png'
import { getCities, getStates, getZipCode } from '../../store/Actions/Action';
import { userRegister } from '../../store/Actions/UserAction'
import { connect, useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../Api/AxiosCreate';


const { Option } = Select;


 export default function Register() {
  const [value, setValue] = useState()

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zipcode: '',
    password: ''
  })

  const {name, email, phone, city, state, zipcode, password} = data

  const dispatch = useDispatch();

  const history = useHistory()

  const HandleOnChangeinput = e => {
    const newData = {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  const states = useSelector((state) => state.myState.states)
  const cities = useSelector((state) => state.myCities.cities)
  const zipcodes = useSelector((state) => state.myZipCode.zipcodes)

 
  useEffect(() => {
    dispatch(getCities())
    dispatch(getStates())
    dispatch(getZipCode())

  }, [])

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('zipcode', zipcode)
    formData.append('password', password)

    dispatch(userRegister(formData))

    console.log(formData)

    }
   
  
    return (
      
        <>
             <section id='img-bg'>
                <div className='overlay'>
                <div className='bone-bg'>
                <h1 className='logo'></h1>
                <div className='container mt-5 py-3 '>
                    <div className='row displays-flexs'>
                        <div className='col-12 col-md-6'>
                        
                        </div>
            
                        <div className='col-12 col-md-6 marg-top'>
                        <motion.div
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          exit={{opacity: 0}}
          >
                            <h1 className='bold f-s reg-acc'>Register Account</h1>
                            <p className='f-size reg-get'>Let's Get Registered</p>
                            <Form
      name="basic"
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      className='formes'
      autoComplete="off"
      
    >
      <Form.Item
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input id='name' onChange={HandleOnChangeinput} value={name} autoComplete='off' className="forms" prefix={<i className="fas fa-user"></i>} placeholder=" Enter Name" />
      </Form.Item>
    
      <Form.Item
        rules={[
          { 
            required: true,
            message: 'Please input your email!' 
          },

          {
            pattern: new RegExp(/\S+@\S+\.\S+/),
            message: 'please enter valid email'
          }
        ]}
     
      >
        <Input id='email' onChange={HandleOnChangeinput} value={email} autoComplete='off' className="forms" prefix={<i className="fas fa-envelope"></i>} placeholder=" Enter Email" />
      </Form.Item>
  
      <Form.Item
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input id='phone' value={phone} onChange={HandleOnChangeinput} className="forms" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}  prefix={<i className="fas fa-phone"></i>} placeholder=" Enter Phone" />
      </Form.Item>

      <Form.Item
       
        rules={[{ required: true, message: 'Please input your state!' }]}
      >
      <Select id='state' onChange={HandleOnChangeinput} value={state} className="forms" defaultValue="Select State">
        {states.map((state) => (
          <Option value={state.name}>{state.name}</Option>
        ))}
    </Select>
    </Form.Item>

      <Form.Item
       
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
      <Select id='city' value={city} onChange={HandleOnChangeinput} Icon={<FlagFilled />} className="forms" defaultValue="Select City" >
        {cities.map((city) => (
            <Option value={city.name}>{city.name}</Option>
        
        ))}
                
    </Select>
    </Form.Item>

      


      <Form.Item
       
        rules={[{ required: true, message: 'Please input your zipcode!' }]}
      >
        <Select id='zipcode' value={zipcode} onChange={HandleOnChangeinput} className="forms" defaultValue="Select Zip Code">
           {zipcodes.map((zip) => (
            <Option value={zip.zipcode}>{zip.zipcode}</Option>
          ))} 
        </Select>
      </Form.Item>

      <Form.Item
      rules={[
        { 
          required: true, 
          message: 'Please input your password!' 
        },

        {
          min: 6,
          message: 'Password must be minimum 6 characters.'
        },

        {
          max: 8,
          message: 'Password must be minimum 8 characters.'
        },
        
        {
          pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
          message: "Password must have 1 upper case, 1 lower case character and 1 number",
        }

      ]}
    
      >
        <Input.Password id='password' onChange={HandleOnChangeinput} value={password} autoComplete='off' className="forms" prefix={<i className="fas fa-lock"></i>} placeholder=" Password" />
      </Form.Item>
            
      <Form.Item name="remember" >
        <Checkbox className='remember-me'><span className="s-f">I accept the <span className='color-link'>Term Of Use</span> and <span className='color-link'>Privacy policy</span></span></Checkbox>
      </Form.Item>

        <div className='row'>
          <div className='col-12 col-md-2'>
            <Button className="btn-bg-color" type="primary" htmlType="submit" block>
                <Link to="/">BACK</Link> 
            </Button>
          </div>
          <div className='col-12 col-md-4'>
          <Form.Item>
            <Link to="/pricelist">
              <Button  className="btn-bg-color buttons" type="primary" htmlType="submit" block>
                    
                      CONTINUE <i className="fas fa-arrow-circle-right"></i>
                  
              </Button>
            </Link>
            </Form.Item>
          </div>
        </div>
      <ToastContainer />
    </Form>
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




