import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function LayoutHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const pathToIndex = {
    '/dashboard': 0,
    '/add': 1,
    '/history': 2,
  }

  const index = pathToIndex[location.pathname] ?? 0
  const [open, setOpen] = useState(false)

  const handleChange = (e, newValue) => {
    const map = ['/dashboard', '/add', '/history']
    navigate(map[newValue])
  }

  const handleMenuClick = (path) => {
    navigate(path)
    setOpen(false)
  }

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            FinanceTracker
          </Typography>

          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(!open)}
              sx={{ color: "#EEEDE7" }} 
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : (
            <Tabs
              value={index}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{ marginLeft: 'auto' }}
            >
              <Tab label="Dashboard" />
              <Tab label="Add Transaction" />
              <Tab label="Transaction History" />
            </Tabs>
          )}
        </Toolbar>
      </AppBar>

      {/* Full-width dropdown for mobile */}
      {isMobile && open && (
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button onClick={() => handleMenuClick('/dashboard')}>
            Dashboard
          </Button>
          <Button onClick={() => handleMenuClick('/add')}>
            Add Transaction
          </Button>
          <Button onClick={() => handleMenuClick('/history')}>
            Transaction History
          </Button>
        </Box>
      )}
    </>
  )
}
