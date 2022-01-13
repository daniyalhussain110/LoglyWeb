import React from 'react'
import '../../customcss/custom.css'
import { Form, Input, Button, Select, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailFilled, LockFilled, PhoneFilled, FlagFilled, } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {TransitionGroup, CSSTransition } from 'react-transition-group';
import { motion } from 'framer-motion';
import { Icon } from '@ant-design/icons'


const { Option } = Select;

export default function Register() {
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
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      className='formes'
      autoComplete="off"
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
        
      >
        <Input className="forms" prefix={<i class="fas fa-user"></i>} placeholder=" Enter Name" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input className="forms" prefix={<i class="fas fa-envelope"></i>} placeholder=" Enter Email" />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input className="forms"  prefix={<i class="fas fa-phone-alt"></i>} placeholder=" Enter Phone" />
      </Form.Item>

      <Form.Item
        name="state"
        rules={[{ required: true, message: 'Please input your state!' }]}
      >
      <Select  className="forms" defaultValue="Select State">
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    </Form.Item>

    <Form.Item
        name="city"
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
      <Select className="forms" defaultValue="Select City" >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    </Form.Item>
    

      <Form.Item
        name="zipcode"
        rules={[{ required: true, message: 'Please input your zipcode!' }]}
      >
        <Input className="forms"  prefix={<i class="fas fa-map-marker-alt"></i>} placeholder=" Zip Code" />
      </Form.Item>

      <Form.Item
     
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password className="forms" prefix={<i class="fas fa-lock"></i>} placeholder=" Password" />
      </Form.Item>

      <Form.Item name="remember" >
        <Checkbox className='remember-me'><span className="s-f">I accept the <span className='color-link'>Term Of Use</span> and <span className='color-link'>Privacy policy</span></span></Checkbox>
      </Form.Item>

      <Form.Item>
        <Button className="btn-bg-color" type="primary" htmlType="submit" block>
         <Link to="/pricelist">CONTINUE <i class="fas fa-arrow-circle-right"></i></Link> 
        </Button>
      </Form.Item>
    </Form>
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
