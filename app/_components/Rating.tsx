"use client";

import React from "react";
import { getRandomRating } from "../_lib/getRating";
import FullStar from "../_icons/FullStar";
import HalfStar from "../_icons/HalfStar";
import EmptyStar from "../_icons/EmptyStar";

interface RatingProps {}

function Rating({}: RatingProps) {
  let rating: number = getRandomRating();
  let ratings: number[] = [];
  while (ratings.length < 5) {
    if (rating >= 1) {
      ratings.push(1);
      rating--;
    } else {
      if (rating === 0) {
        ratings.push(0);
      } else if (rating % 1 !== 0) {
        ratings.push(0.5);
        rating -= 0.5;
      }
    }
  }
  return (
    <div className="flex items-center gap-2">
      {ratings.map((el, i) => {
        return el === 1 ? (
          <FullStar key={i} />
        ) : el === 0.5 ? (
          <HalfStar key={i} />
        ) : (
          <EmptyStar key={i} />
        );
      })}
    </div>
  );
}

export default Rating;
