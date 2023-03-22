const express = require("express");
const cors = require("cors");
const contactRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
const app = express();


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Wellcome to contact book application." });
});

app.use("/api/contacts", contactRouter);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// define error-handling middlware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});



module.exports = app;