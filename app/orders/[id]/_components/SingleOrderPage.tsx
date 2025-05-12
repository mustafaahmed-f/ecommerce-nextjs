"use client";

import { Button, Chip, Dialog } from "@mui/material";
import EditOrderForm from "./EditOrderForm";
import OrderSummary from "./OrderSummary";

import dayjs from "dayjs";
import { useState } from "react";
import OrderItemsAccordion from "./OrderItemsAccordion";

interface SingleOrderPageProps {
  order: any;
}

type statusColors = {
  pending: string;
  confirmed: string;
  shipped: string;
  delivered: string;
  returned: string;
  cancelled: string;
};

function SingleOrderPage({ order }: SingleOrderPageProps) {
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const orderStatus = order.orderStatus.status;

  const canEdit = ["pending", "confirmed"].includes(orderStatus);
  const showProceed =
    orderStatus === "pending" && order.paymentMethod.toLowerCase() === "card";

  const canCancel = ["pending", "confirmed", "shipped"].includes(orderStatus);

  const canReturn = orderStatus === "delivered";

  const getChipColors = (status: keyof statusColors) => {
    const colorMap = {
      pending: { bg: "#FEF3C7", border: "#FCD34D", text: "#92400E" }, // yellow
      confirmed: { bg: "#DBEAFE", border: "#3B82F6", text: "#1E3A8A" }, // blue
      shipped: { bg: "#EDE9FE", border: "#8B5CF6", text: "#4C1D95" }, // purple
      delivered: { bg: "#D1FAE5", border: "#10B981", text: "#065F46" }, // green
      returned: { bg: "#FFEDD5", border: "#FB923C", text: "#7C2D12" }, // orange
      cancelled: { bg: "#FEE2E2", border: "#EF4444", text: "#7F1D1D" }, // red
    };
    return colorMap[status];
  };

  function proceedHandler() {
    console.log("proceed");
  }

  function handleCancleOrder() {
    console.log("handleCancleOrder");
  }

  function handleReturnOrder() {
    console.log("handleReturnOrder");
  }

  let editFormDefaultValues = {
    userID: order.userID,
    userInfo: {
      phoneNumber1: order.userInfo.phoneNumber1,
      phoneNumber2: order.userInfo.phoneNumber2 || null,
      city: order.userInfo.city,
      country: order.userInfo.country,
      firstName: order.userInfo.firstName,
      lastName: order.userInfo.lastName,
      email: order.userInfo.email,
      address: order.userInfo.address,
    },
    products: order.products.map((product: any) => ({
      productID: product.productID,
      title: product.title,
      unitPaymentPrice: product.unitPaymentPrice,
      discount: product.discount ?? 0,
      quantity: product.quantity,
      color: product.color ?? null,
      category: product.category ?? null,
      brand: product.brand ?? null,
    })),
    subTotal: order.subTotal,
    finalPaidAmount: order.finalPaidAmount,
    couponId: order.couponId?._id ?? null,
    paymentMethod: order.paymentMethod,
    isFromCart: order.isFromCart,
    notes: order.notes,
  };
  // console.log("Order : ", order);

  return (
    <div className="mx-auto px-4 py-8 sm:px-8">
      {/* Header */}
      <div className="mb-14 flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-center">
        {/* Left Side: ID, Status Chip, and Dates */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold sm:text-2xl md:text-3xl">
              Order ID: {order._id}
            </h2>
            <Chip
              label={orderStatus}
              className={`border text-sm capitalize`}
              size="small"
              style={{
                color: getChipColors(orderStatus).text,
                backgroundColor: getChipColors(orderStatus).bg,
                borderColor: getChipColors(orderStatus).border,
              }}
            />
          </div>
          <div className="mt-3 text-sm text-slate-500">
            <p>
              Created: {dayjs(order.createdAt).format("MMM D, YYYY - h:mm A")}
            </p>
            <p>
              Updated: {dayjs(order.updatedAt).format("MMM D, YYYY - h:mm A")}
            </p>
          </div>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex flex-row items-start gap-2 md:flex-col md:items-end">
          <Button
            variant="outlined"
            size="small"
            disabled={!canEdit}
            onClick={handleEditOpen}
          >
            Edit Order
          </Button>
          {showProceed && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={proceedHandler}
            >
              Proceed to Payment
            </Button>
          )}
          {canCancel && (
            <Button
              onClick={handleCancleOrder}
              variant="outlined"
              size="small"
              color="error"
            >
              Cancel Order
            </Button>
          )}
          {canReturn && (
            <Button
              onClick={handleReturnOrder}
              variant="outlined"
              size="small"
              color="warning"
            >
              Return Order
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* Order Items Accordion */}
        <OrderItemsAccordion order={order} />

        {/* Order Summary Accordion */}
        <OrderSummary order={order} />
      </div>

      {/* Edit Info Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md">
        <div className="px-6 py-6">
          <h2 className="mb-4 text-2xl font-semibold">Edit Shipping Info</h2>
          <EditOrderForm defaultValues={editFormDefaultValues} />
        </div>
      </Dialog>
    </div>
  );
}

export default SingleOrderPage;
