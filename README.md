# Bilibili-dammu

A simple project for collecting danmu (bullet comments) and gift information from a specific Bilibili live room.

## Configuration

This project uses a `.env` file for configuration. Create a `.env` file in the root directory of your project and add the following variables:

```ini
uid=123456
roomid=123456,123456
cookie=COOKIE
buvid=BUVID

# Database configuration
host=MYSQL_HOST
user=MYSQL_USER
password=MYSQL_PASSWD
database=MYSQL_DB
```


### Description of Variables

- `uid`: Your user ID. With the `uid`, you can collect danmu along with other users' names and IDs. This prevents losing danmu information. It can be set to default `0`.
- `roomid`: The ID of the live room you want to watch, separate with commas.
- `cookie`: Required to get the key to watch live info. Can be left blank if `uid` is `0`.
- `buvid`: Similar to `cookie`.

The rest of the variables are for database configuration.

## Installation

To install the dependencies, run:

```
npm install
```

## Usage

To start listening, run:

```
npm start
```


## TODO

- Add support for other databases
- ~~Collect Super Chat (SC) danmu information~~
- ...
