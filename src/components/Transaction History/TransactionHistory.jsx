import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableFooter, Paper, Button, IconButton, TableSortLabel, Typography,
  TextField, Pagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTransaction, clearTransactions } from "../../features/transactions/transactionsSlice";
import "./TransactionHistory.css";
import Toast from "../../components/Toast/Toast";

const TransactionHistory = () => {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const rowsPerPage = 5;

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
    setToast({ open: true, message: "Transaction deleted", severity: "warning" });
  };

  const handleClearAll = () => {
    if (!transactions.length) {
      setToast({ open: true, message: "No transactions to delete", severity: "error" });
      return;
    }
    dispatch(clearTransactions());
    setToast({ open: true, message: "All transactions cleared", severity: "warning" });
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
          onClick={handleClearAll}
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
                      currency: "INR",
                    })}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(transaction.id)}
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
                <Typography variant="h6" component="span" sx={{ fontWeight: "bold", color: "black" }}>
                  Balance:{" "}
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ color: balance >= 0 ? "#167D7F" : "#dc2626", fontWeight: "bold", marginLeft: 1 }}
                >
                  {balance.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
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

      {/* ✅ Toast Notification */}
      <Toast open={toast.open} onClose={() => setToast({ ...toast, open: false })} message={toast.message} severity={toast.severity} />
    </div>
  );
};

export default TransactionHistory;
