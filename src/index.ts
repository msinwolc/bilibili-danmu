import { startListen, type MsgHandler, type Message, type MessageListener } from "blive-message-listener";
import dayjs from "dayjs";

// custom
import { env } from '../src/config/config';
import { insertData } from "../util/mysql";
import { fetchTokenWithCookies } from "../util/request";

let listeners: Record<number, MessageListener> = {};

const basicInfo = (msg: Message<any>) => {
    let now = dayjs();
    let user_basic_info = {
        uid: msg.body.user.uid,
        uname: msg.body.user.uname,
        badge_name: msg.body.user.badge?.name,
        badge_level: msg.body.user.badge?.level,
        created_at: now.format('YYYY-MM-DD HH:mm:ss'),
        updated_at: now.format('YYYY-MM-DD HH:mm:ss'),
    }

    return user_basic_info;
};

const startListening = (rid: number) => {
    fetchTokenWithCookies(rid.toString()).then(token => {
        console.log("Get token success!");

        const handler: MsgHandler = {
            onStartListen: () => {
                console.log(`Connect ${rid} start`);
            },
            onError: (e) => {
                console.log(`Connect ${rid} error: `, e.message);
            },
            onClose: () => {
                console.log(`Connect ${rid} close`);
            },
            onGift: async (msg) => {
                let giftInfo = {
                    roomid: rid,
                    gift_name: msg.body.gift_name,
                    gift_price: msg.body.price,
                    coin_type: msg.body.coin_type,
                    amount: msg.body.amount,
                    combo: msg.body.combo?.combo_num,
                    ...basicInfo(msg),
                }
                await insertData("gift_infos", giftInfo);
            },
            onIncomeDanmu: async (msg) => {
                let danmuInfo = {
                    roomid: rid,
                    content: msg.body.content,
                    ...basicInfo(msg),
                };
                await insertData("danmu_infos", danmuInfo);
            },
            onIncomeSuperChat: async (msg) => {
                let sc_info = {
                    roomid: rid,
                    content: msg.body.content,
                    price: msg.body.price,
                    time: msg.body.time,
                    ...basicInfo(msg),
                };
                await insertData("sc_infos", sc_info);
            }
        }

        console.log(`Start listen ${rid}...`);

        // Start listening
        const listen = startListen(rid, handler, {
            ws: {
                uid: env.UID,
                buvid: env.BUIVD,
                platform: 'web',
                key: token
            }
        });

        // Save the listener so we can close it later
        listeners[rid] = listen;
    });
};

// Function to start listening for all room IDs
const startAllListeners = () => {
    env.ROOMID.split(",").forEach((strid) => {
        let rid = parseInt(strid, 10);
        startListening(rid);
    });
};

// Function to close all listeners
const closeAllListeners = () => {
    Object.values(listeners).forEach(listener => {
        if (listener) {
            listener.close();
        }
    });
    listeners = {};  // Reset the listeners object
};

// Start listeners initially
startAllListeners();

// Set an interval to restart listeners every hour
setInterval(() => {
    console.log("Restarting all listeners...");
    closeAllListeners();
    startAllListeners();
}, 60 * 60 * 1000);  // 60 minutes * 60 seconds * 1000 milliseconds
