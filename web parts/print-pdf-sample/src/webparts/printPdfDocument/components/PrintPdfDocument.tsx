import * as React from 'react';
import { IPrintPdfDocumentProps } from './IPrintPdfDocumentProps';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DefaultButton } from '@fluentui/react';
import { Invoice } from './Invoice';
import { Order } from '../../../models/Order';
import styles from './PrintPdfDocument.module.scss';
import { fetchFontAsBase64 } from '../../../fonts/fontUtilities';
import BarlowFont from '../../../fonts/Barlow-Regular.ttf';

export default class PrintPdfDocument extends React.Component<IPrintPdfDocumentProps, { font: string }> {
  constructor(props: IPrintPdfDocumentProps) {
    super(props);
    this.state = {
      font: ""
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      const BarlowFontFromFile = await fetchFontAsBase64(BarlowFont);
      console.log("Loaded font", BarlowFontFromFile);
      this.setState({ font: BarlowFontFromFile });
    } catch (err) {
      console.error("Error loading font:", err);
    }
  }

  public render(): React.ReactElement<IPrintPdfDocumentProps> {
    
    const order: Order = this._getOrder();

    return (
      <section className={styles.printPdfDocument}>
        <h2>Hey! Let&apos;s print something!</h2>
        <PDFDownloadLink document={<Invoice order={order} font={this.state.font} />} fileName={"resume.pdf"}>
          <DefaultButton>
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
