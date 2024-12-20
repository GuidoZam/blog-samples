import * as React from 'react';
import styles from './styles/ItemsTable.module.scss';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  Button,
  Tooltip
} from "@fluentui/react-components";
import {
  //FolderRegular,
  EditRegular,
  // OpenRegular,
  // DocumentRegular,
  // PeopleRegular,
  // DocumentPdfRegular,
  // VideoRegular,
} from "@fluentui/react-icons";

export interface IItemsTableProps<T extends { [key: string]: any }> {
  // The items to be displayed in the table.
  items: T[];

  // The columns to be displayed in the table. Each column should have a columnKey, label and formatValue function.
  columns: { columnKey: string, label: string, formatValue?: (value: any) => JSX.Element }[];
  
  // Indicates if the editing operations should be enabled. By default it is enabled. 
  editingEnabled?: boolean;

  // Indicates if the control is disabled. By default it is enabled.
  disabled?: boolean;
}

export default class ItemsTable<T extends { [key: string]: any }> extends React.Component<IItemsTableProps<T>> {

  public render(): React.ReactElement<IItemsTableProps<T>> {
    const { items, editingEnabled } = this.props;
    let { columns } = this.props;

    // If not columns has been specified show all the properties of the items.
    if (!columns || columns.length === 0) {
      columns = this._getColumnsFromItemsType();
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              {columns.map(column => (
                <TableCell key={`${column.columnKey}-${index}`}>
                  {column.formatValue && column.formatValue(item[column.columnKey])}
                  {!column.formatValue && <div>{item[column.columnKey]}</div>}
                </TableCell>
              ))}
              {editingEnabled !== false && <TableCell>
                <div className={styles.rowOperations}>
                  <Tooltip content="Edit current row" relationship="label">
                    <Button icon={<EditRegular />} />
                  </Tooltip>
                  <Tooltip content="Approve" relationship="label">
                    <Button icon={<EditRegular />} />
                  </Tooltip>
                  <Tooltip content="Reject" relationship="label">
                    <Button icon={<EditRegular />} />
                  </Tooltip>
                </div>
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  private _getColumnsFromItemsType(): { columnKey: string, label: string, formatValue?: (value: any) => JSX.Element }[] {
    const { items } = this.props;
    const firstItem = items[0];
    const columns: { columnKey: string, label: string, formatValue?: (value: any) => JSX.Element }[] = [];

    if (firstItem) {
      for (const key in firstItem) {
        if (Object.prototype.hasOwnProperty.call(firstItem, key)) {
          columns.push({ columnKey: key, label: key });
        }
      }
    }

    return columns;
  }
}