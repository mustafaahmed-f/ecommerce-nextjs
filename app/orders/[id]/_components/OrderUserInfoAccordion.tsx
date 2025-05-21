import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/shadcn/accordion";

interface OrderUserInfoAccordionProps {
  order: any;
}

function OrderUserInfoAccordion({ order }: OrderUserInfoAccordionProps) {
  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        // defaultValue="user-info"
        className="w-full"
      >
        <AccordionItem value="user-info">
          <AccordionTrigger className="text-base font-semibold">
            User Info
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {order.userInfo.email}
              </p>
              <p>
                <span className="font-semibold">Country:</span>{" "}
                {order.userInfo.country}
              </p>
              <p>
                <span className="font-semibold">City:</span>{" "}
                {order.userInfo.city}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {order.userInfo.address}
              </p>
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {order.userInfo.firstName} {order.userInfo.lastName}
              </p>
              <p>
                <span className="font-semibold">Phone 1:</span>{" "}
                {order.userInfo.phoneNumber1}
              </p>
              {order.userInfo.phoneNumber2 && (
                <p>
                  <span className="font-semibold">Phone 2:</span>{" "}
                  {order.userInfo.phoneNumber2}
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default OrderUserInfoAccordion;
