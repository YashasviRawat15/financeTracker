import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import LayoutHeader from './components/LayoutHeader'
import Dashboard from './components/Dashboard'
import AddTransaction from './components/AddTransaction'
import TransactionHistory from './components/TransactionHistory'


export default function App() {
return (
<div>
  <LayoutHeader />
  <Container sx={{ mt: 3 }}>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddTransaction />} />
      <Route path="/history" element={<TransactionHistory />} />
    </Routes>
  </Container>
</div>
)
}