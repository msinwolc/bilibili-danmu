import dotenv from 'dotenv'

dotenv.config()

interface Env {
    UID: number;
    ROOMID: string,
    COOKIE: string,
    BUIVD: string,

    MYSQL_HOST?: string,
    MYSQL_USER?: string,
    MYSQL_PASSWD?: string,
    MYSQL_DATABASE?: string,
}

const getEnv = (): Env => {

    if (!process.env.uid || !process.env.roomid  || !process.env.cookie  || !process.env.buvid) {
        throw new Error('缺少必要的环境变量');
    }

    return {
        UID: parseInt(process.env.uid, 10),
        ROOMID: process.env.roomid,
        COOKIE: process.env.cookie,
        BUIVD: process.env.buvid,
        MYSQL_HOST: process.env.host,
        MYSQL_USER: process.env.user,
        MYSQL_PASSWD: process.env.password,
        MYSQL_DATABASE: process.env.database,
    };
};

export const env = getEnv();
