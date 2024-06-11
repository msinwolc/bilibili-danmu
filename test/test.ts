import { startListen, type MsgHandler } from "blive-message-listener";

const handler: MsgHandler = {
    onStartListen: () => {
        console.log("Connect start");
    },
    onError: (e) => {
        console.log("Connect error: ", e.message);
        
    },
    onClose: () => {
        console.log("Connect close");
    },
    onGift: (msg) => {
        console.log(msg.id, msg.body);
    }
}

console.log("Start listen...");

startListen(7734200, handler, {
    ws: {
        uid: 37016073,
        buvid: 'E0A4EBF6-191C-BD6D-431A-A89380A78C8A21055infoc',
        platform: 'web',
        key: 'KQkPRwc-BjT3MYjQzZKYS7GWKTQbIQPHZD2VuVREiTTEvtQGKBKcRO87ws88er-IlVXQzA_tgXLTn5QV7r7JYbEcTjvAaaBK6_xg8LSI0nW1pY7O9B6pOfWzMD1u4RCwnUn0DwyZcM1Q9ZnUnyuDiS9pE9t00dpyiJSfdetSTLB_aiZi-pt0KA=='
    }
})

// import { env } from "./config";

// console.log(env.UID, env.ROOMID, env.COOKIE);
