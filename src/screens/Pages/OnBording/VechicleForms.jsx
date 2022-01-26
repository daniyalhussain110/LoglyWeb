import React, {useState} from 'react'
import { Layout, Card, Input } from 'antd'
import { motion } from 'framer-motion'
import truck from '../../../assets/images/Truck.png'
import PickUp from '../../../assets/images/PickUp.png'
import Car from '../../../assets/images/Car.png'
import MotorBike from '../../../assets/images/Bike.png'
import '../../../customcss/custom.css'

import moment from 'moment';
import {
    Typography,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
  } from "@mui/material";
  import rightarrows from '../../../assets/images/rightarrows.png'
  import { Link } from 'react-router-dom'


const { Sider } = Layout

const { Form, TextArea } = Input

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

export default function VechicleForms() {
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [vehicle, setVehicle] = useState("Truck")

    const Vehicle = (index) => {
      setVehicle(index)
    }

    const isStepOptional = (step) => {
        return step === 1 || step === 2 || step === 3
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
                       <div className='col-12 col-md-6'>
                            <Card className='p-3 card-radius'>
                                <label>Vechicle Type *</label>
                                <div className='mt-3'>
                                    <div className='row align-items-center'>
                                        <div className='col-12 col-md-3'>
                                            <Card onClick={() => Vehicle("Truck")} style={{height:80}} className={vehicle === "Truck" ? 'bg-purple' : 'bg-gray'} variant="contained">
                                                <img src={truck} className='mt-1' />
                                                <p>Truck</p> 
                                            </Card>
                                        </div>
                                  
                                    <div className='col-12 col-md-3'>
                                        <Card onClick={() => Vehicle("PickUp")} style={{height:80}} className={vehicle === "PickUp" ? 'bg-purple' : 'bg-gray'} variant="contained">
                                            <img src={PickUp} className='mt-2' />
                                        <p>PickUp</p> 
                                        </Card>
                                     </div>

                                     <div className='col-12 col-md-3'>
                                        <Card onClick={() => Vehicle("Car")} style={{height:80}} className={vehicle === "Car" ? 'bg-purple ' : 'bg-gray'} variant="contained">
                                            <img src={Car} className='mt-2' />
                                        <p>Car</p> 
                                        </Card>
                                     </div>

                                     <div className='col-12 col-md-3'> 
                                     <Card onClick={() => Vehicle("MotoBike")} style={{height:80}} className={vehicle === "MotoBike" ? 'bg-purple' : 'bg-gray'} variant="contained">
                                        <img src={MotorBike} className='mt-1' />
                                    <p>MotorBike</p>
                                     
                                     </Card>
                                     </div>
                                     <div className='row mt-5'>
                                         <div className='col-12 col-md-6'>
                                             <label htmlFor="">Registration Number *</label>
                                                <Input className='input-forms mt-2' placeholder='KC-0221' />
                                         </div>

                                         <div className='col-12 col-md-6'>
                                             <label htmlFor="">Rent Per Mile *</label>
                                                <Input className='input-forms mt-2' placeholder='$35' />
                                         </div>


                                     </div>
                                     <div className='row mt-4'>
                                         <div className='col-12 col-md-6'>
                                             <label htmlFor="">Animal Type *</label>
                                             <br />
                                             <div className='d-flex flex-row mt-2'>
                                                <Button className='actives fonted col-12'>Dog</Button>
                                               <Button className='bg-colors fonted col-12 ms-4'>Cat</Button>
                                             </div>

                                             <div className='d-flex flex-row mt-3'>
                                                <Button className='bg-colors fonted col-12'>Horse</Button>
                                               <Button className='bg-colors fonted col-12 ms-4'>Elephant</Button>
                                             </div>
                                             
                                            
                                         </div>
                                         <div className='container mt-4'>
                                            <label htmlFor="">Description *</label>
                                                <TextArea className='text-area-bg mt-2 col-12' rows={5}></TextArea>
                                         </div>
                                        <div className='d-flex flex-row justify-content-between mt-5'>
                                            <Button className='actives fonted'>Add</Button>
                                            <Button className='font-black'>Cancel</Button>
                                        </div>
                                     </div>
                                     </div>
                                </div>
                            </Card>
                       </div>
                       <div>

                       </div>
                       </div>
                       </div>
           </motion.div>
        </div>
    )
}
