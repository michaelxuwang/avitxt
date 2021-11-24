import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { Address, Balance, Events } from "../components";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";
import { useMoralisQuery } from "react-moralis";
import { useTable, useSortBy } from 'react-table';

export default function ListCompetitions({
  address,
  mainnetProvider,
  localProvider,
  contractConfig,
  setCompAddress
}) {
  const contracts = useContractLoader(localProvider, contractConfig);

  const { data, error, isLoading } = useMoralisQuery("competitions",
    // query => query.fullText('name', 'hi')
    );

  const competitionsData = data.map((obj, i) => obj.attributes);
  const competitions = React.useMemo(
    () => competitionsData,
    [competitionsData]
  );
  console.log('!!!moralis query', data, error, isLoading, competitions, competitionsData);

  const history = useHistory();
  function viewCompetition(compAddress) {
    setCompAddress(compAddress);
    history.push(`/view-competition/${compAddress}`);
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data,
        Cell: e =><a onClick={() => {viewCompetition(e.row.values.competitionAddress); return false;}}> {e.value} </a>
        // Cell: e =><Link to={`/view-competition/${e.row.values.competitionAddress}`}> {e.value} </Link>
      },
      {
        Header: <span hidden></span>,
        accessor: 'competitionAddress',
        Cell: <span hidden></span>
      },
      {
        Header: 'Info',
        accessor: 'info',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
    ],
    []
  );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = useTable({ columns, data: competitions }, useSortBy);

  // const firstPageRows = rows.slice(0, 20)

  function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      {
        columns,
        data,
      },
      useSortBy
    )
  
    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    // const firstPageRows = rows.slice(0, 20)
  
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
        {/* <br />
        <div>Showing the first 20 results of {rows.length} rows</div> */}
      </>
    )
  }


  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 16, margin: "auto", marginTop: 64 }}>
        <h2>List Competition</h2>
      </div>
      <div>Search: </div>
      <div>
        <Table columns={columns} data={competitions} />
      </div>
    </div>
  );
}
