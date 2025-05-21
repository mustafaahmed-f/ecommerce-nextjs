"use client";

import { Chip, Dialog } from "@mui/material";
import EditOrderForm from "./EditOrderForm";
import OrderSummary from "./OrderSummary";

import dayjs from "dayjs";
import { useState } from "react";
import OrderItemsAccordion from "./OrderItemsAccordion";
import CouponApplied from "./CouponApplied";
import OrderUserInfoAccordion from "./OrderUserInfoAccordion";
import { getAxiosErrMsg } from "@/app/_lib/getAxiosErrMsg";
import { ErrorToast, SuccessToast } from "@/app/_lib/toasts";
import { instance } from "@/app/_lib/axiosInstance";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getChipColors } from "../../_utils/getChipColors";
import Link from "next/link";
import { Button } from "@/app/_components/shadcn/button";

interface SingleOrderPageProps {
  order: any;
}

function SingleOrderPage({ order }: SingleOrderPageProps) {
  const [editOpen, setEditOpen] = useState(false);
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const orderStatus = order.orderStatus.status;
  const router = useRouter();
  const canEdit = ["pending", "confirmed"].includes(orderStatus);
  const showCompleteOrder = orderStatus === "pending";

  const canCancel = ["pending", "confirmed", "shipped"].includes(orderStatus);

  const canReturn = orderStatus === "delivered";

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

  async function proceedHandler() {
    setIsLoading(true);
    const paymentResponse = await instance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/checkout_sessions`,
      order,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    setIsLoading(false);

    window.location.href = paymentResponse.data.url;
  }

  async function handleConfirmOrder() {
    setIsLoading(true);
    try {
      const response = await instance.put(
        `/api/order/confirmOrder?orderId=${order._id}`,
      );
      if (response.data.success) {
        SuccessToast.fire({
          title: "Order confirmed successfully",
        });
      }
      setIsLoading(false);
      router.refresh();
    } catch (error: any) {
      setIsLoading(false);
      const errMsg = getAxiosErrMsg(error);
      ErrorToast.fire({
        title: errMsg,
      });
    }
  }

  async function handleCancleOrder() {
    Swal.fire({
      title: "Are you sure you want to cancel order ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          await instance.put(`/api/order/updateStatus?orderId=${order._id}`, {
            status: "cancelled",
          });

          //// Logic here
          Swal.fire({
            title: "Removed !",
            text: "Order has been cancelled !!",
            icon: "success",
          });
          router.refresh();
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          const errMsg = getAxiosErrMsg(error);
          ErrorToast.fire({
            title: errMsg,
          });
        }
      }
    });
  }

  //todo : see how return order occurs in real world ecommerces
  function handleReturnOrder() {
    console.log("handleReturnOrder");
  }

  return (
    <div
      className={`mx-auto px-4 py-8 sm:px-8 ${isLoading ? "pointer-events-none opacity-40" : ""}`}
    >
      <Link href="/orders" className="underline">
        {"← "}
        back
      </Link>
      {/* Header */}
      <div className="mb-14 mt-5 flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-center">
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
          {order.couponId && <CouponApplied coupon={order.couponId} />}
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
        <div className="flex flex-row items-start gap-2 max-md:flex-wrap md:flex-col md:items-end">
          {showCompleteOrder && (
            <Button
              variant="default"
              color="primary"
              className=""
              onClick={
                order.paymentMethod.toLowerCase() === "card"
                  ? proceedHandler
                  : handleConfirmOrder
              }
            >
              {order.paymentMethod.toLowerCase() === "card"
                ? "Pay Now"
                : "Confirm order"}
            </Button>
          )}
          <Button
            variant="outline"
            size="default"
            disabled={!canEdit}
            onClick={handleEditOpen}
          >
            Edit User Info
          </Button>
          {canCancel && order.orderStatus.status !== "cancelled" && (
            <Button
              onClick={handleCancleOrder}
              variant="destructive"
              size="default"
              color="error"
            >
              Cancel Order
            </Button>
          )}
          {canReturn && (
            <Button
              onClick={handleReturnOrder}
              variant="secondary"
              size="default"
              color="warning"
            >
              Return Order
            </Button>
          )}
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-5">
        <OrderItemsAccordion order={order} />
        <OrderUserInfoAccordion order={order} />
        <OrderSummary order={order} />
      </div>

      {/* Edit Info Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md">
        <div className="px-6 py-6">
          <h2 className="mb-4 text-2xl font-semibold">Edit Shipping Info</h2>
          <EditOrderForm
            defaultValues={editFormDefaultValues}
            orderId={order._id}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default SingleOrderPage;
