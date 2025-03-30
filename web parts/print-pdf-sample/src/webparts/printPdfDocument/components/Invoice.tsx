import * as React from 'react';
//import styles from './PrintPdfDocument.module.scss';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  //Font
} from "@react-pdf/renderer";
import { Order } from '../../../models/Order';
import { OrderDetail } from '../../../models/OrderDetail';
//import BarlowFont from require("../../../fonts/Barlow-Regular.ttf");
//require("../../../fonts/Barlow-Regular.ttf");
//import BarlowFont from '../../../styles/fonts/Barlow-Regular.ttf';
//import BarlowFont from '../../../fonts/Barlow-Regular.ttf';

interface IInvoiceProps {
  order: Order;
}

export const Invoice: React.FC<IInvoiceProps> = ({ order }) => {
  // TODO 1 of 2: Register the font to test a PDF with a custom font
  // Font.register({
  //   family: "Barlow",
  //   fonts: [
  //     //{ src: require("../../../fonts/Barlow-Regular.ttf") }
  //     //{ src: "../../../fonts/Barlow-Regular.tff" }
  //     { src: BarlowFont }
  //     //{ src: require("../../../fonts/Barlow-Regular.ttf") }
  //   ],
  // });

  // Define styles for the PDF document
  const PDFStyles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      // TODO 2 of 2: Specify the custom font
      //fontFamily: "Barlow",
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
};
