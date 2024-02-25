import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import { getTransactions } from '../../store/slices/transactionsSlice';

function TransactionsPage ({ transactions, isFetching, error, get }) {
  useEffect(() => {
    get();
  }, []);

  const mapTransactions = t => (
    <tr key={t.id}>
      <td>{t.createdAt}</td>
      <td>{t.operationType}</td>
      <td>{t.summ}</td>
    </tr>
  );

  return (
    <>
      <Header />
      <main>
        <table>
          <caption>Your Transactions</caption>
          <thead>
            <tr>
              <th key={1}>Date</th>
              <th key={2}>Operation type</th>
              <th key={3}>Summ</th>
            </tr>
          </thead>
          <tbody>{transactions.map(mapTransactions)}</tbody>
        </table>
      </main>
    </>
  );
}

const mapStateToProps = ({ transactionsStore }) => transactionsStore;

const mapDispatchToProps = dispatch => ({
  get: () => dispatch(getTransactions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
