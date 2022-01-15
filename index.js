const express = require("express");
const app = express();
const { userRegister, userLogin } = require("./modules/user/user")
const { boardRouter, createBoardRouter, boardDetailsRouter, createTask, removeTask, deleteBoard } = require("./modules/boards/boards");
const bodyParser = require("body-parser")
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use("/register", userRegister);
app.use("/login", userLogin);
app.use("/myboards", boardRouter);
app.use("/myboards/delete-board", deleteBoard);
app.use("/myboards/createboard", createBoardRouter);
app.use("/myboards/board-details", boardDetailsRouter);
app.use("/myboards/board-details/create-task", createTask);
app.use("/myboards/board-details/remove-task", removeTask);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("server started at port ", PORT));