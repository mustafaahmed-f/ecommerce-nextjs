"use client";

import Image from "next/image";
import Rating from "../Rating";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

function FreshSalesCard({
  product,
  initialTimer,
}: {
  product: any;
  initialTimer: { hour: number; min: number; sec: number };
}) {
  const { 0: timer, 1: setTimer } = useState<{
    hour: number;
    min: number;
    sec: number;
  }>(initialTimer);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const handleTimer = useCallback(() => {
    // if (timer["hour"] === 0) {
    //   setTimer(initialTimer);
    // } else if (timer["min"] === 0 && timer["sec"] === 0) {
    //   setTimer({ hour: timer["hour"] - 1, min: 59, sec: 59 });
    // } else if (timer["sec"] === 0) {
    //   setTimer({ ...timer, min: timer["min"] - 1, sec: 59 });
    // } else {
    //   setTimer({ ...timer, sec: timer["sec"] - 1 });
    // }
    setTimer((prevTimer) => {
      if (prevTimer["hour"] === 0) {
        return initialTimer;
      } else if (prevTimer["min"] === 0 && prevTimer["sec"] === 0) {
        return { hour: prevTimer["hour"] - 1, min: 59, sec: 59 };
      } else if (prevTimer["sec"] === 0) {
        return { ...prevTimer, min: prevTimer["min"] - 1, sec: 59 };
      } else {
        return { ...prevTimer, sec: prevTimer["sec"] - 1 };
      }
    });
  }, [initialTimer, setTimer]);

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      handleTimer();
    }, 1000);

    return () => {
      clearInterval(timerInterval.current! as NodeJS.Timeout);
    };
  }, [handleTimer]);

  return (
    <Link
      href={`/product/${product.productId}`}
      className="FreshSalesCard flex min-w-48 cursor-pointer flex-col rounded-md px-2 py-2 shadow-[0px_0px_2px_3px_#F3F3F3] sm:px-5"
    >
      <div className="flex flex-col items-center justify-center gap-2 py-2 text-center">
        <p className="mb-0 font-bold text-textGrey">Deal of the day</p>
        <div className="grid w-full grid-cols-5">
          <p className="mb-0 font-semibold">
            {String(timer["hour"]).length < 2
              ? `0${String(timer["hour"])}`
              : `${String(timer["hour"])}`}
          </p>
          <p className="mb-0 font-semibold">:</p>
          <p className="mb-0 font-semibold">
            {String(timer["min"]).length < 2
              ? `0${String(timer["min"])}`
              : `${String(timer["min"])}`}
          </p>
          <p className="mb-0 font-semibold">:</p>
          <p className="mb-0 font-semibold">
            {String(timer["sec"]).length < 2
              ? `0${String(timer["sec"])}`
              : `${String(timer["sec"])}`}
          </p>

          <p className="mb-0 font-semibold">hour</p>
          <p className="mb-0 font-semibold"></p>
          <p className="mb-0 font-semibold">min</p>
          <p className="mb-0 font-semibold"></p>
          <p className="mb-0 font-semibold">sec</p>
        </div>
      </div>
      <div className="py-2 text-center">
        <Image
          alt={`photo bag ${product.title}`}
          width={300}
          height={300}
          className="cardZoom w-full"
          src={product.image}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-2 text-start">
        <p className="font-bold text-black">{product.title}</p>
        <p className="text-textGrey">{product.brand}</p>
        <div className="flex flex-row flex-wrap items-center justify-start gap-2">
          <Rating ratingValue={product.rating} />
          <p className="text-textGrey">{product.rating}</p>
        </div>
        <div className="flex flex-row items-center justify-start gap-[2px] sm:gap-3">
          <p className="text-base text-red-600 sm:text-lg">
            ${" "}
            {(product.price - product.price * (product.discount / 100)).toFixed(
              2,
            )}
          </p>
          <p className="text-sm text-textGrey line-through sm:text-base">
            $ {product.price}
          </p>
          <div className="rounded-md bg-red-600 px-[1px] py-[2px] text-[10px] text-white sm:p-1 sm:text-base">
            <p>- {product.discount} %</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FreshSalesCard;
