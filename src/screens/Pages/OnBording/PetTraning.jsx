import React, { useState, useEffect } from 'react'
import { Layout, Card, Form, Upload, Calendar, Select, Input, Radio, TimePicker, message, Checkbox, Avatar, Popover, Modal, Divider } from 'antd'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../../../customcss/custom.css'
import { LoadingOutlined, PlusOutlined,  MailFilled, ClockCircleFilled, UploadOutlined, PercentageOutlined } from '@ant-design/icons';
import AddIcon from '@mui/icons-material/Add';
import Traning from '../../../assets/images/traning.png'
import avatar from '../../../assets/images/avatar.png'
import avatar1 from '../../../assets/images/avatar1.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { getCities, getStates, getZipCode } from '../../../store/Actions/Action'

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
                        message: 'please input valid percentage!'
                      }
                    ]}
                  >
                  <Input onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            }
                                        }}suffix={<PercentageOutlined className='percentage' />}  className='grey-color mt-1' />
                  </Form.Item>
                    {/* {message && <span className={`message ${isValidPercentage ? 'success' : 'error'}`}>{message}</span>} */}
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
const animalName = ["Dog", "Cat", "Horse", "Parrot"];

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
        <div className='col-12 col-md-6 mt-2 '>
          <Button
          id={animals}
          onClick={() => selectAnimal(animals)}
          className="traning font-size"
          key={animals}
        >
          {animals}
        </Button>
      </div>
  );
};

function AddServices() {
 
    return(
        <>
        <div className='container-fluid g-0'>
            <div className='row'>
                <div className='col-12 col-md-12'>
                  <Card className='color-purple-blue' style={{width: 500}}>
                  <div className='d-flex flex-row justify-content-between align-items-center'>
                      <p className='text-white font-size '>Please Select the animal categories for  <h5 className='text-white mt-3'>Pet Training</h5></p>
                          <img src={Traning} alt="" className='img-fluid max-fluid pet-image'  />
                      </div>
                  </Card>
                  <div className='mt-4'>
                    <div className='row animal-row'>
                      {animalName.map((animals, index) => selectedAnimals(animals))}
                    </div>
                 
                  </div>
                </div>
            </div>
        </div>
         
        </>
    )
}

const frequency = [];
const frequencys = ["Daily", "Weekly", "Monthly"];

const selectFrequency = day => {
  console.log("day", day);
  let wD = frequency;
  let index = wD.findIndex(d => d === day);
  if (index > -1) {
    wD.splice(index, 1);
  } else {
    wD.push(day);
  }

  const dayElement = document.getElementById(day);
  dayElement.classList.toggle("selected-day");

  
  console.log("wD", frequency);
};

const selectedfrequencys = days => {
  let index = frequency.findIndex(d => days.value === d);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(days, "INSIE INDEX COLOR");
  }
  console.log(days);
  return (
    <Avatar
      id={days}
      onClick={() => selectFrequency(days)}
      className="week-days"
      key={days}
    >
      {days}
    </Avatar>
  );
};

