import React, {useState} from 'react'
import { motion } from 'framer-motion';
import { Steps,message, Layout, Card, Upload, Input, Select, Alert, Tooltip, Popover, Divider, Modal } from 'antd';
import { Link } from 'react-router-dom'
import '../../../customcss/custom.css'
import rightarrows from '../../../assets/images/rightarrows.png'
import AddIcon from '@mui/icons-material/Add';
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

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
    <motion.div>
      <p><Button size="small" startIcon={<i class="fas fa-edit" style={{fontSize: 12}}></i>} style={{fontSize: 12, textTransform: 'capitalize'}}><span className='color-edit'>Edit</span></Button></p>
      <Divider />
      <p>
        <DeleteModal />
      </p>
    </motion.div>
  </div>
);

function getSteps() {
  return [
    {
      title: "Listing Service",
      desc: "Select one of these below"
    },

    {
      title: "Animal Info",
      desc: "Select the animals you love"
    }, 

    {
      title: "Product info",
      desc: "Select the Products you sell"
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

const Toggles = () => {
  
  const [toggleState, setToggleState] = useState(1)
  
  const togglebutton = (index) => {
    setToggleState(index);
  }

  return(
    <>
    <motion.div
    >
      <Button onClick={() => togglebutton(1)} className={(toggleState === 1 ? 'active-button' : 'activeses') + ' col-8'} variant="contained" color="primary"><Typography style={{textTransform: 'capitalize', fontSize: 12}}>I Deal in Animal Selling / Products</Typography></Button>
      <Button onClick={() => togglebutton(2)} className={(toggleState === 2 ? 'active-button' : 'activeses') + ' col-8 mt-3'} variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>I Deal in Animal Services</Button>
    </motion.div>
    </>
  )
}



function getStepContent(step) {

  switch (step) {
    case 0:
      return (
        <>
        <div className='container-fluid g-0 postions'>
          <div className='row'>
            <div className='col-12 col-md-12'>
              
              <div className='mt-5'>
        
              <Toggles />
         </div>
         </div>
          </div>
        </div>
        </>
      );

    case 1:
      return (
        
        <>
           <div className='row'>
            <div className='col-12 col-md-12'>
              <h6>Animal Info</h6>
              <p>Select the animals you love</p>
              <div className='mt-5'>
         <Button className='col-radius actives black col-4' variant="contained" color="primary"><Typography style={{textTransform: 'capitalize', fontSize: 12}}>Dog</Typography></Button>
         <Button className='col-radius bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Cat</Button>
         <br />
         <Button  className='mt-3 col-radius bg-colors col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Horse</Button>
         <Button className='mt-3 col-radius actives ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Parrot</Button>
         <br />
         <Button  className='mt-3 actives col-radius col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Dog</Button>
         <Button className='mt-3 col-radius bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Cat</Button>
         <br />
         <Button  className='mt-3 col-radius bg-colors col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Horse</Button>
         <Button className='mt-3 col-radius bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Parrot</Button>
         </div>
         </div>
          </div>
      
        </>
      );
      case 2:
        return (
          <>
           <div className='row'>
            <div className='col-12 col-md-12'>
              <h6>Product Info</h6>
              <p>Select the Products you sell</p>
              <div className='mt-5'>
         <Button className='col-radius actives col-4' variant="contained" color="primary"><Typography style={{textTransform: 'capitalize', fontSize: 12}}>Cage</Typography></Button>
         <Button className='col-radius bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Dog Food</Button>
         <br />
         <Button  className='mt-3 col-radius bg-colors col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Royal Cabin</Button>
         <Button className='mt-3 col-radius ms-3 actives col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Sojos</Button>
         <br />
         <Button  className='mt-3 col-radius actives col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Blue Buffalo</Button>
         <Button className='mt-3 col-radius actives  ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Bentonite Cat Litter</Button>
         <br />
         <Button  className='mt-3 col-radius bg-colors col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Josera Active</Button>
         <Button className='mt-3 col-radius bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Pet House</Button>
         </div>
         </div>
          </div>
          </>
        )
        case 3 :
          return (
            <>
            <div className='container-fluid g-0'>
            <div className='row'>
              <div className='col-12 col-md-12'>
                <h6>Manage Team Members</h6>
            
                <div className='mt-5'>
                  <Link to="/listiningTeamMembers">
              <Button endIcon={<AddIcon />} className='outline left-text col-4' variant="outlined" color="primary"><Typography className='float-left' style={{textTransform: 'capitalize', fontSize: 12}}>Add a Team member</Typography></Button>
           </Link>
           </div>
           </div>
            </div>
          </div>
          </>
          )
    case 4:
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
                          <Popover className='pop text-align tools-tips cursor-pointer' placement="left" content={content} trigger="click">
                                  <MoreVertIcon className='vector-icon' />
                          </Popover>
                          </p>
                          
                      </div>
                     </div>
                  
                 </div>
                 </div>
               </div>
               <div className='mt-5'>
                    <Link to="/listiningTeamMembers">
                    
            <Button endIcon={<AddIcon />} className='outline-border mt-5 col-8' variant="outlined" color="primary"><Typography  style={{textTransform: 'capitalize', fontSize: 12}}>Add another member</Typography></Button>
            </Link>
         </div>
         </div>
         </div>
          </div>
        </div>
        </>
      );
    case 5:
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

export default function BusinessListing() {
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const isStepOptional = (step) => {
    return step === 1 || step === 2 || step === 3;
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
                <p className='text-white' align='left' variant='p'>{step.desc}</p>
                </StepLabel>
            </Step>
          );
        })}
      </Stepper>
                                </div>
                                <Link to="/">
                                  <Button className='logout' startIcon={<i className="fas fa-sign-out-alt"></i>}>
                                     <Typography style={{textTransform: 'capitalize', fontSize: 18}}>Logout</Typography> 
                                  </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Sider>
                </div>
                <div className='col-12 col-md-6 button-positions'>
                {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <form>{getStepContent(activeStep)}</form>
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
              <img  src={rightarrows} alt="" />
            </Button>
          )}
          </>
      )}
          
                </div>
                </div>
                </div>
        </motion.div>
        </>
    )
}
