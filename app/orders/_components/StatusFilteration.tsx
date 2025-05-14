import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { orderStatus } from "@/app/_lib/OrderStatus";
import { useState } from "react";

interface StatusFilterationProps {}

function StatusFilteration({}: StatusFilterationProps) {
  type stateType = keyof typeof orderStatus;
  const { 0: status, 1: setstatus } = useState<stateType | "all">("all");
  const { searchParams, pathName, router } = useNextNavigation();

  function handleStatusSelection(selectedStatus: stateType | "all") {
    let params = new URLSearchParams(searchParams);
    if (selectedStatus === "all") {
      params.delete("status"); // 🧼 remove it completely
      setstatus("all");
    } else {
      params.set("status", selectedStatus);
      setstatus(selectedStatus);
    }
    router.replace(`${pathName}?${params.toString()}`);
  }

  return <div></div>;
}

export default StatusFilteration;