function AddCategory() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startSelectedTime, setStartSelectedTime] = useState("00:00")
  const [endSelectedTime, setEndSelectedTime] = useState("00:00")
  const [chars_left, setCharLeft] = useState(0)
  const [max_char, setMaxChar] = useState(0)
  const [value, setValue] = useState(1)
  const [value1, setValue1] = useState(1)
  const dispatch = useDispatch()

  const handleWordCount = (e) => {
    const charCount = e.target.value.length
    const maxChar = max_char;
    const charLength = charCount - maxChar;
    setCharLeft(charLength)
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

    
  function onChange(e) {
      console.log(`checked = ${e.target.checked}`);
      setValue(e.target.value);
    }

    function onChange1(e) {
      console.log(`checked = ${e.target.checked}`);
      setValue1(e.target.value);
    }

    const states = useSelector((state) => state.myState.states)
    const cities = useSelector((state) => state.myCities.cities)
    const zipcodes = useSelector((state) => state.myZipCode.zipcodes)
  
    useEffect(() => {
      dispatch(getStates()).then((response) => {
        if(response.payload.status === 200) {
  
        }
      })
    }, [])

    const stateChange = (value) => {
      if(value) {
        let id = states.filter((state) => state.name === value)[0].id
        dispatch(getCities(id)).then(response => {
          if(response.payload.status === 200) {
           
          }
        })
      }
    }
  
   const zipcodeChange = (value) => {
    if(value) {
      let zipcode = cities.filter((zip) => zip.zipcode === value).zipcode
      dispatch(getZipCode(zipcode)).then(response => {
        if(response.payload.status === 200) {
           
        } 
      })
    }
   }
  
    return(
        <>
         <div className='container-fluid g-0'>
            <div className='row'>
                <div className='col-12 col-md-12'>
                      <Card className='color-purple-blue' style={{width: 500}}>
                      <div className='d-flex flex-row justify-content-between align-items-center'>
                          <p className='text-white font-size'>Please Select / Add the Services for <h5 className='text-white mt-3'>Pet Training</h5></p>
                              <img src={Traning} alt="" className='img-fluid max-fluid'  />
                          </div>
                      </Card>
                      <div className='mt-4'>
                              {/* <Link to="/addtrainingprogram">
                                <Button className='bg-services col-4' variant="contained" endIcon={<AddIcon />}>
                                    Add Traning Program
                                </Button>
                              </Link> */}

              <Button endIcon={<AddIcon />}  className='bg-services col-4' variant="contained" onClick={showModal}>
                <Typography className='' style={{textTransform: 'capitalize', fontSize: 12}}>Add Traning Program</Typography>
              </Button>
            
                    <Modal className='modal-radius' centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <div className='row'>
                    <div className='col-12 col-md-6'>
                                <label htmlFor="">Service Type *</label>
                                <br />
                                <Radio.Group onChange={onChange} value={value}> 
                                                <Radio className='radio' value={1}> <span className='ms-1'>One-Site</span></Radio>
                                                <Radio value={2} className='radio mt-3'><span className='ms-1'>Off-Site</span></Radio>
                                            </Radio.Group>
                            </div>

                            <div className='col-12 col-md-6'>
                                <label htmlFor="">Recurring Program *</label>
                                <br />
                                <Radio.Group onChange={onChange1} value={value1}> 
                                                <Radio className='radio' value={1}> <span className='ms-1'>Yes</span></Radio>
                                                <Radio value={2} className='radio mt-3'><span className='ms-1'>No</span></Radio>
                                            </Radio.Group>
                            </div>

                            <div className='col-12 col-md-6 mt-4'>
                                <label htmlFor="">One-Site-Price *</label>
                                <br />
                               
                              
                                  <Input onKeyPress={(event) => {
                                              if (!/[0-9]/.test(event.key)) {
                                              event.preventDefault();
                                              }
                                          }} className='walking-forms' placeholder='$99' />
                               
                            </div>

                            <div className='col-12 col-md-6 mt-4'>
                                <label htmlFor="">Program Name *</label>
                                <br />
                                <Input className='walking-forms' placeholder='Walking' />
                            </div>

                            <div className='col-12 col-md-6 mt-3'>
                                <label htmlFor="">Class Frequency *</label>
                                <br />
                                <div className='mt-2'>
                                <div className='d-flex f-bold flex-row'>
                                  {frequencys.map((days, index) => selectedfrequencys(days))}
                                </div>
                                </div>
                            </div>

                            <div className='col-12 col-md-6 mt-3'>
                                <label htmlFor="">Class Timings *</label>
                                <br />
                                <div className='mt-2'>
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
                            </div>

                            <div className='col-12 col-md-6 mt-4'>
                                <Select onChange={stateChange} className="walking-select col-12" defaultValue="Select State">
                                {states.map((state) => (
                                  <Option value={state.name}>{state.name}</Option>
                                ))}
                                </Select>
                            </div>

                            
                            <div className='col-12 col-md-6 mt-4'>
                                <Select onChange={zipcodeChange} className="walking-select col-12" defaultValue="Select City">
                                {cities.map((city) => (
                                  <Option value={city.name}>{city.name}</Option>
                                ))}
                                </Select>
                            </div>

                            <div className='col-12 col-md-6 mt-4'>
                                <Select  className="walking-select col-12" defaultValue="Zip Code">
                                {zipcodes.map((zip) => (
                                  <Option value={zip.zipcode}>{zip.zipcode}</Option>
                                ))}
                                </Select>
                            </div>

                            <div className='col-12 col-md-6 mt-4'>
                               <Input className='walking-forms' placeholder='Address *' />
                            </div>
                            <div className='col-12 col-md-12 mt-4'>
                                <label htmlFor="">Description *</label>
                                <TextArea 
                                 rows={4} 
                                 className='text-area'
                                 maxLength="1800"
                                 onChange={handleWordCount}
                                />
                                   <p className='mt-2 float-end'><span className='text-danger'>{chars_left}</span> - 1800 </p>
                            </div>

                          
                                <div className='col-12 col-md-12 mt-4'>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <Button className='actives button-radius fonted col-2'>Add</Button>
                                        <Button onClick={handleCancel} className='font-black'>Cancel</Button>
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

const weekly = [];
const weeklyDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",];

const selectWeeklyDays = day => {
  console.log("day", day);
  let wD = weekly;
  let index = wD.findIndex(d => d === day);
  if (index > -1) {
    wD.splice(index, 1);
  } else {
    wD.push(day);
  }

  const dayElement = document.getElementById(day);
  dayElement.classList.toggle("selected-day");

  
  console.log("wD", weekly);
};

const selectedWeeklydays = days => {
  let index = weekly.findIndex(d => days.value === d);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(days, "INSIE INDEX COLOR");
  }
  console.log(days);
  return (
    <Avatar
      id={days}
      onClick={() => selectWeeklyDays(days)}
      className="week-days"
      key={days}
    >
      {days}
    </Avatar>
  );
};

const animel = [];
const animels = ["Cat", "Elephant", "Horse", "Dog"];

const selectAnimel = day => {
  console.log("day", day);
  let wD = animel;
  let index = wD.findIndex(d => d === day);
  if (index > -1) {
    wD.splice(index, 1);
  } else {
    wD.push(day);
  }

  const dayElement = document.getElementById(day);
  dayElement.classList.toggle("selected-day");

  
  console.log("wD", animel);
};

const selectedAnimel = days => {
  let index = animel.findIndex(d => days.value === d);

  console.log(index, "index");
 
  if (index > -1) {
    console.log(days, "INSIE INDEX COLOR");
  }
  console.log(days);
  return (
    <Avatar
      id={days}
      onClick={() => selectAnimel(days)}
      className="week-days"
      key={days}
    >
      {days}
    </Avatar>
  );
};

function TeamMembers() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(1)
  const [startSelectedTime, setStartSelectedTime] = useState("00:00")
  const [endSelectedTime, setEndSelectedTime] = useState("00:00")



  const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    }

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
                    listType="picture-card "
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
                    <Input  onKeyPress={(event) => {
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
                      {weekDays.map((days, index) => selectedWeeklydays(days))}
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
                  <div className='col-12 col-md-6 mt-4'>
                  <label htmlFor="">Service Type *</label>
                                            <br />
                                            <Radio.Group onChange={onChange} value={value}> 
                                                            <Radio className='radio' value={1}> <span className='ms-1'>One-Site</span></Radio>
                                                            <Radio value={2} className='radio mt-3'><span className='ms-1'>Off-Site</span></Radio>
                                                            <Radio value={3} className='radio mt-3'><span className='ms-1'>Both</span></Radio>
                                                        </Radio.Group>
                  </div>
                  <div className='col-12 col-md-12 mt-4'>
                    <label htmlFor="">Animal Type *</label>
                    <br />
                    <div className='mt-2'>
                        <div className='d-flex f-bold flex-row'>
                          {animels.map((days, index) => selectedAnimel(days))}
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(1)
  const [startSelectedTime, setStartSelectedTime] = useState("00:00")
  const [endSelectedTime, setEndSelectedTime] = useState("00:00")

  const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    }

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
  return(
    <>
       <div className='container-fluid g-0'>
          <div className='row'>
            <div className='col-12 col-md-12'>
            <h6>Manage Team Members</h6>
            <div className='mt-2'>
            <Button endIcon={<AddIcon />} className='outline-border mt-3 col-8' variant="outlined" color="primary"  onClick={showModal}>
              <Typography className='' style={{textTransform: 'capitalize', fontSize: 12}}>Add another member</Typography>
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
                    listType="picture-card "
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
                    <Input  onKeyPress={(event) => {
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
                      {weekDays.map((days, index) => selectedWeeklydays(days))}
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
                  <div className='col-12 col-md-6 mt-4'>
                  <label htmlFor="">Service Type *</label>
                                            <br />
                                            <Radio.Group onChange={onChange} value={value}> 
                                                            <Radio className='radio' value={1}> <span className='ms-1'>One-Site</span></Radio>
                                                            <Radio value={2} className='radio mt-3'><span className='ms-1'>Off-Site</span></Radio>
                                                            <Radio value={3} className='radio mt-3'><span className='ms-1'>Both</span></Radio>
                                                        </Radio.Group>
                  </div>
                  <div className='col-12 col-md-12 mt-4'>
                    <label htmlFor="">Animal Type *</label>
                    <br />
                    <div className='mt-2'>
                        <div className='d-flex f-bold flex-row'>
                          {animels.map((days, index) => selectedAnimel(days))}
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
                  <AddCategory />
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
                 <TeamMembers />
                 </motion.div>
                </>
            )

            case 4 :
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
export default function PetTraning() {
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isStepOptional = (step) => {
        return step === 0 || step === 1 || step === 2 || step === 3
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
                   
           
        </>
    )
}
