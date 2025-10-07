import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableFooter, Paper, Button, IconButton, TableSortLabel, Typography,
  TextField, Pagination, Dialog, DialogActions, DialogContent,
  DialogTitle, MenuItem, Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteTransaction,
  clearTransactions,
  updateTransaction
} from "../../features/transactions/transactionsSlice";
import "./TransactionHistory.css";
import Toast from "../../components/Toast/Toast";

const categories = [
  "Groceries",
  "Rent",
  "Salary",
  "Utilities",
  "Dining out",
  "Transport",
  "Other"
];

const TransactionHistory = () => {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const rowsPerPage = 5;

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDeleteClick = (id) => {
    setTransactionToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTransaction(transactionToDelete));
    setToast({ open: true, message: "Transaction deleted", severity: "warning" });
    setDeleteConfirmOpen(false);
    setTransactionToDelete(null);
  };

  const handleClearAllClick = () => {
    if (!transactions.length) {
      setToast({ open: true, message: "No transactions to delete", severity: "error" });
      return;
    }
    setClearConfirmOpen(true);
  };

  const confirmClearAll = () => {
    dispatch(clearTransactions());
    setToast({ open: true, message: "All transactions cleared", severity: "warning" });
    setClearConfirmOpen(false);
  };

  const handleEditClick = (transaction) => {
    setEditData({ ...transaction });
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    if (
      !editData.description.trim() ||
      !editData.amount ||
      !editData.type ||
      !editData.category ||
      !editData.date
    ) {
      setToast({
        open: true,
        message: "All fields are required",
        severity: "error"
      });
      return;
    }
    dispatch(updateTransaction(editData));
    setToast({
      open: true,
      message: "Transaction updated successfully",
      severity: "success"
    });
    setEditDialogOpen(false);
  };

  const filteredTransactions = transactions.filter(
    (t) =>
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (orderBy === "amount") {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    if (orderBy === "date") {
      return order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const paginatedTransactions = sortedTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const balance = transactions.reduce((acc, t) => {
    return t.type.toLowerCase() === "income"
      ? acc + Number(t.amount)
      : acc - Number(t.amount);
  }, 0);

  return (
    <div className="transaction-history-container">
      <Typography variant="h3" gutterBottom>
        Past Transactions
      </Typography>

      <div className="search-clear-container">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="outlined"
          color="error"
          className="clear-button"
          onClick={handleClearAllClick}
        >
          Clear All
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={orderBy === "amount"}
                  direction={orderBy === "amount" ? order : "asc"}
                  onClick={() => handleSort("amount")}
                >
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTransactions.length ? (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    {Number(transaction.amount).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR"
                    })}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(transaction)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(transaction.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  Balance:{" "}
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    color: balance >= 0 ? "#167D7F" : "#dc2626",
                    fontWeight: "bold",
                    marginLeft: 1
                  }}
                >
                  {balance.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR"
                  })}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(sortedTransactions.length / rowsPerPage)}
        page={page}
        onChange={(e, value) => setPage(value)}
        className="pagination"
      />

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          {editData && (
            <>
              <TextField
                margin="dense"
                label="Description"
                name="description"
                fullWidth
                value={editData.description}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Amount"
                name="amount"
                type="number"
                fullWidth
                value={editData.amount}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                select
                label="Type"
                name="type"
                fullWidth
                value={editData.type}
                onChange={handleEditChange}
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                select
                label="Category"
                name="category"
                fullWidth
                value={editData.category}
                onChange={handleEditChange}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                label="Date"
                name="date"
                type="date"
                fullWidth
                value={editData.date.split("T")[0]}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Are you sure you want to delete this transaction?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={clearConfirmOpen} onClose={() => setClearConfirmOpen(false)}>
        <DialogTitle>Confirm Clear All</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Are you sure you want to clear all transactions?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmClearAll} color="error" variant="contained">
            Clear All
          </Button>
        </DialogActions>
      </Dialog>

      <Toast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </div>
  );
};

export default TransactionHistory;
