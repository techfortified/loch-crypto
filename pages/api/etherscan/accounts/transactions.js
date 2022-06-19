import axios from "axios"
export default async function handler(req, res){
    try {
        let addresses = req.query.addresses
        if(!addresses){
            return res.status(406).send("Address must be provided")
        }
        // convert the addresses to an array
        addresses = addresses.split(',')
        const apiKey = process.env.ETHERSCAN_API_KEY
         // create an array of to the receiver promises to execute in parallel
        const promises = addresses.map(address => axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=2&sort=asc&apikey=${apiKey}`))
        const results = await Promise.allSettled(promises)
        const data = []
        // compose rejected and fulfilled results
        results.forEach((result, index) => {
            if(result.status === "fulfilled"){
                const status = result.value.data.status
                const message = result.value.data.message
                return data.push({
                    address: addresses[index], 
                    data: status === "0" ? [] : result.value.data.result, 
                    error: status === "0" ? true : false, 
                    message: message === "NOTOK" ? result.value.data.result : message
                })
            }
            data.push({address: addresses[index], data: [], error: true, message: "Invalid Address"})
        })
        res.json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}