import axios, { AxiosResponse } from "axios";
import { env } from '../src/config/config';


const api = 'https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=';

const config = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Cookie': env.COOKIE
    }
}

export async function fetchTokenWithCookies(rid: string): Promise<string> {
    try {
        let url = api + rid;
        const resp: AxiosResponse = await axios(url, config);
        const token = resp.data?.data?.token;
        
        return token;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
