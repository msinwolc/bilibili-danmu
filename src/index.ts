import { startListen, type MsgHandler, type Message } from "blive-message-listener";
import dayjs from "dayjs";

// custom
import { env } from '../src/config/config';
import { insertData } from "../util/mysql";
import { fetchTokenWithCookies } from "../util/request";

env.ROOMID.split(",").forEach((strid) => {
    fetchTokenWithCookies(strid).then(token => {
        console.log("Get token success!");

        let rid = parseInt(strid, 10);

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
            onGift: (msg) => {
                let giftInfo = {
                    roomid: rid,
                    gift_name: msg.body.gift_name,
                    gift_price: msg.body.price,
                    coin_type: msg.body.coin_type,
                    amount: msg.body.amount,
                    combo: msg.body.combo?.combo_num,
                    ...basicInfo(msg),
                }
                console.log(giftInfo);
                insertData("gift_infos", giftInfo);
            },
            onIncomeDanmu: (msg) => {
                let danmuInfo = {
                    roomid: rid,
                    content: msg.body.content,
                    ...basicInfo(msg),
                }
                console.log(danmuInfo);
                insertData("danmu_infos", danmuInfo);
            },
            onIncomeSuperChat: (msg) => {
                let sc_info = {
                    roomid: rid,
                    content: msg.body.content,
                    price: msg.body.price,
                    time: msg.body.time,
                    ...basicInfo(msg),
                };
                insertData("sc_infos", sc_info);
            }
        }

        console.log(`Start listen ${rid}...`);

        // multiple listen
        startListen(rid, handler, {
            ws: {
                uid: env.UID,
                buvid: env.BUIVD,
                platform: 'web',
                key: token
            }
        });
    });
});

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
