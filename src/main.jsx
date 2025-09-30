import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import store from './store'
import { ThemeProvider } from "@mui/material/styles";
import theme from './styles/theme'


createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
</React.StrictMode>
)