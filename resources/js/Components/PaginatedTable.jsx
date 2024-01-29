import React from "react";
import { useTable, useFilters, useGlobalFilter, usePagination } from "react-table";

const PaginatedTable = ({ columns, data, initialPageSize = 5 }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: initialPageSize },
        },
        useFilters,
        useGlobalFilter,
        usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <div>
            {/* Global search input */}
            <div className="flex justify-between mb-2">

                <input
                    type="text"
                    value={globalFilter || ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Cari"
                    className="rounded-xl"
                />
                <div className="flex items-center gap-2">
                    Tampilkan:
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="rounded-xl"
                    >
                        {[5, 10, 20].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

            <table {...getTableProps()} className="w-full">
                <thead className="bg-slate-700">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className="font-sans font-bold text-left text-white ps-2">{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="odd:bg-white even:bg-slate-300">
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="ps-2">{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className={"flex items-center justify-between mt-2 "}>
                <div className="flex ">
                    <button onClick={() => gotoPage(0)} className="bg-blue-500 text-white font-bold rounded-s-lg p-1" disabled={!canPreviousPage}>
                        {"<<"}
                    </button>{" "}
                    <button onClick={() => previousPage()} className="bg-blue-500 text-white font-bold border-s border-blue-400 p-1" disabled={!canPreviousPage}>
                        {"<"}
                    </button>{" "}
                    <span className="bg-white text-center font-bold text-[1.25rem] ps-5 pe-5">
                        <strong>
                            {pageIndex + 1}
                        </strong>{" "}
                    </span>
                    <button onClick={() => nextPage()} className="bg-blue-500 text-white font-bold border-e border-blue-400 p-1" disabled={!canNextPage}>
                        {">"}
                    </button>{" "}
                    <button onClick={() => gotoPage(pageCount - 1)} className="bg-blue-500 text-white font-bold rounded-e-lg p-1" disabled={!canNextPage}>
                        {">>"}
                    </button>{" "}
                </div>

                <span className=" me-2">
                    Halaman{" "}
                    <strong>
                        {pageIndex + 1} dari {pageOptions.length}
                    </strong>{" "}
                </span>

                <span className=" items-center gap-2">
                    Ke halaman:
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                    />
                </span>{" "}
            </div>
        </div>
    );
};

export default PaginatedTable;
