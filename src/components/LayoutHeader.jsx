import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'


export default function LayoutHeader() {
const location = useLocation()
const navigate = useNavigate()
const pathToIndex = {
'/dashboard': 0,
'/add': 1,
'/history': 2,
}
const index = pathToIndex[location.pathname] ?? 0


const handleChange = (e, newValue) => {
    const map = ['/dashboard', '/add', '/history']
    navigate(map[newValue])
}


    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <Typography variant="h6" sx={{ mr: 3 }}>
                Finance Tracker
                </Typography>
                <Tabs value={index} onChange={handleChange} textColor="primary" indicatorColor="primary">
                <Tab label="Dashboard" />
                <Tab label="Add Transaction" />
                <Tab label="Transaction History" />
            </Tabs>
            </Toolbar>
        </AppBar>
    )
}