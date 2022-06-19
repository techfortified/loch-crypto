import axios from "axios"
// alchemy-token-api/alchemy-web3-script.js
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

export default async function handler(req, res){
    try {
        let addresses = req.query.addresses
        if(!addresses){
            return res.status(406).send("Address must be provided")
        }
        addresses = addresses.split(',')
        // Replace with your Alchemy API key:
        const apiKey = process.env.ALCHEMY_API_KEY
        // Initialize an alchemy-web3 instance:
        const web3 = createAlchemyWeb3(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`);
        // The wallet address / token we want to query for:
        const promises = addresses.map(address => web3.alchemy.getTokenBalances(address,"DEFAULT_TOKENS"))
        const results = await Promise.allSettled(promises)
        const data = results.map((result, index) => ({
                    account: result.status === "fulfilled" ? result.value.address: addresses[index], 
                    balance: result.status === "fulfilled" ? result.value.tokenBalances[index].tokenBalance : 0,
                    error: result.status === "fulfilled" ? false : true
                }))
        res.json(data)  
    } catch (error) {
        res.status(500).send(error.message)
    }
}