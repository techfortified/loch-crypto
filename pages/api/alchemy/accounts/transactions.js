import { createAlchemyWeb3 } from "@alch/alchemy-web3";
export default async function handler(req, res){
    try {
        let addresses = req.query.addresses
        if(!addresses){
            return res.status(406).send("Address must be provided")
        }
        // convert the addresses to an array
        addresses = addresses.split(',')
        // Replace with your Alchemy api key:
        const apiKey = process.env.ALCHEMY_API_KEY
        // Initialize an alchemy-web3 instance:
        const web3 = createAlchemyWeb3(`https://eth-mainnet.alchemyapi.io/v2/${apiKey}`);
        // create an array of from the sender promises to execute in parallel
        const fromPromises = addresses.map(address => web3.alchemy.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: address}))
        // create an array of to the receiver promises to execute in parallel
        const toPromises = addresses.map(address => web3.alchemy.getAssetTransfers({
            fromBlock: "0x0",
            toAddress: address}))
        // pass it to the Promise to execute in parallel and return when all settled
        const fromResults = await Promise.allSettled(fromPromises)
        const toResults = await Promise.allSettled(toPromises)
        const data = []
        // loop through the data and join the from and to transaction of each wallet address together
        addresses.forEach((address, index) =>{
            const _fromData = fromResults[index]
            const _toData = toResults[index]
            const obj = {address, data: [], error: true, message: "invalid address"}
            if(_fromData.status === "fulfilled" && _toData.status === "fulfilled"){
                obj.data = _fromData.value.transfers.slice(0,2).concat(_toData.value.transfers.slice(0,2))
                obj.error = false
                obj.message = "success"
            }
            data.push(obj)
        })
        res.json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}