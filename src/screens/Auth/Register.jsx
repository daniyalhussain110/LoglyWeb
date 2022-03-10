import React, {useState, useEffect} from 'react'
import '../../customcss/custom.css'
import { Form, Input, Button, Select, Checkbox, Row, Col, Empty, message, Popconfirm } from 'antd';
import { UserOutlined, LockOutlined, MailFilled, LockFilled, PhoneFilled, FlagFilled, } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom'
import {TransitionGroup, CSSTransition } from 'react-transition-group';
import { motion } from 'framer-motion';
import { Icon } from '@ant-design/icons'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Logo from '../../assets/images/logo-logly.png'
import { getCities, getStates, getZipCode } from '../../store/Actions/Action';
import { userRegister,emailCheckRequest } from '../../store/Actions/UserAction'

import { connect, useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../Api/AxiosCreate';
import { history } from '../../App';

const { Option } = Select;

 export default function Register(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [password, setPassword] = useState('')
  const [formerror, setFormError] = useState({})
  const [term, setTerm ] = useState(false)
  const [agree, setAgree] = useState('')
 

  const[cities,setCities]= useState([])
  const[states,setStatesList]= useState([])
  const[zipcodes,setZipcodes]= useState([])

  const dispatch = useDispatch();

  let history = useHistory()

  console.log(props)


 const checkedTerm = (e) => {
    if(!term) {
      alert('Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy')
      setTerm(!term)
    } else {
      console.log('')
    }
 }

  useEffect(() => {
    dispatch(getStates()).then((values)=>{
      setStatesList(values)
    })
  }, [])


  const stateChange = (value, e) => {
    setState(value)
    setCities([])
    setZipcodes([])
    setCity('')
    setZipcode('')
    if(value) {
      let id = states.filter((state) => state.name === value)[0].id
      dispatch(getCities(id)).then((values)=>{
        setCities(values)
      })
    }
    
  }

  const cityChange = (value, e) => {
    
    if(value) {
      let city = cities.filter((id) => id.name === value)[0].name
      console.log(city)
      setCity(value)
      setZipcode('')
      dispatch(getZipCode(city)).then((values) => {
        setZipcodes(values)
      })
    }
  }

  const zipChange = (value, e) => {
    console.log(value)
    setZipcode(value)
  }

  const submit = async (e) => {
    setFormError(validate())
    e.preventDefault();
      const params = {
        "name": name,
          "email": email,
          "password": password,
          "phone": phone, 
          // "website": "https://google.com",
          // "mobile": true,
          // "packageType": "Individual",
          "state":state,
          "city":city,
          "zipcode":zipcode,
          "mobile":true,
      }
      dispatch(emailCheckRequest(email)).then(res=>{
        if(res){
        localStorage.setItem('user', JSON.stringify(params))
        history.push('/pricelist')
        }
      })
        
        
    }

    const validate = () => {
      const error = {}
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
      const nameRegex = /^[a-zA-Z0-9 ]+$/i;
      if(!name) {
        error.name = "Name Field is Required"
      } else if(!nameRegex.test(name)) {
        error.name = "numbers and special characters not allowed"
      }
      if(!email) {
        error.email = "Email Field is Required"
      } else if(!regex.test(email)) {
        error.email = 'This is not a valid email format!'
      }

      if(!phone) {
        error.phone = "Phone Field is Required"
      } else if(!phoneRegex.test(phone)) {
        error.phone = "Phone Number atleast 10 Characters"
      }

      if(!state) {
        error.state = "State Field is Required"
      }

      if(!city) {
        error.city = "City Field is Required"
      }

      if(!zipcode) {
        error.zipcode = "Zipcode Field is Required"
      }

      if(!password) {
        error.password = 'Password Field is required'
      }
       else if(password.length < 8) {
        error.password = "Password must be more than 8 characters";
       }
       return error;
  
    }

    const onSearch = (val) => {
      console.log('search:', val);
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
      >
        <Input onChange={e => setName(e.target.value)}  autoComplete='off' className="forms" prefix={<i className="fas fa-user"></i>} placeholder=" Enter Name" />
        <span className='text-danger'>{formerror.name}</span>
      </Form.Item>
    
      <Form.Item
      >
        <Input onChange={e => setEmail(e.target.value)}  autoComplete='off' className="forms" prefix={<i className="fas fa-envelope"></i>} placeholder=" Enter Email" />
        <span className='text-danger'>{formerror.email}</span>
      </Form.Item>
       
      <Form.Item
      >
        <Input maxLength={10} onChange={e => setPhone(e.target.value)} className="forms" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}  prefix={<i className="fas fa-phone"></i>} placeholder=" Enter Phone" />
         <span className='text-danger'>{formerror.phone}</span>
      </Form.Item>

      <Form.Item
      
      >
      <Select onChange={stateChange}  className="forms" defaultValue='Select State' 
       showSearch
       placeholder="Select a person"
       optionFilterProp="children"
       onSearch={onSearch}
       filterOption={(input, option) =>
         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
       }
      
      >
        {states.map((state) => (
          <Option value={state.name} key={state.id}>{state.name}</Option>
        ))}
    </Select>
    <span className='text-danger'>{formerror.state}</span>
    </Form.Item>

      <Form.Item
            
      >
      <Select onChange={cityChange} className="forms" value={city?city:'Select City'} 
       showSearch
       placeholder="Select a person"
       optionFilterProp="children"
       onSearch={onSearch}
       filterOption={(input, option) =>
         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
       }
      >
        {cities.map((city) => (
            <Option value={city.name} key={city.id}>{city.name}</Option>
        ))}
                
    </Select>
    <span className='text-danger'>{formerror.city}</span>
    </Form.Item>

      <Form.Item

      >
        <Select onChange={zipChange} className="forms"  value={zipcode?zipcode:'Select Zip Code'} 
           showSearch
           placeholder="Select a person"
           optionFilterProp="children"
           onSearch={onSearch}
           filterOption={(input, option) =>
             option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
           }
        >
           {zipcodes.map((zip) => (
            <Option value={zip.zipcode} key={zip.id}>{zip.zipcode}</Option>
          ))} 
        </Select>
        <span className='text-danger'>{formerror.zipcode}</span>
      </Form.Item>

      <Form.Item
    
      >
        <Input.Password  onChange={e => setPassword(e.target.value)}  autoComplete='off' className="forms" prefix={<i className="fas fa-lock"></i>} placeholder=" Password" />
        <span className='text-danger'>{formerror.password}</span>
      </Form.Item>
            
      <Form.Item name="remember" >
     
          <Checkbox onClick={checkedTerm} className='remember-me'><span className="s-f">I accept the <span className='color-link'>Term Of Use</span> and <span className='color-link'>Privacy policy</span></span>
          </Checkbox>
      
       
      </Form.Item>

        <div className='row'>
          <div className='col-12 col-md-2'>
            <Button className="btn-bg-color" type="primary" htmlType="submit" block>
                <Link to="/">BACK</Link> 
            </Button>
          </div>
          <div className='col-12 col-md-4'>
          <Form.Item>
           
              <Button  disabled={!name || !email || !phone || !state || !city || !zipcode || !password || !term} onClick={submit} className="btn-bg-color buttons" type="primary" htmlType="submit" block>
                    
                      CONTINUE <i className="ms-1 fas fa-arrow-circle-right"></i>
                  
              </Button>
         
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




