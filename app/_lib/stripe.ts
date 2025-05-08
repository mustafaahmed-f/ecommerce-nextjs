import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// export const stripe = new Stripe(process.env.STRIPE_LOCAL_SECRET_KEY!);
