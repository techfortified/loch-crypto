import BigNumber from "bignumber.js"
/**
 * Function to calculate the amount of each transaction
 * @param {string} amount 
 * @returns string 
 */
export const getAmount = (amount) =>{
    const dividend = new BigNumber(amount) 
    const total = dividend.div(10e18)
    return total.toFixed(2)
}