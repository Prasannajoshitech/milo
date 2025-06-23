/* eslint-disable */

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface BaseTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[] | any;
  isLoading?: boolean;
  maxHeight?: string;
}

const BaseTable = <T,>({
  data,
  columns,
  maxHeight = "90vh",
}: BaseTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div
      className="relative overflow-auto "
      style={{
        maxHeight: maxHeight,
      }}
    >
      {" "}
      <table className="min-w-full table-auto  ">
        {data.length > 0 && (
          <thead className="sticky top-0 typography-paragraph-small font-manrope  text-text-500 font-bold bg-secondary-50/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="font-semibold text-nowrap text-left px-4 py-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                      {header.column.getCanSort() && (
                        <div className="flex flex-col gap-0 ml-2">
                          <button
                            onClick={() => header.column.toggleSorting(false)}
                            className={`btn btn-link p-0 m-0 flex items-center ${
                              header.column.getIsSorted() === "asc"
                                ? "text-primary"
                                : "text-muted"
                            }`}
                            style={{ height: "16px" }}
                          >
                            <ChevronUp size={14} color="white" />
                          </button>
                          <button
                            onClick={() => header.column.toggleSorting(true)}
                            className={`btn btn-link p-0 m-0 flex items-center ${
                              header.column.getIsSorted() === "desc"
                                ? "text-primary"
                                : "text-muted"
                            }`}
                            style={{ height: "16px" }}
                          >
                            <ChevronDown size={14} color="white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {data.length > 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`  text-text-400 font-semibold
                  ${index % 2 !== 0 ? "bg-secondary-50/40  " : ""}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BaseTable;
