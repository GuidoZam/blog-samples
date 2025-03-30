import * as React from 'react';
import { IPrintPdfDocumentProps } from './IPrintPdfDocumentProps';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DefaultButton } from '@fluentui/react';
import { Invoice } from './Invoice';
import { Order } from '../../../models/Order';
import styles from './PrintPdfDocument.module.scss';

export default class PrintPdfDocument extends React.Component<IPrintPdfDocumentProps> {

  public render(): React.ReactElement<IPrintPdfDocumentProps> {
    
    const order: Order = this._getOrder();

    return (
      <section className={styles.printPdfDocument}>
        <h2>Hey! Let&apos;s print something!</h2>
        <PDFDownloadLink document={<Invoice order={order} />} fileName={"resume.pdf"}>
          <DefaultButton className="px-4">
            Download PDF
          </DefaultButton>
        </PDFDownloadLink>
      </section>
    );
  }

  // Returns a dummy order with some details for testing purposes
  private _getOrder(): Order {
    // Create a new order
    const order: Order = {
      idOrder: "1",
      displayName: "Order 1",
      description: "Order 1 description",
      notes: "Order 1 notes",
      orderNumber: "12345",
      finalPrice: 200,
    };

    // Create order details
    order.orderDetails = [
      {
        idOrderDetail: "1",
        itemDescription: "Order detail 1",
        itemCode: "OD1",
        unitPrice: 100,
        quantity: 1,
        idOrder: order.idOrder,
        order
      },
      {
        idOrderDetail: "2",
        itemDescription: "Order detail 2",
        itemCode: "OD2",
        unitPrice: 100,
        quantity: 1,
        idOrder: order.idOrder,
        order
      },
    ];

    return order;
  }
}
