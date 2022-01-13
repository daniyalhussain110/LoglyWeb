import React, {useState} from 'react'
import { motion } from 'framer-motion'
import { Layout, Card, Radio, Form, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import {
    Typography,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
  } from "@mui/material";

const { Sider } = Layout;

const { Option } = Select;

const { TextArea } = Input;

function getSteps() {
    return [
  
      {
        title: "Account Setup",
        desc: "Please setup your business profile"
      },
  
      {
        title: "Add Category",
        desc: "Add Your Category"
      },

      {
        title: "Add Services",
        desc: "Add Your Services"
      },

      {
        title: "Team Members",
        desc: "Add Team Member"
      }, 
  
      {
        title: "Team Members Added",
        desc: "Add Another Member"
      }, 
    ];
  }


export default function AddBreedingForms() {
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [handle, setHandle] = useState(true)
    const [value, setValue] = useState(1)

    function handleChange(value) {
        console.log(`selected ${value}`);
      }

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

    const handleClick = () => {
      if(handle === false) {
        setHandle(handle)
      }
    }

    const isStepOptional = (step) => {
      return step === 1 || step === 2 || step === 3 || step === 4;
    };
  
    const isStepSkipped = (step) => {
      return skippedSteps.includes(step);
    };
  
 
    const handleNext = () => {
            setActiveStep(activeStep + 1);
            setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));        
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };  
  
    const handleSkip = () => {
      if (!isStepSkipped(activeStep)) {
        setSkippedSteps([...skippedSteps, activeStep]);
      }
      setActiveStep(activeStep + 1);
    };
    return (
        <>
             <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}} 
            >
               <div className='container-fluid g-0 overflow bg-grey'>
               <div className='row  align-items-center'>
                   <div className='col-12 col-md-4'>
              <Sider className='heights'>
                    <div className='container'>
                    <h1 className='text-white pt-4 padding-5'>LOGLY</h1>
                        <div className='row justify-content-center'>
                            <div className='col-12 col-md-9 mt-4'>
                            
                                <h3 className='text-center text-white fw-bolder'>Welcome!</h3>
                                <h6 className='text-center text-white font-h5'>To get started, Please complete your account step</h6>
                                 <div className='ms-5 mt-5'>
                                 <Stepper  activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
              className='text-white'
                variant="caption"
                align="center"
                style={{ display: "inline" }}
              >
               
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>
                <Typography className='text-white' align='left' variant='p'>{step.title}</Typography>
                <p className='text-white text-thick' align='left' variant='p'>{step.desc}</p>
                </StepLabel>
            </Step>
          );
        })}
      </Stepper>
                                </div>
                                <Link to="/">
                                  <Button className='logout' startIcon={<i className="fas fa-sign-out-alt"></i>}>
                                     <Typography style={{textTransform: 'capitalize', fontSize: 18}} > Logout </Typography>
                                  </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                   
                </Sider>
                </div>
                <div className="col-12 col-md-6">
                    <Card className='radius-card p-4 top-card'>
                        <label htmlFor="" className='ms-4'>Service Type *</label>
                        <br />
                        <Radio.Group onChange={onChange} value={value} className='ms-2'> 
                                        <Radio className='radio ms-3' value={1}> <span className='ms-1'>One-Site</span></Radio>
                                        <Radio value={2} className='radio mt-3'><span className='ms-1'>Off-Site</span></Radio>
                                        <Radio value={3} className='radio mt-3'><span className='ms-1'>Both</span></Radio>
                                    </Radio.Group>

                                    <Form
                        name="basic"
     
                        initialValues={{
                          remember: true,
                        }}
                       
                        autoComplete="off"
                    >
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 col-md-6 mt-3'>
                                    <label htmlFor="">Area Of Consultancy *</label>
                                    <Form.Item
                                      name="servicename"
                                      className='place place-radius'
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please input your Services Name!',
                                        },
                                      ]}
                                    >
                                        <Input placeholder='Consultancy' />
                                    </Form.Item>
                                </div>

                                <div className='col-12 col-md-6 mt-3'>
                                    <label htmlFor="">Select Duration *</label>
                                    <Form.Item
                                      name="selectduration"
                                      className='place place-radius'
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please input your email!',
                                        },
                                      ]}
                                    >
                                       <Select defaultValue="lucy"  onChange={handleChange}>
                                            <Option value="jack">30 Mins</Option>
                                            <Option value="lucy">40 Mins</Option>
                                            <Option value="Yiminghe">50 Mins</Option>
                                        </Select>
                                    </Form.Item>


                                </div>

                                <div className='col-12 col-md-6'>
                                    <label htmlFor="">One Site Price *</label>
                                    <Form.Item
                                      name="onesiteprice"
                                      className='place place-radius'
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please input your Price!',
                                        },
                                      ]}
                                    >
                                     <Input placeholder='$99' />
                                    </Form.Item>

                                    
                                </div>
                                <div className='col-12 col-md-12'>
                                    <label htmlFor="">Description *</label>
                                    <Form.Item
                                      name="description"
                                      className='place place-radius'
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please input your Price!',
                                        },
                                      ]}
                                    >
                                     <TextArea rows={4} />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </Form>
                   <div className='container'>
                   <Form.Item
       
       >
      
         <Button  size="small" className='btn-add col-2' type="primary" htmlType="submit" style={{fontSize: 12, textTransform: 'capitalize'}}>
           Add
         </Button>
         <Button size="small" className='btn-cancel col-2 float-right'  style={{fontSize: 12, textTransform: 'capitalize'}}>
           cancel
         </Button>
       </Form.Item>
                   </div>
                    </Card>
                    
                </div>
                </div>
                </div>
            </motion.div>
        </>
    )
}
