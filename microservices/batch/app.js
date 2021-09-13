const express = require("express");
const app = express();
const PORT = 3003;
const { mongodb, User } = require("./model");
app.use(express.json());

// ROUTER BEGIN
app.get("/", (_, res) => {
    res.status(200).json({
        meta: {
            success: true,
            status: 200,
            description: "Server Batch running",
        },
        body: null,
    });
});

app.get("/batch", (_, res, next) => {
    User.findAll()
        .then((data) => {
            res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    description: "Success get users data",
                },
                body: {
                    batch: data,
                },
            });
        })
        .catch(next);
});
// ROUTER END

// ERR HANDLER BEGIN
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        meta: {
            success: false,
            status: 500,
            description: "Internal Server Error",
        },
        body: {
            error: err,
        },
    });
});
// ERR HANDLER END

mongodb
    .run()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server Batch Run on :: " + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
