import axios from "axios"

export default async function handler(req, res){
    try {
        let addresses = req.query.addresses
        if(!addresses){
            return res.status(406).send("Address must be provided")
        }
        // convert the addresses to an array
        addresses = addresses.split(',')
        // create an array of from the sender promises to execute in parallel
        const promises = addresses.map(address => axios.get( `https://public-api.solscan.io/account/tokens?account=${address}`))
        // wait for the promise to settle
        const results = await Promise.allSettled(promises)
        // loop through the result and format the data
        const data = results.map((result, index) => result.status === "fulfilled" ? {account: addresses[index], balance: result.value.data[index].tokenAmount.amount, error: false, message: "ok"}: {account: addresses[index], balance: 0, error: true, message: "Invalid Address"})
        res.json(data)
    } catch (error) {
        res.status(500).send( error.message)
    }
}