import * as React from 'react';
//import styles from './PrintPdfDocument.module.scss';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from "@react-pdf/renderer";
import { Order } from '../../../models/Order';
import { OrderDetail } from '../../../models/OrderDetail';

interface IInvoiceProps {
  order: Order;
  font: string;
}

interface IInvoiceState {
  isFontLoaded: boolean;
  error?: string;
}

export class Invoice extends React.Component<IInvoiceProps, IInvoiceState> {
  constructor(props: IInvoiceProps) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    try {
      const BarlowFontFromFile = this.props.font;

      Font.register({
        family: "Barlow",
        fonts: [{ src: BarlowFontFromFile }],
      });

    } catch (err) {
      console.error("Error loading font:", err);
      this.setState({ error: "Failed to load font." });
    }
  }

  render(): JSX.Element {
    const { order, font } = this.props;
    const { isFontLoaded, error } = this.state;

    if (error) {
      return <Document>
        <Page>
          <Text>{error}</Text>
        </Page>
      </Document>;
    }

    if (!isFontLoaded || !font || font.length === 0) {
      return <Document>
        <Page>
          <Text>Loading...</Text>
        </Page>
      </Document>;
    }

    // Define styles for the PDF document
    const PDFStyles = StyleSheet.create({
      page: {
        padding: 30,
        fontSize: 12,
        fontFamily: "Barlow",
      },
      title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
      },
      section: {
        marginBottom: 15,
      },
      table: {
        display: 'flex',
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 20,
      },
      tableRow: {
        flexDirection: "row",
      },
      tableCellHeader: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 5,
        fontWeight: "bold",
        backgroundColor: "#f2f2f2",
        width: "25%",
      },
      tableCell: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 5,
        width: "25%",
      },
      noOrder: {
        textAlign: "center",
        fontSize: 14,
        color: "#888",
      },
    });

    if (!order) {
      return (
        <Document>
          <Page style={PDFStyles.page}>
            <Text style={PDFStyles.noOrder}>No order data available</Text>
          </Page>
        </Document>
      );
    }

    return (
      <Document>
        <Page style={PDFStyles.page}>
          <Text style={PDFStyles.title}>Invoice</Text>

          {/* General Information Section */}
          <View style={PDFStyles.section}>
            <Text>General Information</Text>
            <Text>Display Name: {order.displayName}</Text>
            <Text>
              Final Price:{" "}
              {order.finalPrice?.toLocaleString("it-IT", {
                style: "currency",
                currency: "EUR",
              })}
            </Text>
            <Text>Notes: {order.notes}</Text>
          </View>

          {/* Order Details Section */}
          <View style={PDFStyles.section}>
            <Text>Order Details</Text>
            <View style={PDFStyles.table}>
              {/* Table Header */}
              <View style={PDFStyles.tableRow}>
                <Text style={PDFStyles.tableCellHeader}>Item Code</Text>
                <Text style={PDFStyles.tableCellHeader}>Description</Text>
                <Text style={PDFStyles.tableCellHeader}>Quantity</Text>
                <Text style={PDFStyles.tableCellHeader}>Unit Price</Text>
              </View>
              {/* Table Rows */}
              {order.orderDetails?.map((detail: OrderDetail, index: number) => (
                <View style={PDFStyles.tableRow} key={index}>
                  <Text style={PDFStyles.tableCell}>{detail.itemCode || "-"}</Text>
                  <Text style={PDFStyles.tableCell}>{detail.itemDescription}</Text>
                  <Text style={PDFStyles.tableCell}>{detail.quantity}</Text>
                  <Text style={PDFStyles.tableCell}>
                    {detail.unitPrice?.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
