import { startListen, type MsgHandler } from "blive-message-listener";
import dayjs from "dayjs";

// custom
import { env } from '../src/config/config';
import { insertData } from "../util/mysql";
import { fetchTokenWithCookies } from "../util/request";

fetchTokenWithCookies().then(token => {
    console.log("Get token success!");
    
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
            let now = dayjs();
            let giftInfo = {
                roomid: env.ROOMID,
                uid: msg.body.user.uid,
                uname: msg.body.user.uname,
                gift_name: msg.body.gift_name,
                gift_price: msg.body.price,
                coin_type: msg.body.coin_type,
                amount: msg.body.amount,
                combo: msg.body.combo?.combo_num,
                base_date: now.format('YYYY-MM-DD'),
                created_at: now.format('YYYY-MM-DD HH:mm:ss'),
                updated_at: now.format('YYYY-MM-DD HH:mm:ss'),
            }
            console.log(giftInfo);
            insertData("gift_infos", giftInfo);
        },
        onIncomeDanmu: (msg) => {
            let now = dayjs();
            let danmuInfo = {
                roomid: env.ROOMID,
                uid: msg.body.user.uid,
                uname: msg.body.user.uname,
                content: msg.body.content,
                created_at: now.format('YYYY-MM-DD HH:mm:ss'),
                updated_at: now.format('YYYY-MM-DD HH:mm:ss'),
            }
            console.log(danmuInfo);
            insertData("danmu_infos", danmuInfo);
        },
    }
    
    console.log(`Start listen ${env.ROOMID}...`);
    
    startListen(env.ROOMID, handler, {
        ws: {
            uid: env.UID,
            buvid: env.BUIVD,
            platform: 'web',
            key: token
        }
    });
});
