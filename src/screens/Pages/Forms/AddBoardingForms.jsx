import React, {useState} from 'react'
import { motion } from 'framer-motion'
import { Layout, Card, Radio, Form, Input, Select, Table, Tag, Space } from 'antd'
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

  

export default function AddBoardingForms() {
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
        <div>
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
                                    <label htmlFor="">Package Name *</label>
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
                                        <Input placeholder='Essential Package' />
                                    </Form.Item>
                                </div>

                                <div className='col-12 col-md-6 mt-3'>
                                    <label htmlFor="">Rate Per Day *</label>
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
                                        <Input placeholder='$99' />
                                    </Form.Item>
                                </div>

                                <div className='col-12 col-md-12'>
                                    <label htmlFor="">Want to add a discount?(optional)</label>
                                    <table className='table  table-color table-bordered table-borderless'>
                                        <thead className=''>
                                            <tr>
                                                <th>Booking Period</th>
                                                <th>Discount Type</th>
                                                <th>Discount Value</th>
                                                <th className=''></th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white'>
                                            <tr>
                                                <td>
                                                   <span>5</span> 
                                                <Select className='float-end boarding-select' defaultValue="Days" onChange={handleChange}>
                                                    <Option value="jack">Monday</Option>
                                                    <Option value="lucy">Tuesday</Option>
                                                    <Option value="Yiminghe">Wednesday</Option>
                                                </Select>
                                                </td>
                                                <td>
                                                <Select className='float-end boarding-select' defaultValue="Percentage" onChange={handleChange}>
                                                    <Option value="jack">Percentage</Option>
                                                    <Option value="lucy">Amount</Option>
                                                </Select>
                                                </td>
                                                <td> | 
                                                    <span className='float-end'>%</span>
                                                </td>
                                                <td className='table-color '>
                                                    <Button className='discount'>Add Discount</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
        </div>
    )
}
