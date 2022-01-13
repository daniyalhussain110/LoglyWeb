import React, {useState} from 'react'
import { Layout, Card, Form, Upload, Input, Radio, TimePicker, message, Checkbox, Avatar, Popover, Modal, Divider } from 'antd'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../../../customcss/custom.css'
import { LoadingOutlined, PlusOutlined,  MailFilled, UploadOutlined } from '@ant-design/icons';
import AddIcon from '@mui/icons-material/Add';
import sheep from '../../../assets/images/sheep.png'
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

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

  function PetGrommingForms() {
    const [ loading, setLoading ] = useState(false);
    const [value, setValue] = React.useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };


    const { imageUrl } = loading

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
  
  
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
      return(
          <>
           <div className='container-fluid g-0'>
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
              <Button  className='col-radius ms-3 actives'>Tue</Button>
              <Button  className='col-radius ms-3 actives'>Wed</Button>
              <Button  className='col-radius ms-3 actives'>Thu</Button>
              <Button  className='col-radius ms-3 actives'>Fri</Button>
              <Button className='col-radius bg-colors ms-3'>Sat</Button>
              <Button className='col-radius bg-colors ms-3'>Sun</Button>
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
                  <Link to="/petgroomingcalender">
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

  function AddServices() {
    const [cat, setCat] = useState(true)

    const [horse, setHorse] = useState(true)
    const [parrot, setParrot] = useState(true)
  
    const CatFunc = () => {
      setCat(!cat)
    }
  
    
    const HorseFunc = () => {
      setHorse(!horse)
    }
  
    const ParrotFunc = () => {
      setParrot(!parrot)
    }
      return(
          <>
          <div className='container-fluid g-0'>
              <div className='row'>
                  <div className='col-12 col-md-12'>
                    <Card className='color-sky-blue' style={{width: 500}}>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <p className='text-white fs-6'>Please Select the animal categories for  <h5 className='text-white mt-3'>Pet Grooming</h5></p>
                            <img src={sheep} alt="" className='img-fluid max-fluid'  />
                        </div>
                    </Card>
                    <div className='mt-4'>
         <Button id='inActive' className='col-radius activeted col-4' variant="contained" color="primary"><Typography style={{textTransform: 'capitalize', fontSize: 12}}>Dog</Typography></Button>
         <Button id='inActive' onClick={CatFunc} className={(cat ? 'greyColor' : 'orangeColor') + ' ms-3 col-4 '} variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Cat</Button>
         <br />
         <Button id='inActive' onClick={HorseFunc} className={(horse ? 'greyColor mt-3 col-4' : 'orangeColor mt-3 col-4') + ''} variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Horse</Button>
         <Button id='inActive' className='mt-3 col-radius activeted  ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Parrot</Button>
         <br />
         <Button id='inActive' className='mt-3 col-radius activeted  col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Dog</Button>
         <Button id='inActive' className='mt-3 col-radius bg-colors ms-3 col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Cat</Button>
         <br />
         <Button id='inActive' className='mt-3 col-radius bg-colors col-4' variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Horse</Button>
         <Button id='inActive' onClick={ParrotFunc} className={(parrot ? 'greyColor mt-3 ms-3 col-4' : 'orangeColor mt-3 ms-3 col-4') + ''} variant="contained" color="primary" style={{textTransform: 'capitalize', fontSize: 12}}>Parrot</Button>
         </div>
                  </div>
              </div>
          </div>
           
          </>
      )
  }

  function AddCategory() {
      
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }
      return(
          <>
           <div className='container-fluid g-0'>
              <div className='row'>
                  <div className='col-12 col-md-12'>
                        <Card className='color-sky-blue' style={{width: 500}}>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <p className='text-white fs-6'>Please Select / Add the Services for <h5 className='text-white mt-3'>Pet Grooming</h5></p>
                                <img src={sheep} alt="" className='img-fluid max-fluid'  />
                            </div>
                        </Card>
                        <div className='mt-4'>
                            <Link to="/addservices">
                                <Button className='bg-services col-4' variant="contained" endIcon={<AddIcon />}>
                                    Add a new Services
                                </Button>
                            </Link>
                            <br />
                            <Checkbox className='mt-4 col-4 grroming-hair'>Hair Grooming</Checkbox>
                            <Checkbox className='mt-4 col-4 grroming-hair'>Lice Treatment</Checkbox>
                            <br />
                            <Checkbox className='mt-3 col-4 grroming-hair'>Paw Cleaning</Checkbox>
                        </div>
                    </div>
                </div>
            </div>
          </>
      )
  }

  function TeamMembers() {
      return(
          <>
            <div className='container-fluid g-0'>
          <div className='row'>
            <div className='col-12 col-md-12'>
              <h6>Manage Team Members</h6>
          
            <div className='mt-5'> 
            <Link to="/BusinessProviderServicesForms">  
                <Button endIcon={<AddIcon />} className='outline left-text col-4' variant="outlined" color="primary"><Typography className='float-left' style={{textTransform: 'capitalize', fontSize: 12}}>Add a Team member</Typography></Button>
            </Link> 
            </div>
         </div>
          </div>
        </div>
          </>
      )
  }

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
  

  function AddTeamMembers() {
      return(
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
                    <Link to="/BusinessProviderServicesForms">
                    
            <Button endIcon={<AddIcon />} className='outline-border mt-5 col-8' variant="outlined" color="primary"><Typography  style={{textTransform: 'capitalize', fontSize: 12}}>Add another member</Typography></Button>
            </Link>
         </div>
         </div>
         </div>
          </div>
        </div>
          </>
      )
  }

  function getStepContent(step) {
      switch(step) {
          case 0 :
              return(
                  <>
                   <PetGrommingForms />
                  </>
              )

              case 1 :
                return(
                    <>
                      <AddServices />
                    </>
                )
                
                case 2 :
              return(
                  <>
                    <AddCategory />
                  </>
              )

              case 3 :
              return(
                  <>
                   <TeamMembers />
                  </>
              )

              case 4 :
              return(
                  <>
                    <AddTeamMembers />
                  </>
              )
              default:
                return "unknown step";

      }
  }

const { Sider, Content } = Layout
const { TextArea } = Input;

export default function PetGrooming() {
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
          <div className='d-flex flex-row top-btn mt-5'>
            <Button
            className=' btn-button'
              // className={classes.button}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              back
            </Button>

         
            <Button
                className=' ms-2 btn-bg col-3'
              // className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>

      
            
            {isStepOptional(activeStep)  &&  (
              <Button
              className='skip float-end'
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
                   
            </motion.div> 
        </>
    )
}
