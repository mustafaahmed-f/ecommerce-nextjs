import Button from "../_components/Button";

interface PageProps {}

function Page({}: PageProps) {
  const cartItems = [
    {
      _id: "1",
      title: "Product One",
      price: 100,
      color: "Red",
      quantity: 2,
    },
    {
      _id: "2",
      title: "Product Two",
      price: 200,
      color: "Blue",
      quantity: 1,
    },
  ];
  const removeItem = () => {};
  const emptyCart = () => {};

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">${item.price}</p>
                  <Button
                    label="Remove"
                    onClick={() => removeItem()}
                    variant="secondary"
                    size="small"
                    disabled={false}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t pt-4">
            <Button label="Empty Cart" onClick={() => emptyCart()} />
            <div className="text-right">
              <p className="text-lg font-semibold">Total: ${total}</p>
              <button className="mt-2 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
