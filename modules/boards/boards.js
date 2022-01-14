const express = require("express");
const boardRouter = express.Router();
const createBoardRouter = express.Router();
const boardDetailsRouter = express.Router();
const createTask = express.Router();
const removeTask = express.Router();
const verifyToken = require("../verifyToken");


const userBoards = [
    {
        userId: 0,
        boards: [

        ]
    }
];


removeTask.post("/", (req, res) => {
    const token = req.body.token;
    const boardId = req.body.task.boardId;
    const taskId = req.body.task.id;
    const status = req.body.task.status;
    const { isLoggedIn, id } = verifyToken(token);
    if (isLoggedIn) {
        userBoards.map((user) => {
            if (user.userId === id) {
                // console.log(user);
                user.boards.map((board) => {
                    if (board.boardId === boardId) {
                        // console.log(board);
                        if (status === 0) {

                            let removedTask = board.boardDetails[status].TO_DO[taskId];
                            // console.log(removedTask);
                            board.boardDetails[status].TO_DO.splice(taskId, 1);
                            board.boardDetails[1].IN_PROGRESS.push(removedTask);
                            res.send(board);
                        }
                        else if (status === 1) {
                            let removedTask = board.boardDetails[status].IN_PROGRESS.splice(taskId, 1)
                            board.boardDetails[2].ON_HOLD.push(removedTask);
                            res.send(board);

                        }
                        else if (status === 2) {
                            let removedTask = board.boardDetails[status].ON_HOLD.splice(taskId, 1)
                            board.boardDetails[3].COMPLETED.push(removedTask);
                            res.send(board);

                        }
                        else if (status === 3) {
                            let removedTask = board.boardDetails[status].COMPLETED.splice(taskId, 1)
                            board.boardDetails[4].RELEASED.push(removedTask);
                            res.send(board);

                        }
                        else if (status === 4) {
                            board.boardDetails[status].RELEASED.splice(taskId, 1)
                            res.send(board);

                        }
                    }
                });
            }
        });
        // res.send("hi")
    }
    else {
        res.send("SESSION_EXPIRED");
    }
})


createTask.post("/", (req, res) => {
    const token = req.body.token;
    const boardId = req.body.newTask.boardId;
    const status = req.body.newTask.status;
    const task = req.body.task;
    // console.log(status);
    const { isLoggedIn, id } = verifyToken(token);
    if (isLoggedIn) {
        userBoards.map((user) => {
            if (user.userId === id) {
                // console.log(user);
                user.boards.map((board) => {
                    if (board.boardId === boardId) {
                        // board.boardDetails[status].
                        // console.log(board.boardDetails[status]);

                        // console.log(task);

                        if (status === 0)
                            board.boardDetails[status].TO_DO.push(task);
                        else if (status === 1)
                            board.boardDetails[status].IN_PROGRESS.push(task);
                        else if (status === 2)
                            board.boardDetails[status].ON_HOLD.push(task);
                        else if (status === 3)
                            board.boardDetails[status].COMPLETED.push(task);
                        else if (status === 4)
                            board.boardDetails[status].RELEASED.push(task);


                        res.send(board);



                    }
                })
            }
        })
    }
    else {
        res.send("SESSION_EXPIRED");
    }
})










boardDetailsRouter.post("/", (req, res) => {
    // console.log("req recieved at b d r");
    const token = req.body.token;
    const boardId = req.body.boardId;

    const { isLoggedIn, id } = verifyToken(token)

    if (isLoggedIn) {
        userBoards.map((user) => {
            if (user.userId === id) {
                user.boards.map((board) => {
                    if (board.boardId === boardId) {
                        res.send(board.boardDetails);
                    }
                })
            }
        })
    }
    else {
        res.send("SESSION_EXPIRED")
    }
});








createBoardRouter.post("/", (req, res) => {
    const token = req.body.token;
    const boardName = req.body.boardName;
    const boardColor = req.body.boardColor;
    const { isLoggedIn, id } = verifyToken(token)
    // console.log(id);
    if (isLoggedIn) {
        let flag = false;

        userBoards.map((user) => {
            if (user.userId === id) {
                const bId = user.boards.length;
                const boards = {
                    boardId: bId,
                    boardName,
                    boardColor,
                    boardDetails: [
                        { "TO_DO": [] },
                        { "IN_PROGRESS": [] },
                        { "ON_HOLD": [] },
                        { "COMPLETED": [] },
                        { "RELEASED": [] },
                    ]
                }
                flag = true;
                user.boards.push(boards);
                // console.log("board found and added");
                res.send(boards)
                // return;
            }
        })
        if (flag === false) {
            const boards = {
                boardId: 0,
                boardName,
                boardColor,
                boardDetails: [
                    { "TO_DO": [] },
                    { "IN_PROGRESS": [] },
                    { "ON_HOLD": [] },
                    { "COMPLETED": [] },
                    { "RELEASED": [] },
                ]
            }
            let ob = { userId: id, boards: [] }
            ob.boards.push(boards);
            userBoards.push(ob);

            res.send(boards)
            return;
        }
    }
    else {
        res.send("SESSION_EXPIRED");
    }
});












boardRouter.post("/", (req, res) => {
    // console.log("request recieved at board router");
    // const userid = req.body.userId;
    const usertoken = req.body.token;
    const { isLoggedIn, id } = verifyToken(usertoken);
    // console.log(isValidateuser);
    if (isLoggedIn === true) {
        userBoards.map((user) => {
            if (user.userId === id) {
                res.send({ "boards": user.boards, "userId": user.userId });
                return;
            }
        })
    }
    else {
        res.send("SESSION_EXPIRED");
    }
})

module.exports = { boardRouter, createBoardRouter, boardDetailsRouter, createTask, removeTask };
















// put inside boards array


 // {
            //     boardId: 1,
            //     boardName: "Board 1 s",
            //     boardColor: "#9510AC",
            //     boardDetails: ""
            // },
            // {
            //     boardId: 2,
            //     boardName: "Board 2 s",
            //     boardColor: "#9510AC",
            //     boardDetails: [

           // ]
            // }