const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const createDeveloper = require("./utils/createDeveloper");

// Routes
const authRoutes = require("./routes/authRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();

// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =====================================
// ROOT ROUTE
// =====================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Real Estate ERP API Running",
    version: "1.0.0",
    environment:
      process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// =====================================
// API ROUTES
// =====================================

// Authentication
app.use("/api/auth", authRoutes);

// Agency Management
app.use("/api/agencies", agencyRoutes);

// Employee Management
app.use("/api/employees", employeeRoutes);

// Attendance Management
app.use("/api/attendance", attendanceRoutes);

// Property Management
app.use("/api/properties", propertyRoutes);

// Future Modules
// app.use("/api/leads", leadRoutes);
// app.use("/api/requirements", requirementRoutes);
// app.use("/api/payroll", payrollRoutes);
// app.use("/api/commissions", commissionRoutes);

// =====================================
// 404 ROUTE
// =====================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =====================================
// START SERVER
// =====================================

const startServer = async () => {
  try {
    // MongoDB Connection
    await connectDB();

    // Create Default Developer
    await createDeveloper();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log("=================================");
      console.log("Real Estate ERP Server Started");
      console.log(`Port: ${PORT}`);
      console.log(
        `Environment: ${
          process.env.NODE_ENV || "development"
        }`
      );
      console.log("=================================");
      console.log("Loaded Modules:");
      console.log("✓ Authentication");
      console.log("✓ Agency Management");
      console.log("✓ Employee Management");
      console.log("✓ Attendance Management");
      console.log("✓ Property Management");
      console.log("=================================");
    });
  } catch (error) {
    console.error("=================================");
    console.error("Server Startup Failed");
    console.error(error.message);
    console.error("=================================");
    process.exit(1);
  }
};

startServer();