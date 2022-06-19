import React from 'react'
import { MDBContainer } from 'mdb-react-ui-kit';
import styles from '../../styles/Home.module.css'

import EtherAssetsTable from '../components/EtherAssetsTable'

import EtherTransactionsTable from '../components/EtherTransactionsTable'

import AlchemyAssetsTable from '../components/AlchemyAssetsTable'

import AlchemyTransactionsTable from '../components/AlchemyTransactionsTable'

import SolscanAssetsTable from '../components/SolscanAssetsTable'

import SolscanTransactionsTable from '../components/SolscanTransactionsTable'
import HeroTop from '../components/HeroTop';

const Home = () => {
  return (
    <React.Fragment>
      <HeroTop />
        <MDBContainer fluid>

            <EtherAssetsTable />
            <EtherTransactionsTable />

            <AlchemyAssetsTable />
            <AlchemyTransactionsTable />

            <SolscanAssetsTable />
            <SolscanTransactionsTable />
        </MDBContainer>
    </React.Fragment>
  )
}

export default Home