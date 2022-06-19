import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBSpinner,
  MDBTypography,
  MDBCard,
  MDBCardBody,
  MDBCardHeader
} from "mdb-react-ui-kit";
import { useSolscanAccountTransactions } from "../lib";
import { walletAddresses } from "../data";

const SolscanTransactionsTable = () => {
  const { data, isError, isLoading } = useSolscanAccountTransactions(
    walletAddresses.toString()
  );
  if (isLoading) return <div className='center'> <MDBSpinner /></div>
  if (isError) return <MDBTypography className='center'>Sorry an error occurred try to get wallet transactions using Solscan API</MDBTypography>
  return (
    <MDBCard className="mt-2">
            <MDBCardHeader>
        <h1>Solscan Account Transactions</h1>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBTable responsive bordered>
          <MDBTableHead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Address</th>
              <th scope="col">Message</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((item, index) =>
              item.error ? (
                <tr key={item.address}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.address}</td>
                  <td>{item.message}</td>
                </tr>
              ) : (
                <>
                  <tr key={item.address}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.address}</td>
                    <td>{item.message}</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <MDBTable className="table mb-0" bordered hover>
                        <MDBTableHead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Gas used</th>
                            <th scope="col">Hash</th>
                            <th scope="col">Block number</th>
                            <th scope="col">Timestamp</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {item.data.length !== 0 ? (
                            item.data.map((d, i) => (
                              <tr key={item.data.txHash}>
                                <td>{i + 1}</td>
                                <td>{d.from}</td>
                                <td>{d.to}</td>
                                <td>{d.value}</td>
                                <td>{d.fee}</td>
                                <td>{d.txHash}</td>
                                <td>{d.blockNumber}</td>
                                <td>{d.timeStamp}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td>0</td>
                              <td>No transactions found</td>
                            </tr>
                          )}
                        </MDBTableBody>
                      </MDBTable>
                    </td>
                  </tr>
                </>
              )
            )}
          </MDBTableBody>
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SolscanTransactionsTable;
