import React from 'react'
import { MDBTable, MDBTableHead, MDBTableBody, MDBSpinner, MDBTypography, MDBCard, MDBCardBody, MDBCardHeader } from 'mdb-react-ui-kit';
import { useEtherAccountBalance } from '../lib';
import { walletAddresses } from '../data';
import { getAmount } from '../util';

const EtherAssetsTable = () => {
  const { data, isError, isLoading } = useEtherAccountBalance(walletAddresses.toString())

  if (isLoading) return <div className='center'> <MDBSpinner /></div>
  if (isError) return <MDBTypography className='center'>Sorry an error occurred try to get wallet balances using etherscan API</MDBTypography>
  return (
    <MDBCard className="mt-2">
            <MDBCardHeader>
        <h1>Etherscan Account Balance</h1>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBTable hover>
          <MDBTableHead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Address</th>
              <th scope='col'>Balance</th>

            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              data && data.map((item, index) => (
                <tr key={index}>
                  <th scope='row' >{index + 1}</th>
                  <td>{item.account}</td>
                  <td>{getAmount(item.balance)}</td>
                </tr>
              ))
            }
          </MDBTableBody>
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  );
}
export default EtherAssetsTable
