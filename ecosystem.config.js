module.exports = {
    apps: [
        {
            name: 'bilibili-danmu', // 你可以给应用取个名字
            script: 'npm',
            args: 'start', // 这里可以使用 npm start 命令
            interpreter: 'none', // 告诉 pm2 不使用 Node.js 解释器，直接运行 npm
        }
    ]
};
