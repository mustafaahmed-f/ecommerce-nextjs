import { instance } from "../axiosInstance";

export async function getAllProducts({
  page = 1,
  size = 149,
}: { page?: number; size?: number } = {}) {
  // const response: any = await fetch(
  //   `${process.env.NEXTAUTH_URL}/api/products/${page}/${size}`,
  //   { next: { revalidate: 3600 * 24 } }
  // );
  const response = await instance.get(`/api/products/${page}/${size}`);
  if (!response.data || !response.data.success)
    throw new Error("Couldn't get products !!");

  return response.data;
  /*  
      ============= Response ==========

      {
          "status": "SUCCESS",
          "message": "Here you go! You've received 5 \n      products. If you need more, just ask for it",
          "products": [
              {
                "id": 6,
                "title": "Xiaomi Wired in-Ear Earphones with Mic, Ultra Deep Bass & Metal Sound Chamber (Blue)",
                "image": "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057474498-earphone.jpg",
                "price": 5,
                "description": "Ergonomically angled to fit perfectly in your ear canal that provides long lasting comfort for every day usage.\r\nFeatures 1.25 meter long cable & L-shaped 3.5mm jack to connect with your phone. Due to the L-shape, the connector will deliver a strong & durable life. Earphones are compatible with Android, iOS & Windows devices with jack.\r\nPowerful 10 mm drivers & aluminum sound chamber for super extra bass and clear sound for the best music & calling experience.\r\nHigh-quality silicone earbuds, which are gentle on skin without compromising the comfortable fit on the ears.\r\nIn-line microphone with a durable multi-function button to play/pause your music, and answer/end your calls, all with just one tap.",
                "brand": "xiaomi",
                "model": "Mi Earphones Basic Blue",
                "color": "Blue",
                "category": "audio"
              },
          ]
      }

  */
}

export async function getSingleProduct(id: number) {
  const response = await fetch(
    `https://fakestoreapi.in/api/products/${String(id)}`
  );
  if (!response.ok) throw new Error("Couldn't get the product !!");

  return response.json();
}

export async function getProductsWithPagination({
  page = 1,
  limit = 20,
}: {
  page: number;
  limit: number;
}) {
  const response = await fetch(
    `https://fakestoreapi.in/api/products?page=${String(page)}&limit=${String(
      limit
    )}`
  );
  if (!response.ok) throw new Error("Couldn't get products !!");

  /*

            ========== Response ==========

    {
  "status": "SUCCESS",
  "message": "You've received products from the mobile category only.",
  "products": [
    {
      "id": 8,
      "title": "Samsung Galaxy S21 FE 5G...",
      "image": "https://storage...",
      "price": 434,
      "description": "Pro-grade Camera with AI Single Take...",
      "brand": "samsung",
      "model": "Samsung Galaxy S21 FE 5G ...",
      "color": "Lavender",
      "category": "mobile",
      "discount": 9,
      "onSale": true
    },
    {
      "id": 10,
      "title": "Samsung Galaxy S22 5G...",
      "image": "https://storage...",
      "price": 760,
      "description": "Pro-grade Camera that lets...",
      "brand": "samsung",
      "model": "Samsung Galaxy S22 5G",
      "color": "White",
      "category": "mobile",
      "discount": 29
    },
  ]
  }

  */

  return response.json();
}

export async function addProduct(body: any) {
  const newProduct = await fetch("https://fakestoreapi.in/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!newProduct.ok) throw new Error("Couldn't add product !!");

  /* 

            ======== Response ==========
  {
    "status": "SUCCESS",
    "message": "Here is the product you sent,...",
    "product": {
      "id": 150,
      "title": "Apple Vision Pro",
      "brand": "Apple",
      "model": "Apple vision pro First Gen",
      "color": "Black",
      "category": "appliances",
      "discount": 1
    }
  }
  */

  return newProduct.json();
}

export async function updateProduct(id: number) {
  const updatedProduct = await fetch(
    `https://fakestoreapi.in/api/products/${String(id)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "Apple vision pro Second Gen",
        color: "Blue",
        discount: 47,
      }),
    }
  );

  if (!updatedProduct.ok) throw new Error("Failed to update product !!");

  /*
            ============ Response ===========

      {
  "status": "SUCCESS",
  "message": "The product with id 2 has been replaced with your provided data",
  "product": {
    "id": "2",
    "title": "Apple Vision Pro",
    "brand": "Apple",
    "model": "Apple vision pro Second Gen",
    "color": "Blue",
    "category": "appliances",
    "discount": "47"
      }
   }

  */

  return updatedProduct.json();
}

export async function deleteProduct(id: number) {
  const response = await fetch(
    `https://fakestoreapi.in/api/products/${String(id)}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) throw new Error("Failed to update product !!");

  /*
            ============ Response ===========

  {
  "status": "SUCCESS",
  "message": "Product with id 2 has been deleted"
  }

  */

  return response.json();
}
