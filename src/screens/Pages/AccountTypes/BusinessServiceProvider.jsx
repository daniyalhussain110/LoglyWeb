import React, { useState, useEffect } from 'react'
import { Layout, Tooltip, Card, Checkbox, Input, TimePicker, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../../customcss/custom.css'
import AddIcon from '@mui/icons-material/Add';
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import sheep from '../../../assets/images/sheep.png';
import vetinary from '../../../assets/images/vetinary.png';
import transportation from '../../../assets/images/transp.png';
import training from '../../../assets/images/traning.png';
import sitting from '../../../assets/images/sitting.png';
import breeding from '../../../assets/images/breeding.png';
import boarding from '../../../assets/images/boarding.png';
import moment from 'moment';
import { ToastContainer, toast } from 'material-react-toastify'


import {
    Typography,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
  } from "@mui/material";
  import rightarrows from '../../../assets/images/rightarrows.png'




  function getSteps() {
    return [
      {
        title: "Offered Services",
        desc: "Select your offered Services"
      },
  
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

  const { Sider } = Layout

export default function BusinessServiceProvider() {
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [item, setItem] = useState("pet")
   
  const handleChange = (items) => {
          items === item ? setItem(null): setItem(items);    
  }

  const Transportation = () => {
    if(item === "grooming") {
      window.location.href = '/petgrooming'
    }

    else if(item === "veterinary") {
      window.location.href = '/veterniary'
    }
    else if(item === "transportation") {
      window.location.href = '/transportation'
    }
    else if(item === "training") {
      window.location.href = '/pettraining'
    }

    else if(item === "sitting") {
      window.location.href = '/petwalking'
    }

    else if(item === "breeding") {
      window.location.href = '/breeding'
    }

    else if(item === "boarding") {
      window.location.href = '/petboarding'
    }
  }


  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };



    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}} 
            >
                  <div className='container-fluid g-0 overflow'>
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
                            <Stepper className="steps"  activeStep={activeStep} orientation='vertical'>
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
                  <div className='col-12 col-md-6 mt-5'>
                  <div className='container-fluid g-0 pickup-services'>
          <h6>Pick upto 3 services</h6>
            <div className='row'>
              <div className='col-12 col-md-3' >
                    <Card className='color-sky-blue text-center'>
                        <img src={sheep} alt="" className='img-fluid icon-img' />
                        <h5 className='fonts-h5 text-white mt-1'>Pet Grooming</h5>
                    </Card>
                    <div className='text-center mt-2'>
                        <Checkbox value="sheep" checked={item === "grooming"} onChange={() => handleChange("grooming")} name='sheep'></Checkbox>
                        {/* <label htmlFor=""><input className='form-check-input' type="checkbox" value="sheep" checked={item === "sheep"} onChange={() => handleChange("sheep")} name='sheep' /></label> */}
                    </div>
           </div>

           <div className='col-12 col-md-3'>
              
              <Card className='color-green text-center'>
              <img src={vetinary} alt="" className='img-fluid icon-img' />
                        <h5 className='fonts-h5 text-white mt-1'>Veterinary</h5>
              </Card>
              <div className='text-center mt-2'>
                        <Checkbox value="vetinary" checked={item === "veterinary"} onChange={() => handleChange("veterinary")} name='vetinary'></Checkbox>
                        {/* <label htmlFor=""><input className='form-check-input' type="checkbox" value="vetinary" checked={item === "vetinary"} onChange={() => handleChange("vetinary")} name='vetinary' /></label> */}
                    </div>
     </div>

     <div className='col-12 col-md-3'>
              
              <Card className='color-orange text-center'>
              <img src={transportation} alt="" className='img-fluid icon-img' />
                        <h5 className='fonts-h5 text-white mt-1'>Transportation</h5>
              </Card>
              <div className='text-center mt-2'>
                        <Checkbox value="transportation" checked={item === "transportation"} onChange={() => handleChange("transportation")} name='transportation'></Checkbox>
                        {/* <label htmlFor=""><input className='form-check-input' type="checkbox" value="transportation" checked={item === "transportation"} onChange={() => handleChange("transportation")} name='transportation' /></label> */}
                    </div>
     </div>

     <div className='col-12 col-md-3 '>
              
              <Card className='color-purple text-center'>
              <img src={training} alt="" className='img-fluid icon-img' />
                        <h5 className='fonts-h5 text-white mt-1'>Pet Training</h5>
              </Card>
              <div className='text-center mt-2'>
                        <Checkbox value="training" checked={item === "training"} onChange={() => handleChange("training")} name='training'></Checkbox>
                        {/* <label htmlFor=""><input className='form-check-input' type="checkbox" value="training" checked={item === "training"} onChange={() => handleChange("training")} name='training' /></label> */}
                    </div>
     </div>
            </div>

            <div className='row mt-5'>
            <div className='col-12 col-md-3'>
              
              <Card className='color-blue text-center'>
              <img src={sitting} alt="" className='img-fluid icon-img' />
                        <h5 className='fonts-h5 text-white mt-1'>Pet Walking</h5>
              </Card>
              <div className='text-center mt-2'>
                        <Checkbox value="sitting" checked={item === "sitting"} onChange={() => handleChange("sitting")} name='sitting'></Checkbox>
                        {/* <label htmlFor=""><input className='form-check-input' type="checkbox" value="sitting" checked={item === "sitting"} onChange={() => handleChange("sitting")} name='sitting' /></label> */}
                    </div>
     </div>

     <div className='col-12 col-md-3'>
              
              <Card className='color-light-orange text-center'>
              <img src={breeding} alt="" className='img-fluid icon-img' />
                        <h5 className='fonts-h5 text-white mt-1'>Breeding</h5>
              </Card>
              
              <div className='text-center mt-2'>
                        <Checkbox value="breeding" checked={item === "breeding"} onChange={() => handleChange("breeding")} name='breeding'></Checkbox>
                        {/* <label htmlFor=""><input className='form-check-input' type="checkbox" value="breeding" checked={item === "breeding"} onChange={() => handleChange("breeding")} name='breeding' /></label> */}
                    </div>
     </div>

     <div className='col-12 col-md-3'>
              
              <Card className='color-maroon text-center'>
              <img src={boarding} alt="" className='img-fluid icon-img' />
                        <h5 className='fonts-h5 text-white mt-1'>Pet Boarding</h5>
              </Card>
              <div className='text-center mt-2'>
                        <Checkbox value="boarding" checked={item === "boarding"} onChange={() => handleChange("boarding")} name='boarding'></Checkbox>
                        {/* <label htmlFor=""><input className='form-check-input' type="checkbox" value="boarding" checked={item === "boarding"} onChange={() => handleChange("boarding")} name='boarding' /></label> */}
                    </div>
     </div>
     <div className='d-flex flex-row'>
            <Link to="/welcome">
              <Button
                className='mt-5 btn-button'
                  // className={classes.button}
                >
                back
              </Button>
            </Link>
            <Button
                className='mt-5 ms-2 btn-bg col-3'
              // className={classes.button}
              onClick={Transportation}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
            </div>
            </div>

          </div> 
                  </div>
                </div>
                </div>
            </motion.div>
        </>
    )
}
