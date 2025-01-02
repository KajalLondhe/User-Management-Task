"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbconnect_1 = require("./Config/dbconnect");
const authRoute_1 = __importDefault(require("./Routes/authRoute")); // Import auth routes
const projectRoutes_1 = __importDefault(require("./Routes/projectRoutes"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
dbconnect_1.dbconnection;
app.use(express_1.default.json()); // Middleware for parsing JSON request body
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use('/api/auth', authRoute_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
