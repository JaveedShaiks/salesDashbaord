import { useState } from 'react'
import './App.css'
import Dashboard from './components/dashboard';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

function App() {

  return (
   <>
   <div className="header"> <h4>Sales Report Dashbaord</h4></div>
      <Dashboard />
  </>
  );
}

export default App
