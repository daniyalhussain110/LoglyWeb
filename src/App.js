import React, { Suspense, Lazy, lazy } from 'react'
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {AnimatePresence} from 'framer-motion'

import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import NotFound from './screens/NotFound/NotFound';
import WelcomeScreen from './screens/Pages/WelcomeScreen';
import PriceList from './screens/Pages/PriceList';
import RegisteredDetails from './screens/Pages/RegisteredDetails';
import EmailVerification from './screens/Pages/EmailVerification';
import CreditCard from './screens/Pages/CreditCard';
import ThankYou_Registrations from './screens/Pages/ThankYou_Registrations';
import ForgotPassword from './screens/Pages/ForgotPassword';
import OtpVerification from './screens/Pages/OtpVerification';
import ResetPassword from './screens/Pages/ResetPassword';
import SuccessPassword from './screens/Pages/SuccessPassword';
import Packages from './screens/Pages/Packages';
import PetLover from './screens/Pages/AccountTypes/PetLover';
import PetLoverForms from './screens/Pages/AccountTypes/PetLoverForms';
import BusinessListing from './screens/Pages/AccountTypes/BusinessListing';
import BusinessAccount from './screens/Pages/AccountTypes/BusinessAccount';
import Calender from './screens/Pages/AccountTypes/Calender';
import CharityAccount from './screens/Pages/AccountTypes/CharityAccount';
import BusinessServiceProvider from './screens/Pages/AccountTypes/BusinessServiceProvider';
import AddTeamMembers from './screens/Pages/TeamMembers/AddTeamMembers';
import CharityTeamMembers from './screens/Pages/TeamMembers/CharityTeamMembers';
import ListiningTeamMembers from './screens/Pages/TeamMembers/ListiningTeamMembers';
import AddServices from './screens/Pages/AddServices';
import BusinessProviderServicesForms from './screens/Pages/TeamMembers/BusinessProviderServicesForms';
import Transportation from './screens/Pages/OnBording/Transportation';
import PetTraning from './screens/Pages/OnBording/PetTraning';
import PetWalking from './screens/Pages/OnBording/PetWalking';
import Breeding from './screens/Pages/OnBording/Breeding';
import PetBoarding from './screens/Pages/OnBording/PetBoarding';
import PetGrooming from './screens/Pages/OnBording/PetGrooming';
import Veterinary from './screens/Pages/OnBording/Veterinary';
import VechicleForms from './screens/Pages/OnBording/VechicleForms';
import PetGroomingCalender from './screens/Pages/Calender/PetGroomingCalender';
import VeterniaryCalender from './screens/Pages/Calender/VeterniaryCalender';
import PetTransportationCalender from './screens/Pages/Calender/PetTransportationCalender'
import PetTrainingCalender from './screens/Pages/Calender/PetTrainingCalender';
import PetWalkingCalender from './screens/Pages/Calender/PetWalkingCalender';
import PetBreedingCalender from './screens/Pages/Calender/PetBreedingCalender';
import PetBoardingCalender from './screens/Pages/Calender/PetBoardingCalender';
import AddTrainingProgram from './screens/Pages/Forms/AddTrainingProgram';
import AddWalkingProgram from './screens/Pages/Forms/AddWalkingProgram';
import AddBreedingForms from './screens/Pages/Forms/AddBreedingForms';
import AddBoardingForms from './screens/Pages/Forms/AddBoardingForms';
import AddTransportTeamMember from './screens/Pages/TeamMembers/AddTransportTeamMember';
import AddTrainingTeamMember from './screens/Pages/TeamMembers/AddTrainingTeamMember';
import AddWalkingTeamMember from './screens/Pages/TeamMembers/AddWalkingTeamMember';
import AddBreedingTeamMember from './screens/Pages/TeamMembers/AddBreedingTeamMember';
import AddBoardingTeamMember from './screens/Pages/TeamMembers/AddBoardingTeamMember';
import ResetEmailVerification from './screens/Pages/ResetEmailVerification';

