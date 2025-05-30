"use client";

import EditOrderForm from "./EditOrderForm";
import OrderSummary from "./OrderSummary";

import Chip from "@/app/_components/Chip";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/shadcn/alert-dialog";
import { Button } from "@/app/_components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/shadcn/dialog";
import { instance } from "@/app/_lib/axiosInstance";
import { getAxiosErrMsg } from "@/app/_lib/getAxiosErrMsg";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getChipColors } from "../../_utils/getChipColors";
import CouponApplied from "./CouponApplied";
import OrderItemsAccordion from "./OrderItemsAccordion";
import OrderUserInfoAccordion from "./OrderUserInfoAccordion";

interface SingleOrderPageProps {
  order: any;
}

function SingleOrderPage({ order }: SingleOrderPageProps) {
  const [editOpen, setEditOpen] = useState(false);
  const { 0: confirmDialogOpen, 1: setConfirmDialogOpen } = useState(false);
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const orderStatus = order.orderStatus.status;
  const router = useRouter();
  const canEdit = ["pending", "confirmed"].includes(orderStatus);
  const showCompleteOrder = orderStatus === "pending";
  const { toast } = useToast();
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
    try {
      setIsLoading(true);
      const paymentResponse = await instance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout_sessions`,
        order,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      setIsLoading(false);

      window.location.href = paymentResponse.data.url;
    } catch (error) {
      const errMsg = getAxiosErrMsg(error);
      toast({
        title: "Error",
        description: errMsg,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  async function handleConfirmOrder() {
    setIsLoading(true);
    try {
      const response = await instance.put(
        `/api/order/confirmOrder?orderId=${order._id}`,
      );
      if (response.data.success) {
        toast({
          description: "Order confirmed successfully",
          variant: "success",
        });
      }
      setIsLoading(false);
      router.refresh();
    } catch (error: any) {
      setIsLoading(false);
      const errMsg = getAxiosErrMsg(error);
      toast({
        description: errMsg,
        variant: "destructive",
      });
    }
  }

  //todo : see how return order occurs in real world ecommerces
  function handleReturnOrder() {
    console.log("handleReturnOrder");
  }

  return (
    <div
      className={`mx-auto min-w-[90%] px-4 py-8 sm:px-8 ${isLoading ? "pointer-events-none opacity-40" : ""}`}
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
            <AlertDialog
              open={confirmDialogOpen}
              onOpenChange={setConfirmDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  onClick={() => {
                    setConfirmDialogOpen(true);
                  }}
                  variant="destructive"
                  size="default"
                  color="error"
                >
                  Cancel Order
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel this order ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setConfirmDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      try {
                        setIsLoading(true);
                        await instance.put(
                          `/api/order/updateStatus?orderId=${order._id}`,
                          {
                            status: "cancelled",
                          },
                        );

                        setIsLoading(false);
                        router.refresh();
                        setConfirmDialogOpen(false);
                        //// Logic here
                        toast({
                          title: "Success",
                          description: "Order cancelled successfully",
                          variant: "success",
                        });
                      } catch (error: any) {
                        setIsLoading(false);
                        setConfirmDialogOpen(false);
                        const errMsg = getAxiosErrMsg(error);
                        toast({
                          description: errMsg,
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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

      <Dialog open={editOpen} onOpenChange={handleEditClose}>
        {/* DialogTrigger is optional here if you want a button to open it; 
          but since you control open state externally, you can omit it */}
        {/* <DialogOverlay className="fixed inset-0 overflow-y-auto bg-black/50" /> */}
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader className="px-100 mb-3 sm:px-4 md:px-8">
            <DialogTitle>Edit Shipping Info</DialogTitle>
          </DialogHeader>
          <EditOrderForm
            defaultValues={editFormDefaultValues}
            orderId={order._id}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SingleOrderPage;
