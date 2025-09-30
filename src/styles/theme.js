// theme.js
import { createTheme, keyframes } from "@mui/material/styles";

// Define a fade-up animation for headings
const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#167D7F", // Teal Green
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#98D7C2", // Spearmint
      contrastText: "#064E3B",
    },
    background: {
      default: "#EEEDE7", // Ivory background
      paper: "#FFFFFF",   // Cards/Modals
    },
    success: {
      main: "#29A0B1", // Teal highlight
    },
    error: {
      main: "#DC2626", // Red for expenses
    },
    text: {
      primary: "#167D7F",
      secondary: "#374151",
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.2rem",
      color: "#167D7F",
      letterSpacing: "1px",
      marginBottom: "16px",
      animation: `${fadeUp} 0.6s ease-out forwards`,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.8rem",
      color: "#167D7F",
      letterSpacing: "0.8px",
      marginBottom: "14px",
      animation: `${fadeUp} 0.6s ease-out forwards`,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.4rem",
      color: "#167D7F",
      letterSpacing: "0.5px",
      marginBottom: "20%",
      paddingBottom:"3%",
      animation: `${fadeUp} 0.6s ease-out forwards`,
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.2rem",
      color: "#374151",
      letterSpacing: "0.3px",
      marginBottom: "10px",
      animation: `${fadeUp} 0.6s ease-out forwards`,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.2rem",
      color: "#FFFFFF",
      letterSpacing: "0.3px",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
      color: "#374151",
      letterSpacing: "0.2px",
      marginBottom: "6px",
      animation: `${fadeUp} 0.6s ease-out forwards`,
    },
    body1: {
      fontSize: "1rem",
      color: "#374151",
    },
    body2: {
      fontSize: "0.9rem",
      color: "#374151",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#167D7F",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        gutterBottom: true, // Adds bottom margin to all Typography by default
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 20px",
        },
        containedPrimary: {
          background: "#167D7F",
          "&:hover": { background: "#29A0B1" },
        },
        containedSecondary: {
          background: "#98D7C2",
          color: "#064E3B",
          "&:hover": { background: "#7CC2AE" },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: "48px",
        },
        indicator: {
          display: "none", // remove default underline
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: "1rem",
          color: "#EEEDE7", // unselected tabs → Ivory
          textTransform: "none",
          "&.Mui-selected": {
            color: "#29A0B1", // selected tab → Teal
            fontWeight: 600,
          },
        },
      },
    },
  },
});

export default theme;