import { Provider } from 'react-redux';
import store from './store/store'

// const Spinner = lazy(() => import('./screens/Spinner/spinner'));
// const login = lazy(() => import('./screens/Auth/Login'));

function App() {
  return (
    <>
      <Provider store={store}>
      <Router>
         <AnimatePresence>
           {/* <Suspense fallback={<></>}>
             <Spinner> */}
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/welcome" component={WelcomeScreen} />Pet
                  <Route path="/pricelist" component={PriceList} />
                  <Route path="/registeation" component={EmailVerification} />
                  <Route path="/creditcard" component={CreditCard} />
                  <Route path="/registereddetails" component={RegisteredDetails} />
                  <Route path="/verification" component={EmailVerification} />
                  <Route path="/forgotpassword" component={ForgotPassword} />
                  <Route path="/otp" component={OtpVerification} />
                  <Route path="/resetpassword" component={ResetPassword} />
                  <Route path="/successpassword" component={SuccessPassword} />
                  <Route path="/packages" component={Packages} />
                  <Route path="/petlover" component={PetLover} />
                  <Route path="/petloverform" component={PetLoverForms} />
                  <Route path="/businesslisting" component={BusinessListing} />
                  <Route path="/businessaccount" component={BusinessAccount} />
                  <Route path="/calender" component={Calender} />
                  <Route path="/thankyou" component={ThankYou_Registrations} />
                  <Route path="/charityaccount" component={CharityAccount} />
                  <Route path="/businessprovider" component={BusinessServiceProvider} />
                  <Route path="/addteamMembers" component={AddTeamMembers} />
                  <Route path="/charityTeamMembers" component={CharityTeamMembers} />
                  <Route path="/listiningTeamMembers" component={ListiningTeamMembers} />
                  <Route path="/petgrooming" component={PetGrooming} />
                  <Route path="/BusinessProviderServicesForms" component={BusinessProviderServicesForms} />
                  <Route path="/addservices" component={AddServices} />
                  <Route path="/transportation" component={Transportation} />
                  <Route path="/pettraining" component={PetTraning} />
                  <Route path="/petwalking" component={PetWalking} />
                  <Route path="/breeding" component={Breeding} />
                  <Route path="/petboarding" component={PetBoarding} />
                  <Route path="/petgrooming" component={PetGrooming} />
                  <Route path="/veterniary" component={Veterinary} />
                  <Route path="/vechicleforms" component={VechicleForms} />
                  <Route path="/petgroomingcalender" component={PetGroomingCalender} />
                  <Route path="/veterniarycalender" component={VeterniaryCalender} />
                  <Route path="/pettransportationcalender" component={PetTransportationCalender} />
                  <Route path="/pettrainingcalender" component={PetTrainingCalender} />
                  <Route path="/petwalkingcalender" component={PetWalkingCalender} />
                  <Route path="/petbreedingcalender" component={PetBreedingCalender} />
                  <Route path="/petboardingcalender" component={PetBoardingCalender} />
                  <Route path="/addtrainingprogram" component={AddTrainingProgram} />
                  <Route path="/addwalkingprogram" component={AddWalkingProgram} />
                  <Route path="/addbreedingforms" component={AddBreedingForms} />
                  <Route path="/addboardingforms" component={AddBoardingForms} />
                  <Route path="/addtransportteammember" component={AddTransportTeamMember} />
                  <Route path="/addtrainingteammember" component={AddTrainingTeamMember} />
                  <Route path="/addwalkingteammember" component={AddWalkingTeamMember} />
                  <Route path="/addbreedingteammember" component={AddBreedingTeamMember} />
                  <Route path="/addboardingteammember" component={AddBoardingTeamMember} />
                  <Route path="/resetEmailVerification" component={ResetEmailVerification} />
                  <Route component={NotFound} />
                </Switch>
              {/* </Spinner>
            </Suspense> */}
          </AnimatePresence>
           
      </Router>
      </Provider>
    </>
  );
}

export default App;
