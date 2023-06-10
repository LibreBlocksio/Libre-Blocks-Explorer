![alt text](https://www.libreblocks.io/images/github-readme-cover.png)

# Libre Blockchain Explorer

Explore transactions, blocks, and valuable data for the Libre Blockchain.

## Starting Server

First, run the development server:

```bash
yarn
yarn dev
```

Open [localhost:3000](http://localhost:3000) with your browser to see the result.
If you want to change the endpoints, check the .env file. 

## Deployment

- Prereq: [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)
- npm install pm2 -g

```bash
yarn build
pm2 start "yarn dev" --name libreblocks
```

## Feedback

If you have any feedback, please contact us at libreblocks@gmail.com or the telegram https://t.me/libreblocks
