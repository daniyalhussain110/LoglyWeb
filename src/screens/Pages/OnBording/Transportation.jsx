import React, {useState} from 'react'
import { Layout, Card, Calendar, Form, Upload, Select, Input, Radio, TimePicker, message, Checkbox, Avatar, Popover, Modal, Divider } from 'antd'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../../../customcss/custom.css'
import { LoadingOutlined, PlusOutlined, ClockCircleFilled, MailFilled, UploadOutlined, PercentageOutlined } from '@ant-design/icons';
import AddIcon from '@mui/icons-material/Add';
import sheep from '../../../assets/images/sheep.png'
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import transport from '../../../assets/images/transp.png'
import truck from '../../../assets/images/Truck.png'
import PickUp from '../../../assets/images/PickUp.png'
import Car from '../../../assets/images/Car.png'
import MotorBike from '../../../assets/images/Bike.png'

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

  const { Option } = Select

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

  const weekday = [];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",];
  
  const selectWeekDays = day => {
    console.log("day", day);
    let wD = weekday;
    let index = wD.findIndex(d => d === day);
    if (index > -1) {
      wD.splice(index, 1);
    } else {
      wD.push(day);
    }
  
    const dayElement = document.getElementById(day);
    dayElement.classList.toggle("selected-day");
  
    
    console.log("wD", weekday);
  };
  
  const selectedWeekdays = days => {
    let index = weekday.findIndex(d => days.value === d);
  
    console.log(index, "index");
   
    if (index > -1) {
      console.log(days, "INSIE INDEX COLOR");
    }
    console.log(days);
    return (
      <Avatar
        id={days}
        onClick={() => selectWeekDays(days)}
        className="week-days"
        key={days}
      >
        {days}
      </Avatar>
    );
  };

  function GetSteppers() {
  
    const [Loading, setLoading] = useState(false);
    const [chars_left, setCharLeft] = useState(0)
    const [max_char, setMaxChar] = useState(0)
    const [startSelectedTime, setStartSelectedTime] = useState("00:00")
    const [endSelectedTime, setEndSelectedTime] = useState("00:00")
    const [start1SelectedTime, setStart1SelectedTime] = useState("00:00")
    const [end1SelectedTime, setEnd1SelectedTime] = useState("00:00")
    const [isModalVisible, setIsModalVisible] = useState(false);
   
  

    const handleWordCount = (e) => {
      const charCount = e.target.value.length
      const maxChar = max_char;
      const charLength = charCount - maxChar;
      setCharLeft(charLength)
    }
  
  
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
  
    function onChange(time, timeString) {
      console.log(time, timeString);
    }
  
   
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    
    function onPanelChange(value, mode) {
      console.log(value, mode);
    }
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
              <TextArea 
                rows={4} 
                id='value' 
                className='text-area' 
                maxLength="1800"
                onChange={handleWordCount}
              />
                <p className='mt-2 float-end'><span className='text-danger'>{chars_left}</span> - 1800 </p>
              <div className='mt-5'>
                <label htmlFor="">Days of the week *</label>
                <br />
                <div className='d-flex flex-row'>
                  {weekDays.map((days, index) => selectedWeekdays(days))}
                </div>
              </div>
  
              <div className='row'>
                <div className='col-md-6'>
                  <div className='mt-3'>
                    <label htmlFor="">Business Timings *</label>
                    <br />
                    {/* <TimePicker.RangePicker  className='upload-image mt-2 timepicker-range' /> */}
                    <TimePicker 
                      placeholder='Start Time'
                      renderExtraFooter={() => (
                        <div className='timePickerHeader'>
                          <div>HH</div>
                          <div>MM</div>
                        </div> 
                      )} 
                      className='upload-image mt-2 timepicker-range' 
                      onChange={onChange} 
                      defaultValue={moment('00:00', 'HH:mm')}
                      format="HH:mm"
                      suffixIcon={<ClockCircleFilled />}
                      showNow={false}
                      allowClear={false}
                      value={moment(startSelectedTime, "HH:mm")}
                      onSelect={(value) => {
                        const timeString = moment(value).format("HH:mm");
                        setStartSelectedTime(timeString)
                      }}
                    />
                    
                   <TimePicker 
                      placeholder='End Time'
                      renderExtraFooter={() => (
                        <div className='timePickerHeader'>
                          <div>HH</div>
                          <div>MM</div>
                        </div> 
                      )} 
                      className='upload-image mt-2 ms-3 timepicker-range' 
                      onChange={onChange} 
                      defaultValue={moment('00:00', 'HH:mm')}
                      format="HH:mm"
                      suffixIcon={<ClockCircleFilled />}
                      showNow={false}
                      allowClear={false}
                      value={moment(endSelectedTime, "HH:mm")}
                      onSelect={(value) => {
                        const timeString = moment(value).format("HH:mm");
                        setEndSelectedTime(timeString)
                      }}
                    />
                  </div>
                </div>
  
                <div className='col-md-6'>
                  <div className='mt-3'>
                    <label htmlFor="">Break Timings *</label>
                    <br />
                    {/* <TimePicker.RangePicker  className='upload-image mt-2 timepicker-range' /> */}
                    <TimePicker 
                      placeholder='Start Time'
                      renderExtraFooter={() => (
                        <div className='timePickerHeader'>
                          <div>HH</div>
                          <div>MM</div>
                        </div> 
                      )} 
                      className='upload-image mt-2  timepicker-range' 
                      onChange={onChange} 
                      defaultValue={moment('00:00', 'HH:mm')}
                      format="HH:mm"
                      suffixIcon={<ClockCircleFilled />}
                      showNow={false}
                      allowClear={false}
                      value={moment(start1SelectedTime, "HH:mm")}
                      onSelect={(value) => {
                        const timeString = moment(value).format("HH:mm");
                        setStart1SelectedTime(timeString)
                      }}
                    />
                   <TimePicker 
                      placeholder='End Time'
                      renderExtraFooter={() => (
                        <div className='timePickerHeader'>
                          <div>HH</div>
                          <div>MM</div>
                        </div> 
                      )} 
                      className='upload-image mt-2 ms-3 timepicker-range' 
                      onChange={onChange} 
                      defaultValue={moment('00:00', 'HH:mm')}
                      format="HH:mm"
                      suffixIcon={<ClockCircleFilled />}
                      showNow={false}
                      allowClear={false}
                      value={moment(end1SelectedTime, "HH:mm")}
                      onSelect={(value) => {
                        const timeString = moment(value).format("HH:mm");
                        setEnd1SelectedTime(timeString)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  <div className='mt-5'>
                    {/* <Link to='/calender'> */}
                    <Button className='col-12 grey-color mt-1' variant='outlined' endIcon={<AddIcon />} onClick={showModal}>
                      <Typography style={{textTransform: 'capitalize', fontSize: 12}} className='color-holidays'>Holidays </Typography>
                    </Button>
            
                    <Modal className='modal-radius' centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                          <Button onClick={handleCancel} size="small" className='btn-cancel col-2 float-end'  style={{fontSize: 12, textTransform: 'capitalize'}}>Cancel</Button>
                        </Form.Item>
                    </Modal>
                    <Button ></Button>
                    {/* </Link> */}
                  </div>
                </div>
                <div className='col-12 col-md-6'>
                  <div className='mt-4'>
                    <label htmlFor="">Tax Percentage</label>
                    
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'please input your percentage!'
                        },

                        {
                          pattern: new RegExp(/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i),
                          message: 'please input valid percentage'
                        }
                      ]}
                    >
                      
                   
                    <Input onKeyPress={(event) => {
                                              if (!/[0-9]/.test(event.key)) {
                                              event.preventDefault();
                                              }
                                          }}  suffix={<PercentageOutlined className='percentage' />}  className='grey-color mt-1' />
                    </Form.Item>
                    
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

  
  const animal = [];
  const animalName = ["Dog", "Cat", "Horse", "Elephant"];
  
  const selectAnimal = animals => {
    console.log(animal)
    console.log("animal", animals);
    let SA = animal;
    let index = SA.findIndex(animal => animal === animals);
    if (index > -1) {
      SA.splice(index, 1);
    } else {
      SA.push(animals);
    }
  
    const dayElement = document.getElementById(animals);
    dayElement.classList.toggle("selected-day");
  
    
    console.log("SA", animal);
  };
  
  const selectedAnimals = animals => {
    let index = animal.findIndex(animal => animals.value === animal);
  
    console.log(index, "index");
   
    if (index > -1) {
      console.log(animals, "INSIE INDEX COLOR");
    }
    console.log(animals);
    return (
          <div className='col-12 col-md-6 mt-2 ms-2 '>
            <Button
            id={animals}
            onClick={() => selectAnimal(animals)}
            className="week-days font-size week-btns"
            key={animals}
          >
            {animals}
          </Button>
        </div>
    );
  };


  function AddServices() {
    const [vehicle, setVehicle] = useState("Truck")

    const Vehicle = (index) => {
      setVehicle(index)
    }
    const [value, setValue] = useState(1)
    const [chars_left, setCharLeft] = useState(0)
    const [max_char, setMaxChar] = useState(0)

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    const handleWordCount = (e) => {
      const charCount = e.target.value.length
      const maxChar = max_char;
      const charLength = charCount - maxChar;
      setCharLeft(charLength)
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    function onPanelChange(value, mode) {
      console.log(value, mode);
    }

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }

      return(
          <>
          <div className='container-fluid g-0'>
              <div className='row'>
                  <div className='col-12 col-md-12'>
                    <Card className='color-orange-blue' style={{width: 500}}>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <p className='text-white fs-6'>Please add a vehicle type for <h5 className='text-white mt-3'>Transportation</h5></p>
                            <img src={transport} alt="" className='img-fluid max-fluid'  />
                        </div>
                    </Card>
                    <div className='mt-4'>
                     
                    <Button className='bg-services col-4' variant='contained' endIcon={<AddIcon />} onClick={showModal}>
                                Add a new Services
                            </Button>
          
                  <Modal className='modal-radius' centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                                                <Input style={{width: 270}} className='input-forms mt-2' placeholder='KC-0221' />
                                         </div>

                                         <div className='col-12 col-md-6'>
                                             <label htmlFor="">Rent Per Mile *</label>
                                                <Input style={{width: 270}} className='input-forms mt-2' placeholder='$35' />
                                         </div>


                                     </div>
                                     <div className='row mt-4'>
                                         <div className='col-12 col-md-6'>
                                             <label htmlFor="">Animal Type *</label>
                                             <br />
                                              <div className='d-flex flex-row f-bold margin-col'>
                                                {animalName.map((animals, index) => selectedAnimals(animals))}
                                              </div>

                                              
                                            
                                         </div>
                                         <div className='container-fluid g-0 mt-4'>
                                            <label htmlFor="" className='ms-2'>Description *</label>
                                                <TextArea maxLength="1800" onChange={handleWordCount} className='ms-2 text-area-bg mt-2' rows={5}></TextArea>
                                                <p className='mt-2 float-end'><span className='text-danger'>{chars_left}</span> - 1800 </p>
                                         </div>
                                        <div className='d-flex flex-row justify-content-between mt-5'>
                                            <Button className='actives vechile-radius fonted'>Add</Button>
                                            <Button onClick={handleCancel} className='font-black'>Cancel</Button>
                                        </div>
                                     </div>
                                     </div>
                                </div>

                  </Modal>
         </div>
                  </div>
              </div>
          </div>
           
          </>
      )
  }


