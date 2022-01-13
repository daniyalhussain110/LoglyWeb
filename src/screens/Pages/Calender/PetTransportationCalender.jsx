import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout, Form, Input, Calendar, Card } from 'antd';
import { Link } from 'react-router-dom'
import {
    Typography,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
  } from "@mui/material";

const { Sider } = Layout

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

export default function PetTransportationCalender() {
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  
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
            <div className='col-12 col-md-6 calender-positions'>
             <Card className='card-radius'>
             <div className="site-calendar-demo-card">
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                
              </div>
              <Form.Item
                  name="name"
                  className='place mt-3'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ]}
                >
                  <Input  placeholder=' Enter Holiday Name'  className='name' />
                </Form.Item>
                <Form.Item>
                  <Button size="small" className='btn-add col-2' type="primary" htmlType="submit" style={{fontSize: 12, textTransform: 'capitalize'}}>Add</Button>
                  <Button size="small" className='btn-cancel col-2 float-right'  style={{fontSize: 12, textTransform: 'capitalize'}}>Cancel</Button>
                </Form.Item>
             </Card>
            </div>
            </div>
          </div>
           </motion.div>
        </div>
    )
}
