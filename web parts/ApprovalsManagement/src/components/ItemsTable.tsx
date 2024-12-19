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

interface IItemsTableProps<T extends { [key: string]: any }> {
  // The items to be displayed in the table.
  items: T[];

  // The columns to be displayed in the table. Each column should have a columnKey, label and formatValue function.
  columns: { columnKey: string, label: string, formatValue: (value: any) => string }[];
  
  // Indicates if the editing operations should be enabled. By default it is enabled. 
  editingEnabled?: boolean;

  // Indicates if the control is disabled. By default it is enabled.
  disabled?: boolean;
}

export default class ItemsTable<T extends { [key: string]: any }> extends React.Component<IItemsTableProps<T>> {

  public render(): React.ReactElement<IItemsTableProps<T>> {
    const { items, columns, editingEnabled } = this.props;

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
                  {column.formatValue(item[column.columnKey])}
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
}