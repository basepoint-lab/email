import React from "react";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  dense?: boolean;
  hoverable?: boolean;
}

export function Table({
  striped = false,
  dense = false,
  hoverable = true,
  className = "",
  children,
  ...props
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#E2DDD0] bg-white shadow-xs">
      <table
        className={`w-full text-left text-xs ${className}`}
        data-striped={striped}
        data-dense={dense}
        data-hoverable={hoverable}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableHeader({ className = "", children, ...props }: TableHeaderProps) {
  return (
    <thead
      className={`bg-[#F7F5EC] border-b border-[#E2DDD0] font-mono text-[11px] font-bold text-[#5e665d] uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableBody({ className = "", children, ...props }: TableBodyProps) {
  return (
    <tbody className={`divide-y divide-[#E2DDD0]/70 font-sans ${className}`} {...props}>
      {children}
    </tbody>
  );
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export function TableRow({ selected = false, className = "", children, ...props }: TableRowProps) {
  return (
    <tr
      className={`transition-colors hover:bg-[#FAF9F5]/80 ${
        selected ? "bg-[#BCF63C]/10 font-medium" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export function TableHead({ className = "", children, ...props }: TableHeadProps) {
  return (
    <th className={`p-3.5 sm:px-4 sm:py-3 font-mono ${className}`} {...props}>
      {children}
    </th>
  );
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export function TableCell({ className = "", children, ...props }: TableCellProps) {
  return (
    <td className={`p-3.5 sm:px-4 sm:py-3 text-[#003c2d] ${className}`} {...props}>
      {children}
    </td>
  );
}

export default Table;
