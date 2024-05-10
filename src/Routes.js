import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Homepage from './pages/index';
import AppointmentID from "./pages/appointment";
import PatientID from "./pages/patient";
import WorkerID from "./pages/worker";
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import Worker from "./pages/auth/register-worker"
import Data from "./pages/auth/register/bio-data"
import Data2 from "./pages/auth/register/bio-data2"
import Kin from "./pages/auth/register/next-of-kin"
import Dashboard from "./pages/dashboard"
import Admin from "./pages/dashboard/admin"
import Password from "./pages/dashboard/password"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Homepage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/appointment/:id" element={<AppointmentID />} />
      <Route path="/worker/:id" element={<WorkerID />} />
      <Route path="/patient/:id" element={<PatientID />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/register-worker" element={<Worker />} />
      <Route path="/auth/register/bio-data" element={<Data />} />
      <Route path="/auth/register/bio-data2" element={<Data2 />} />
      <Route path="/auth/register/next-of-kin" element={<Kin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/admin" element={<Admin />} />
      <Route path="/dashboard/password" element={<Password />} />
    </Route>
  )
);

export default router;
