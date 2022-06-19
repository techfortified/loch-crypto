import axios from "axios"
export default async function handler(req, res){
    try {
        let addresses = req.query.addresses
        if(!addresses){
            return res.status(406).send("Address must be provided")
        }
        // convert the addresses to an array
        addresses = addresses = addresses.split(',')
        // create an array of from the sender promises to execute in parallel
        const promises = addresses.map(address => axios.get( `https://public-api.solscan.io/account/transactions?account=${address}&limit=2`))
        // wait for the promise to settle
        const results = await Promise.allSettled(promises)
        // loop through the result and format the data
        const data = results.map((result, index) => result.status === "fulfilled" ? {address: addresses[index], data: result.value.data, error: false, message: "ok"}: {address: addresses[index], data: [], error: true, message: "Invalid Address"})
        res.json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}