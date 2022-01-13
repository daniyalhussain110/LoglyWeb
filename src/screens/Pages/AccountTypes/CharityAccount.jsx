import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Steps,message, Layout, Card, Upload, Input, Select, Alert, Tooltip, TimePicker, Popover, Divider, Modal  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import rightarrows from '../../../assets/images/rightarrows.png'
import '../../../customcss/custom.css'
import AddIcon from '@mui/icons-material/Add';
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete'

import moment from 'moment';
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

const { TextArea } = Input;

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
    <p> 
      <DeleteModal />
    </p>
  </div>
);



function getSteps() {
  return [
    {
      title: "Business Details",
      desc: "Please setup your business profile"
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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


function GetForms() {
  const [Loading, setLoading] = useState(false);

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  const { imageUrl } = Loading

  const uploadButton = (
    <div>
      {Loading ? <LoadingOutlined /> : <PlusOutlined className='plus-outlined' />}
      <div style={{ marginTop: 8 }}>Logo</div>
    </div>
  );

  return(
    <>
       <div className='container-fluid g-0 postions'>
          <div className='row'>
            <div className='col-12 col-md-12'>
             
              <div>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader uploaders text-center"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
              <label htmlFor=""> Description *</label>
              <TextArea rows={4} className='text-area'  />
              <div className='mt-3'>
                <label htmlFor="">Days of the week *</label>
                <br />
                <Button className='col-radius actives'>Mon</Button>
                <Button  className='col-radius actives ms-3'>Tue</Button>
                <Button  className='col-radius actives ms-3'>Wed</Button>
                <Button  className='col-radius actives ms-3'>Thu</Button>
                <Button  className='col-radius actives ms-3'>Fri</Button>
                <Button className='col-radius actives bg-colors ms-3'>Sat</Button>
                <Button className='col-radius actives bg-colors ms-3'>Sun</Button>
              </div>

              <div className='row'>
                <div className='col-md-6'>
                  <div className='mt-3'>
                    <label htmlFor="">Business Timings *</label>
                    <br />
                    <TimePicker.RangePicker  className='upload-image mt-2 timepicker-range' />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='mt-3'>
                    <label htmlFor="">Break Timings *</label>
                    <br />
                    <TimePicker.RangePicker  className='upload-image mt-2 timepicker-range' />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <div className='mt-5'>
                    <Link to='/calender'>
                    <Button className='col-12 grey-color' variant='outlined' endIcon={<AddIcon />}><Typography style={{textTransform: 'capitalize', fontSize: 12}} className='color-holidays'>Holidays </Typography></Button></Link>
                  </div>
                </div>
                <div className='col-12 col-md-6'>
                  <div className='mt-4'>
                    <label htmlFor="">Tax Percentage</label>
                    <Input className='grey-color mt-2' />
                  </div>
                </div>
              </div>
         </div>
         </div>
          </div>
        </div>
    </>
  )
}


function getStepContent(step) {
 
  
  switch (step) {
    case 0:
      return (
        <>
        <GetForms />
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
         <Button className='col-radius actives col-4' variant="contained" color="primary"><Typography style={{textTransform: 'capitalize', fontSize: 12}}>Dog</Typography></Button>
         <Button className='col-radius bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Cat</Button>
         <br />
         <Button  className='mt-3 col-radius bg-colors col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Horse</Button>
         <Button className='mt-3 col-radius actives ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Parrot</Button>
         <br />
         <Button  className='mt-3 col-radius actives col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Dog</Button>
         <Button className='mt-3 col-radius bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Cat</Button>
         <br />
         <Button  className='mt-3 col-radius bg-colors col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Horse</Button>
         <Button className='mt-3 col-radius  bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Parrot</Button>
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
         <Button className='mt-3 col-radius actives ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Sojos</Button>
         <br />
         <Button  className='mt-3 col-radius actives col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Blue Buffalo</Button>
         <Button className='mt-3 col-radius actives ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Bentonite Cat Litter</Button>
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
                  <Link to="/charityTeamMembers">
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
                    <Link to="/charityTeamMembers">
                    
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


export default function CharityAccount() {
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
                                 <div className='ms-3 mt-5'>
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
                                  <Button className='logout position' startIcon={<i className="fas fa-sign-out-alt"></i>}>
                                  <Typography style={{textTransform: 'capitalize', fontSize: 18}}> Logout </Typography>
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

              {/* <div className='steps steps-content'>
              <Button type='primary' className='col-4 col-radius'>{steps[current].cage}</Button>
                          <Button type='primary ms-3' className='col-4 col-radius bg-colors'>{steps[current].dogfood}</Button>

                          <Button type='primary' className='col-4 col-radius bg-colors mt-3'>{steps[current].royalcabin}</Button>
                          <Button type='primary ms-3' className='col-4 col-radius'>{steps[current].sojos}</Button>
                      
                          <Button type='primary' className='col-4 col-radius mt-3'>{steps[current].buffelo}</Button>
                          <Button type='primary ms-3' className='col-4 col-radius bg-colors'>{steps[current].CatLitter}</Button>

                          <Button type='primary' className='col-4 col-radius bg-colors mt-3'>{steps[current].Active}</Button>
                          <Button type='primary ms-3' className='col-4 col-radius bg-colors'>{steps[current].pethouse}</Button>
              </div> */}
     
               
                </div>
                </div>
            </motion.div>
        </>
    )
}
