import React from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Typography } from '@mui/material'
import "./Dashboard.css";

const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F", "#FF6384"];

const Dashboard = () => {
  const transactions = useSelector((state) => state.transactions);

  const expenses = transactions.filter((t) => t.type === "Expense");
  const income = transactions.filter((t) => t.type === "Income");

  // Group expenses by category
  const expenseByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});
  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // Group by month
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  const barData = months.map((month, idx) => {
    const exp = expenses
      .filter((t) => new Date(t.date).getMonth() === idx)
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const inc = income
      .filter((t) => new Date(t.date).getMonth() === idx)
      .reduce((sum, t) => sum + Number(t.amount), 0);
    return { month, Expense: exp, Income: inc };
  });

  return (
    <div className="dashboard-wrapper">
      <Typography variant="h3" gutterBottom>
      Financial Snapshot
      </Typography>
      <div className="dashboard-container">
        {/* Pie Chart */}
        <div className="chart-box">
          <h3 className="chart-title">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData.length ? pieData : [{ name: "No Expenses", value: 1 }]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={pieData.length ? true : false}
              >
                {(pieData.length ? pieData : [{ name: "No Expenses", value: 1 }]).map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={pieData.length ? COLORS[index % COLORS.length] : "#ccc"}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-box">
          <h3 className="chart-title">Monthly Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#0088FE" />
              <Bar dataKey="Expense" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
