import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import App from './components/app/App';
import Navbar from './components/navbar/Navbar';
import Admin from './components/admin/Admin';
import Tickets from './components/tickets/tickets';
import Ticket from './components/tickets/ticket';
import Profile from './components/profile/profile';
import { UserProvider, useUserContext } from './utils/user.context';
import SpaceComponent from './components/spaces/spaces';
import Visit from './components/visit/visit';
import SideBar from './components/admin/sidebar/SideBar';
import GestionSpaces from './components/admin/spaces/SpaceGestion';
import { UserRole } from './dto';
import AnimalsGestion from './components/admin/animals/AnimalsGestion';
import UsersList from './components/admin/users/UsersList';
import AnimalsComponent from './components/animals/animals';
import { TreatmensComponent } from './components/treatmens/treatmens';
import Error404 from './components/404/404';

const AdminWrapper = () => {
  const { data } = useUserContext().user;
  return (
    <>
      {data?.role === UserRole.ADMIN ?
        <>
          <SideBar />
          <div className="flex bg-teal-50">
            <div className="mr-60" />
            <Outlet />
          </div>
        </>
        :
        <Error404 />
      }
    </>
  );
}

const VeterinarianWrapper = () => {
  const { data } = useUserContext().user;
  return (
    <div className='mr-32'>
      {data?.role === UserRole.VETERINARIAN ?
        <AnimalsGestion />
        :
        <Error404 />
      }
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />

          {/* Alaeddine */}
          <Route path="/Admin" element={<Admin />} />
          <Route path="/animals" element={<AnimalsComponent />} />
          <Route path="/treatmens/:animalid" element={<TreatmensComponent />} />

          <Route path="/Space/:id" element={<SpaceComponent />} />
          <Route path="/Tickets" element={<Tickets />} />
          <Route path="/Tickets/:index" element={<Ticket />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path='/Visit' element={<Visit />} />

          <Route path='/Admin/' element={<AdminWrapper />} >
            <Route path='Spaces' element={<GestionSpaces />} />
            <Route path='Animals' element={<AnimalsGestion />} />
            <Route path='Users' element={<UsersList />} />
          </Route>

          <Route path='/Veterinarian' element={<VeterinarianWrapper />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
