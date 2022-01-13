import React, { useState, useEffect } from 'react'
import { Layout, Tooltip, Popover, Divider, Modal, Space } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../../customcss/custom.css'
import AddIcon from '@mui/icons-material/Add';
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import WelcomeScreen from '../WelcomeScreen';
import Person from '../../../components/Person';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import rightarrows from '../../../assets/images/rightarrows.png'


const DeleteModal = () => {
  const [visible, setVisible] = useState(false)
  
  const showModel = () => {
    setVisible(true)
  }

  const hideModel = () => {
    setVisible(false)
  }

  return (
    <>
        <Button size="small" startIcon={<DeleteIcon />} className='text-danger' style={{fontSize: 12, textTransform: 'capitalize'}} onClick={showModel}>
          Delete
        </Button>
        <Modal
          visible={visible}
          className='border-model-radius'
        >
          <div className='text-center'>
          <span>Are you sure you want to delete this service?</span>
            <br />
            <Button className='btn-bg mt-5 col-12' onClick={hideModel} variant="contained" type="primary">Delete</Button>
            <br />
            <Button className='mt-3 text-cancel' onClick={hideModel}>Cancel</Button>
         </div>
        </Modal>
    </>
  )
}


const content = (
  <div>
    <p><Button size="small" startIcon={<i class="fas fa-edit" style={{fontSize: 12}}></i>} style={{fontSize: 12, textTransform: 'capitalize'}}><span className='color-edit'>Edit</span></Button></p>
    <Divider />
    {/* <p> <Button size="small" className='text-danger'  startIcon={<DeleteIcon />}  style={{fontSize: 12, textTransform: 'capitalize'}}>Delete</Button></p> */}
    <p><DeleteModal /></p>
  </div>
);


function getSteps() {
  return [
    {
      title: "Animal info",
      desc: "Select the animals you love"
    },

    {
      title: "Team Members",
      desc: "Add Team Member"
    },

    {
      title: "Team Members Added",
      desc: "Add Another Member"
    }
  ];
}




const AnimalToggle = () => {
  const [cat, setCat] = useState(false)
  const [Horse, setHorse] = useState(false)
  const [Parrot, setParrot] = useState(false)

  const CatFunc = () => {
    setCat(!cat)
  }

  const HorseFunc = () => {
    setHorse(!Horse)
  }

  const ParrotFunc = () => {
    setParrot(!Parrot)
  }
  return(
    <>
<div className='container-fluid g-0'>
          <div className='row'>
            <div className='col-12 col-md-12'>
              <h6>Animal Info</h6>
              <p>Select the animals you love</p>
              
         <Button className='col-radius actives col-4' variant="contained" color="primary"><Typography style={{textTransform: 'capitalize', fontSize: 12}}>Dog</Typography></Button>
         <Button onClick={CatFunc} className={cat ? 'orangeBtn  ms-3 col-4' : 'greyBtn ms-3 col-4'} variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Cat</Button>
         <br />
         <Button onClick={HorseFunc} className={Horse ? 'orangeBtn mt-3 col-4' : 'greyBtn mt-3 col-4'} variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Horse</Button>
         <Button className='mt-3 col-radius actives ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Parrot</Button>
         <br />
        <Button  className='mt-3 actives col-radius col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Dog</Button>
        <Button className=' mt-3 col-radius bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Cat</Button>
        <br />
        <Button  className='mt-3 col-radius bg-colors col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Horse</Button>
        <Button onClick={ParrotFunc} className={Parrot ? 'orangeBtn mt-3 ms-3 col-4' : 'greyBtn mt-3 ms-3 col-4'} variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Parrot</Button>
     
         </div>
         </div>
          </div>
    </>
  )
}



function Toggle() {


  return(
    <>
    <AnimalToggle />
    </>
  )
}


