import React from 'react'
import { MDBTable, MDBTableHead, MDBTableBody, MDBSpinner, MDBTypography, MDBCard, MDBCardBody, MDBCardHeader } from 'mdb-react-ui-kit';
import { useAlchemyAccountTransactions } from '../lib';
import { walletAddresses } from '../data';

const AlchemyTransactionsTable = () => {
  const { data, isError, isLoading } = useAlchemyAccountTransactions(walletAddresses.toString())

  if (isLoading) return <div className='center'> <MDBSpinner /></div>
  if (isError) return <MDBTypography className='center'>Sorry an error occurred try to get wallet transactions using Alchemy API</MDBTypography>
  return (
    <MDBCard className="mt-2">
            <MDBCardHeader>
        <h1>Alchemy Account Transactions</h1>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBTable responsive bordered>
          <MDBTableHead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Address</th>
              <th scope='col'>Message</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              data.map((item, index) => (
                item.error ?
                  <tr key={index}>
                    <th scope='row' >{index + 1}</th>
                    <td>{item.address}</td>
                    <td>{item.message}</td>
                  </tr> :
                  <>
                    <tr key={index}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item.address}</td>
                      <td>{item.message}</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <MDBTable className='table mb-0' bordered hover>
                          <MDBTableHead>
                            <tr>
                              <th scope='col'>#</th>
                              <th scope='col'>From</th>
                              <th scope='col'>To</th>
                              <th scope='col'>Amount</th>
                              <th scope='col'>Gas used</th>
                              <th scope='col'>Hash</th>
                              <th scope='col'>Block number</th>
                              <th scope='col'>Timestamp</th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            {item.data.length !== 0 ? item.data.map((d, i) => (
                              <tr key={item.data.hash}>
                                <td>{i + 1}</td>
                                <td>{d.from}</td>
                                <td>{d.to}</td>
                                <td>{d.value}</td>
                                <td>{d.gasUsed}</td>
                                <td>{d.hash}</td>
                                <td>{d.blockNumber}</td>
                                <td>{d.timeStamp}</td>
                              </tr>)) : <tr><td>0</td><td>No transactions found</td></tr>}
                          </MDBTableBody>
                        </MDBTable>
                      </td>
                    </tr></>
              ))
            }
          </MDBTableBody>
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  )
}


export default AlchemyTransactionsTable