import useSWR from 'swr';
import axios from 'axios'

const fetcher = async(query) =>{
    return await (await axios.get(query)).data
}

export const useEtherAccountBalance = (accounts) =>{
    const { data, error } = useSWR(`/api/etherscan/accounts/balance?addresses=${accounts}`, fetcher)
    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
}


export const useEtherAccountTransactions = (accounts) =>{
    const { data, error } = useSWR(`/api/etherscan/accounts/transactions?addresses=${accounts}`, fetcher)
    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
}

export const useAlchemyAccountBalance = (accounts) =>{
    const { data, error } = useSWR(`/api/alchemy/accounts/balance?addresses=${accounts}`, fetcher)
    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
}


export const useAlchemyAccountTransactions = (accounts) =>{
    const { data, error } = useSWR(`/api/alchemy/accounts/transactions?addresses=${accounts}`, fetcher)
    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
}

export const useSolscanAccountBalance = (accounts) =>{
    const { data, error } = useSWR(`/api/solscan/accounts/balance?addresses=${accounts}`, fetcher)
    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
}


export const useSolscanAccountTransactions = (accounts) =>{
    const { data, error } = useSWR(`/api/solscan/accounts/transactions?addresses=${accounts}`, fetcher)
    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
}