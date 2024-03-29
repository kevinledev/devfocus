import React, { useEffect, useState } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { FilterAlgosGlobal } from "./filter_algos_global";
import DoneCellContainer from "./cells/done_cell_container";
import "./algos-table.css";
// import { FilterAlgosColumn } from "./filter_algos_column";
import Checkbox from "./Checkbox";

const AllAlgos = (props) => {
  const data = React.useMemo(() => props.algos, [props]);
  // const objects = Object.values(props.userAlgos);
  // const [userAlgos, setUserAlgos] = useState(objects);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
        // Filter: FilterAlgosColumn
      },

      {
        Header: "Category",
        accessor: "category",
        // Filter: FilterAlgosColumn,
      },

      {
        Header: "Difficulty",
        accessor: "difficulty",
        // Filter: FilterAlgosColumn,
      },

      {
        Header: "Problem Link",
        accessor: "link",
        // Filter: FilterAlgosColumn,
        Cell: (props) => {
          return (
            <a href={props.row.original.link} target="_blank">{props.row.original.link}</a>
          );
        },
      },

      {
        Header: "Status",
        accessor: "",
        cell: DoneCellContainer,
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  useEffect(() => {
    props.fetchUserAlgos();
  }, []);

  const handleCompletion = (algoId, rowId) => {
    let userAlgos = props.userAlgos;
    let deleted = false;

    userAlgos.map((userAlgo) => {
      // console.log(userAlgo);
      if (userAlgo.algo === algoId) {
        props.deleteUserAlgo(userAlgo._id);
        // .then(resp => console.log(resp))
        deleted = true;
        return;
      }
    });
    if (!deleted) {
      let algos = props.algos;
      let currentUserId = props.currentUserId;
      let rowIdInt = parseInt(rowId);
      let algo = algos[rowIdInt];
      props.createUserAlgo({
        user: currentUserId,
        algo: algo,
        completed: "true",
      });
    }
  };

  const toggleStatus = (rowId) => {
    // const objects = Object.values(props.userAlgos);
    // console.log(props.userAlgos);
    let matched = false;
    props.userAlgos.map((obj) => {
      const algoId = obj.algo;
      if (rowId === algoId) {
        matched = true;
      }
    });
    if (!matched) {
      return <div className="fa fa-square-o algos-checkbox"></div>;
    } else {
      return <div className="fa fa-check-square algos-checkbox"></div>;
    }
  };

  return (
    <>
      <FilterAlgosGlobal filter={globalFilter} setFilter={setGlobalFilter} />
      <table className="all-algos-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => {
                if (i === 0) {
                  return <th style={{ "text-align": "center" }}>Done</th>;
                }
                return (
                  <th {...headerGroup.headers[i - 1].getHeaderProps()}>
                    {headerGroup.headers[i - 1].render("Header")}
                  </th>
                );
              })}
              <th></th>
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            // console.log(completed);
            // console.log(row.original.);
            prepareRow(row);

            return (
              <>
                <tr {...row.getRowProps()}>
                  <td>
                    {" "}
                    <div
                      className="algo-status-btn"
                      onClick={() => handleCompletion(row.original._id, row.id)}
                      style={{ "text-align": "center" }}
                    >
                      {toggleStatus(row.original._id)}
                    </div>
                  </td>
                  {row.cells.map((cell, i) => {
                    if (i === row.cells.length - 1) {
                      return (
                        <td>
                          {" "}
                          <button
                            onClick={() =>
                              props.openModal("algoShow", row.original._id)
                            }
                          >
                            Solution
                          </button>
                        </td>
                      );
                    }
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AllAlgos;
