import axios, { AxiosResponse } from "axios";
import { env } from '../src/config/config';


const url = 'https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=' + env.ROOMID;

const config = {
    url: url,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Cookie': env.COOKIE
    }
}

export async function fetchTokenWithCookies(): Promise<string> {
    try {
        const resp: AxiosResponse = await axios(config);
        const token = resp.data?.data?.token;
        
        return token;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
