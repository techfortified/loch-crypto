import axios from "axios"

export default async function handler(req, res){
    try {
        const addresses = req.query.addresses
        if(!addresses){
            return res.status(406).send("Address must be provided")
        }
        const apiKey = process.env.ETHERSCAN_API_KEY
        const endPoint = `https://api.etherscan.io/api?module=account&action=balancemulti&address=${addresses}&tag=latest&apikey=${apiKey}`
        const result = await axios.get(endPoint)
        res.json(result.data.result)
    } catch (error) {
        res.status(500).send(error.mesage)
    }
}