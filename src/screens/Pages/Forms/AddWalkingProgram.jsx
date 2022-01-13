import React, {useState} from 'react'
import { motion } from 'framer-motion'
import { Layout, Form, Input, Calendar, Card, Radio, TimePicker, Select } from 'antd';
import { Link } from 'react-router-dom'
import {
    Typography,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel
  } from "@mui/material";
  import '../../../customcss/custom.css'

const { Sider } = Layout
const { Option } = Select
const { TextArea } = Input

function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  function getSteps() {
    return [
  
      {
        title: "Account Setup",
        desc: "Please setup your business profile"
      },

      {
        title: "Add Category",
        desc: "Add Your Categories"
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
export default function AddWalkingProgram() {
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState(1)
    
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };
  
  
    const isStepOptional = (step) => {
      return step === 1 || step === 2;
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
            <div className='row align-items-center'>
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
                <p className='text-thick text-white' align='left' variant='p'>{step.desc}</p>
                </StepLabel>
            </Step>
          );
        })}
      </Stepper>
                                </div>
                                <Link to="/">
                                  <Button className='logout position' startIcon={<i className="fas fa-sign-out-alt"></i>}>
                                  <Typography style={{textTransform: 'capitalize', fontSize: 18}}> Logout </Typography>
                                  </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                   
                </Sider>
              </div>
                <div className='col-12 col-md-6'>
                    <Card className='p-3 card-radius'>
                        <div className='row'>
                            <div className='col-12 col-md-12'>
                                <label htmlFor="">Service Type *</label>
                                <br />
                                <Radio.Group onChange={onChange} value={value}> 
                                                <Radio className='radio' value={1}> <span className='ms-1'>One-Site</span></Radio>
                                                <Radio value={2} className='radio mt-3'><span className='ms-1'>Off-Site</span></Radio>
                                                <Radio value={2} className='radio mt-3'><span className='ms-1'>Both</span></Radio>
                                            </Radio.Group>
                            </div>

                           

                            <div className='col-12 col-md-6 mt-4'>
                                <label htmlFor="">Service Name *</label>
                                <br />
                                <Input className='walking-forms' placeholder='Dog sitting' />
                            </div>

                            <div className='col-12 col-md-6 mt-4'>
                                <label htmlFor="">Select Duration *</label>
                                <Select  className="walking-select col-12" defaultValue="30 mins">
                                <Option value="jack">40 mins</Option>
                                <Option value="lucy">50 mins</Option>
                                
                                <Option value="Yiminghe">60 mins</Option>
                                </Select>
                            </div>

                            <div className='col-12 col-md-6 mt-4'>
                                <label htmlFor="">Buffer Time *</label>
                                <Select  className="walking-select col-12" defaultValue="15 mins">
                                <Option value="jack">17 mins</Option>
                                <Option value="lucy">19 mins</Option>
                                
                                <Option value="Yiminghe">21 mins</Option>
                                </Select>
                            </div>


                            <div className='col-12 col-md-6 mt-4'>
                                <label htmlFor="">Coverage Area *</label>
                                <br />
                                <Input className='walking-forms' placeholder='Enter Zip Code' />
                            </div>

                            
                            <div className='col-12 col-md-6 mt-4'>
                                <label htmlFor="">One-Site-Price *</label>
                                <br />
                                <Input className='walking-forms' placeholder='$99' />
                            </div>

                            <div className='col-12 col-md-6 mt-4'>
                                <label htmlFor="">Description *</label>
                                <TextArea rows={4} className='text-area' />
                            </div>
                            
                            
                          
                                <div className='col-12 col-md-12 mt-4'>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <Button className='actives button-radius fonted col-2'>Add</Button>
                                        <Button className='font-black'>Cancel</Button>
                                    </div>
                                </div>
                            
                        </div>
                    </Card>
                </div>
              </div>
              </div>
            </motion.div>
        </div>
    )
}