const week = [];
const weeksDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",];

const selectWeek = day => {
  console.log("day", day);
  let wD = week;
  let index = wD.findIndex(d => d === day);
  if (index > -1) {
    wD.splice(index, 1);
  } else {
    wD.push(day);
  }

  const dayElement = document.getElementById(day);
  dayElement.classList.toggle("selected-day");

  
  console.log("wD", week);
};

const selectedweekend = days => {
  let index = week.findIndex(d => days.value === d);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(days, "INSIE INDEX COLOR");
  }
  console.log(days);
  return (
    <Avatar
      id={days}
      onClick={() => selectWeek(days)}
      className="week-days"
      key={days}
    >
      {days}
    </Avatar>
  );
};

const pickup = [];
const pickupVechicles = ["Truck", "Pickup", "Car", "MotoBike"];

const selectPickup = day => {
  console.log("day", day);
  let wD = pickup;
  let index = wD.findIndex(d => d === day);
  if (index > -1) {
    wD.splice(index, 1);
  } else {
    wD.push(day);
  }

  const dayElement = document.getElementById(day);
  dayElement.classList.toggle("selected-day");

  
  console.log("wD", pickup);
};

const selectedVechicle= days => {
  let index = pickup.findIndex(d => days.value === d);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(days, "INSIE INDEX COLOR");
  }
  console.log(days);
  return (
    <Avatar
      id={days}
      onClick={() => selectPickup(days)}
      className="week-days"
      key={days}
    >
      {days}
    </Avatar>
  );
};
  
  function TeamMembers() {
    const [startSelectedTime, setStartSelectedTime] = useState("00:00")
    const [endSelectedTime, setEndSelectedTime] = useState("00:00")
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [ loading, setLoading ] = useState(false);
  
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
  

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    function onChange(time, timeString) {
      console.log(time, timeString);
    }
    return(
      <>
         <div className='container-fluid g-0'>
            <div className='row'>
              <div className='col-12 col-md-12'>
              <h6>Manage Team Members</h6>
              <div className='mt-5'>
              <Button endIcon={<AddIcon />} className='outline left-text col-4' variant="outlined" color="primary"  onClick={showModal}>
                <Typography className='' style={{textTransform: 'capitalize', fontSize: 12}}>Add a Team member</Typography>
              </Button>
            
                    <Modal className='modal-radius' centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               
                    <Form
                  
                  name="basic"
                 
                  initialValues={{
                    remember: true,
                  }}
                 
                  autoComplete="off"
                >
              
                  <div className='row'>
                    <div className='col-12 col-md-12 text-center p-0'>
              
                    <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader avatar-radius"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                    </div>
                   
                    <div className='col-12 col-md-6 mt-5'>
                  <Form.Item
                    name="name"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input  placeholder='Name'  className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 mt-5'>
                  <Form.Item
                    name="email"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },

                      {
                        pattern: new RegExp(/\S+@\S+\.\S+/),
                        message: 'please enter valid email'
                      }
                    ]}
                  >
                    <Input placeholder='Email' className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="phone"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phoneNo!',
                      },
                    ]}
                  >
                    <Input onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} placeholder='Phone' className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-12 mt-3'>
                    <label htmlFor="">Work Days *</label>
                    <br />
                    <div className='mt-2'>
                    <div className='d-flex flex-row'>
                      {weekDays.map((days, index) => selectedweekend(days))}
                    </div>
                    </div>
                  </div>
                  <div className='col-12 col-md-6 mt-4'>
                    <label htmlFor="">Work Timing *</label>
                    <div className='d-flex flex-row'>
                    <TimePicker 
                    placeholder='Start Time'
                    renderExtraFooter={() => (
                      <div className='timePickerHeader'>
                        <div>HH</div>
                        <div>MM</div>
                      </div> 
                    )} 
                    className='upload-image mt-2 timepicker-range' 
                    onChange={onChange} 
                    defaultValue={moment('00:00', 'HH:mm')}
                    format="HH:mm"
                    suffixIcon={<ClockCircleFilled />}
                    showNow={false}
                    allowClear={false}
                    value={moment(startSelectedTime, "HH:mm")}
                    onSelect={(value) => {
                      const timeString = moment(value).format("HH:mm");
                      setStartSelectedTime(timeString)
                    }}
                  />
                  
                 <TimePicker 
                    placeholder='End Time'
                    renderExtraFooter={() => (
                      <div className='timePickerHeader'>
                        <div>HH</div>
                        <div>MM</div>
                      </div> 
                    )} 
                    className='upload-image mt-2 ms-3 timepicker-range' 
                    onChange={onChange} 
                    defaultValue={moment('00:00', 'HH:mm')}
                    format="HH:mm"
                    suffixIcon={<ClockCircleFilled />}
                    showNow={false}
                    allowClear={false}
                    value={moment(endSelectedTime, "HH:mm")}
                    onSelect={(value) => {
                      const timeString = moment(value).format("HH:mm");
                      setEndSelectedTime(timeString)
                    }}
                  />
                  </div>
                  </div>
                  <div className='col-12 col-md-12 mt-4'>
                    <label htmlFor="">Vehicle Type *</label>
                    <br />
                    <div className='mt-2'>
                      <div className='d-flex f-bold flex-row'>
                        {pickupVechicles.map((days, index) => selectedVechicle(days))}
                      </div>
                      
                    </div>
                  </div>
                  </div>
                  <div className='mt-5'>
                  <Form.Item
                   
                  >
                 
                    <Button  size="small" className='btn-add col-2' type="primary" htmlType="submit" style={{fontSize: 12, textTransform: 'capitalize'}}>
                      Add
                    </Button>
                    <Button onClick={handleCancel} size="small" className='btn-cancel col-2 float-end'  style={{fontSize: 12, textTransform: 'capitalize'}}>
                      cancel
                    </Button>
                   
                  </Form.Item>
                  </div>
                </Form>
           
              </Modal>
              </div>
                </div>
              </div>
          </div>
      </>
    )  
  }

  function AddTeamsMembers() {
    const [startSelectedTime, setStartSelectedTime] = useState("00:00")
    const [endSelectedTime, setEndSelectedTime] = useState("00:00")
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [ loading, setLoading ] = useState(false);
  
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
  

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    function onChange(time, timeString) {
      console.log(time, timeString);
    }
    return(
      <>
         <div className='container-fluid g-0'>
            <div className='row'>
              <div className='col-12 col-md-12'>
              <h6>Manage Team Members</h6>
              <div className='mt-2'>
              <Button endIcon={<AddIcon />} className='outline-border mt-3 col-8' variant="outlined" color="primary"  onClick={showModal}>
                <Typography className='' style={{textTransform: 'capitalize', fontSize: 12}}>Add another team member</Typography>
              </Button>
            
                    <Modal className='modal-radius' centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               
                    <Form
                  
                  name="basic"
                 
                  initialValues={{
                    remember: true,
                  }}
                 
                  autoComplete="off"
                >
              
                  <div className='row'>
                    <div className='col-12 col-md-12 text-center p-0'>
              
                    <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader avatar-radius"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                    </div>
                   
                    <div className='col-12 col-md-6 mt-5'>
                  <Form.Item
                    name="name"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input  placeholder='Name'  className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 mt-5'>
                  <Form.Item
                    name="email"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },

                      {
                        pattern: new RegExp(/\S+@\S+\.\S+/),
                        message: 'please enter valid email'
                      }
                    ]}
                  >
                    <Input placeholder='Email' className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-6 '>
                  <Form.Item
                    name="phone"
                    className='place'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phoneNo!',
                      },
                    ]}
                  >
                    <Input onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }} placeholder='Phone' className='name' />
                  </Form.Item>
                  </div>
                  <div className='col-12 col-md-12 mt-3'>
                    <label htmlFor="">Work Days *</label>
                    <br />
                    <div className='mt-2'>
                    <div className='d-flex flex-row'>
                      {weekDays.map((days, index) => selectedweekend(days))}
                    </div>
                    </div>
                  </div>
                  <div className='col-12 col-md-6 mt-4'>
                    <label htmlFor="">Work Timing *</label>
                    <div className='d-flex flex-row'>
                    <TimePicker 
                    placeholder='Start Time'
                    renderExtraFooter={() => (
                      <div className='timePickerHeader'>
                        <div>HH</div>
                        <div>MM</div>
                      </div> 
                    )} 
                    className='upload-image mt-2 timepicker-range' 
                    onChange={onChange} 
                    defaultValue={moment('00:00', 'HH:mm')}
                    format="HH:mm"
                    suffixIcon={<ClockCircleFilled />}
                    showNow={false}
                    allowClear={false}
                    value={moment(startSelectedTime, "HH:mm")}
                    onSelect={(value) => {
                      const timeString = moment(value).format("HH:mm");
                      setStartSelectedTime(timeString)
                    }}
                  />
                  
                 <TimePicker 
                    placeholder='End Time'
                    renderExtraFooter={() => (
                      <div className='timePickerHeader'>
                        <div>HH</div>
                        <div>MM</div>
                      </div> 
                    )} 
                    className='upload-image mt-2 ms-3 timepicker-range' 
                    onChange={onChange} 
                    defaultValue={moment('00:00', 'HH:mm')}
                    format="HH:mm"
                    suffixIcon={<ClockCircleFilled />}
                    showNow={false}
                    allowClear={false}
                    value={moment(endSelectedTime, "HH:mm")}
                    onSelect={(value) => {
                      const timeString = moment(value).format("HH:mm");
                      setEndSelectedTime(timeString)
                    }}
                  />
                  </div>
                  </div>
                  <div className='col-12 col-md-12 mt-4'>
                    <label htmlFor="">Vehicle Type *</label>
                    <br />
                    <div className='mt-2'>
                      <div className='d-flex  f-bold flex-row'>
                        {pickupVechicles.map((days, index) => selectedVechicle(days))}
                      </div>
                      
                    </div>
                  </div>
                  </div>
                  <div className='mt-5'>
                  <Form.Item
                   
                  >
                 
                    <Button  size="small" className='btn-add col-2' type="primary" htmlType="submit" style={{fontSize: 12, textTransform: 'capitalize'}}>
                      Add
                    </Button>
                    <Button onClick={handleCancel} size="small" className='btn-cancel col-2 float-end'  style={{fontSize: 12, textTransform: 'capitalize'}}>
                      cancel
                    </Button>
                   
                  </Form.Item>
                  </div>
                </Form>
           
              </Modal>
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
                  
                
                      <AddTeamsMembers />
            {/* <Button endIcon={<AddIcon />} className='outline-border mt-5 col-8' variant="outlined" color="primary"><Typography  style={{textTransform: 'capitalize', fontSize: 12}}>Add another member</Typography></Button></Link> */}
          
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
                  <motion.div
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             exit={{opacity: 0}} 
           >
                 <GetSteppers />
                 </motion.div>
                </>
            )

            case 1 :
              return(
                  <>
                          <motion.div
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             exit={{opacity: 0}} 
           >
                    <AddServices />
                    </motion.div>
                  </>
              )
              
           

            case 2 :
            return(
                <>
                        <motion.div
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             exit={{opacity: 0}} 
           >
                 <TeamMembers />
                 </motion.div>
                </>
            )

            case 3 :
            return(
                <>
                            <motion.div
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             exit={{opacity: 0}} 
           >
                  <AddTeamMembers />
                  </motion.div>
                </>
            )
            default:
              return "unknown step";

    }
}

const { Sider, Content } = Layout
const { TextArea } = Input;

export default function Transportation() {
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isStepOptional = (step) => {
        return step === 0 || step === 1 || step === 2
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
          <div className='top-btn mt-5'>

              {activeStep < 1 && (
                     <Link to="/businessprovider">
                  <Button
                  className=' btn-button'
                    // className={classes.button}
                    // disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    back
                  </Button>
                </Link>
              )}
        
              {activeStep > 0 && (
                <Button
                className=' btn-button'
                  // className={classes.button}
                  // disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  back
                </Button>
              )}

            {activeStep < steps.length - 1 && (
              <Button
              className=' ms-2 btn-bg col-3'
              // className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleNext}
              >
              Next
              </Button>
            )}
           
           {activeStep === steps.length - 1 && (
             <Link to="/businessprovider">
                <Button
                className=' ms-2 width-btns btn-bg col-3'
              // className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleNext}
              >
              Finish
              </Button>
            </Link>
           )}

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
                   
          
        </div>
    )
}
