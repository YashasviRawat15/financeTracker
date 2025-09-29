import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTransaction } from '../features/transactions/transactionsSlice'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'


const categories = ['Groceries','Rent','Salary','Utilities','Dining out','Transport','Other']


export default function AddTransaction() {
const dispatch = useDispatch()
const [form, setForm] = useState({ description: '', amount: '', type: 'Expense', category: 'Other', date: '' })


const onChange = (e) => setForm(prev => ({...prev, [e.target.name]: e.target.value }))


const onSubmit = (e) => {
    e.preventDefault()
    if (!form.description || !form.amount || !form.date) return alert('Please fill required fields')
    dispatch(addTransaction(form))
    setForm({ description: '', amount: '', type: 'Expense', category: 'Other', date: '' })
    alert('Transaction added')
}


return (
    <Paper sx={{ p: 3 }}>
        <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Description" name="description" value={form.description} onChange={onChange} required />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField fullWidth label="Amount" name="amount" type="number" value={form.amount} onChange={onChange} required />
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField select fullWidth label="Type" name="type" value={form.type} onChange={onChange}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </TextField>
                </Grid>


                <Grid item xs={6} md={4}>
                    <TextField select fullWidth label="Category" name="category" value={form.category} onChange={onChange}>
                        {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </TextField>
                </Grid>


                <Grid item xs={6} md={4}>
                    <TextField fullWidth label="Date" name="date" type="date" InputLabelProps={{ shrink: true }} value={form.date} onChange={onChange} />
                </Grid>


                <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="contained" type="submit">Add Transaction</Button>
                </Grid>
            </Grid>
        </form>
    </Paper>
)
}