function getStepContent(step) {
  
  switch (step) {
    case 0:
      return (
        <>
          <Toggle />
        </>
      );

    case 1:
      return (
        
        <>
          <div className='container-fluid g-0'>
          <div className='row'>
            <div className='col-12 col-md-12'>
              <h6>Manage Team Members</h6>
          
              <div className='mt-5'>
                <Link to="/petloverform">
            <Button endIcon={<AddIcon />} className='outline left-text col-4' variant="outlined" color="primary"><Typography className='float-left' style={{textTransform: 'capitalize', fontSize: 12}}>Add a Team member</Typography></Button>
         </Link>
         </div>
         </div>
          </div>
        </div>
        </>
      );
    case 2:
      return (
        <>
           <div className='container-fluid g-0'>
          <div className='row'>
            <div className='col-12 col-md-12'>
              <h6>Team member added!</h6>
          
              <div className='mt-5'>
               <div className='card cardes mb-3' style={{maxWidth: 450, maxHeight: 74}}>
                 <div className='row g-0'>
                   <div className='col-12 col-md-2'>
                      <img src={avatar} alt="" className='img-fluid rounded-start'  />
                   </div>
                   <div className='col-12 col-md-10'>
                      <div className='card-body'>
                          <h6 className='card-title text-card'>Jack Rio</h6>
                          <p className='card-text text-card'>0213462840459 
                          {/* <Tooltip className='text-align tools-tips' placement="left" title={text}>
                            <MoreVertIcon />
                          </Tooltip> */}

                          <Popover className='pop text-align tools-tips cursor-pointer' placement="left" content={content} trigger="click">
                            <MoreVertIcon className='vector-icon' />
                          </Popover>
                          </p>
                         
                      </div>
                     </div>
                 </div>
            
                
                 <div className='card cardes mt-2 mb-3' style={{maxWidth: 450, maxHeight: 74}}>
                 <div className='row g-0'>
                   <div className='col-12 col-md-2'>
                      <img src={avatar1} alt="" className='img-fluid rounded-start'  />
                   </div>
                   <div className='col-12 col-md-10'>
                      <div className='card-body'>
                          <h6 className='card-title text-card'>Rosie Fernadez</h6>
                          <p className='card-text text-card'>0213222382819
                          <Popover className='text-align tools-tips cursor-pointer' placement="left" content={content} trigger="click">
                            <MoreVertIcon className='vector-icon' />
                          </Popover>
                          </p>
                          
                      </div>
                     </div>
                  
                 </div>
                 </div>
               </div>
               <div className='mt-5'>
                    <Link to="/petloverform">
                    
            <Button endIcon={<AddIcon />} className='outline-border mt-5 col-8' variant="outlined" color="primary"><Typography  style={{textTransform: 'capitalize', fontSize: 12}}>Add another member</Typography></Button>
            </Link>
         </div>
         </div>
         </div>
          </div>
        </div>
         
        </>
      );
    case 3:
      return (
        <>
          <TextField
            id="cardNumber"
            label="Card Number"
            variant="outlined"
            placeholder="Enter Your Card Number"
            fullWidth
            margin="normal"
            name="cardNumber"
          />
          <TextField
            id="cardMonth"
            label="Card Month"
            variant="outlined"
            placeholder="Enter Your Card Month"
            fullWidth
            margin="normal"
            name="cardMonth"
          />
          <TextField
            id="cardYear"
            label="Card Year"
            variant="outlined"
            placeholder="Enter Your Card Year"
            fullWidth
            margin="normal"
            name="cardYear"
          />
        </>
      );
    default:
      return "unknown step";
  }
}



const { Sider } = Layout

const  PetLover = () =>  {
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const isStepOptional = (step) => {
    return step === 1;
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
                <div className='col-12 col-md-6 mt-5'>
              
                {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <form>{getStepContent(activeStep)}</form>
          <div className='d-flex flex-row'>
            <Button
            className='mt-5 btn-button'
              // className={classes.button}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              back
            </Button>

         
            <Button
                className='mt-5 ms-2 btn-bg col-3'
              // className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>

      
            
            {isStepOptional(activeStep)  &&  (
              <Button
              className='mt-5 skip float-end'
                // className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleSkip}
              >
                skip
                <img src={rightarrows} alt="" />
              </Button>
            )}
        
          </div>
        </>
      )}
                               
                     
                 
                </div>
                </div>
                </div>
               


           {/* <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}

</motion.div>
        </>
    )
}


export default PetLover


