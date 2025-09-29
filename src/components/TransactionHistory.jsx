import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TableSortLabel,
  Typography,
  TextField,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTransaction, clearTransactions } from "../features/transactions/transactionsSlice";

const TransactionHistory = () => {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));  // ✅ deletes only one transaction
  };

  const filteredTransactions = transactions.filter(
    (t) =>
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (orderBy === "amount") {
      return order === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
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

  const handleClearAll = () => {
    if (!transactions.length) {
      alert("No transactions to delete"); 
      return;
    }
  
    if (window.confirm("Are you sure you want to clear all transactions?")) {
      dispatch(clearTransactions());
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Transaction History
      </Typography>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="outlined"
          color="error"
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
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
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
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(sortedTransactions.length / rowsPerPage)}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default TransactionHistory;
