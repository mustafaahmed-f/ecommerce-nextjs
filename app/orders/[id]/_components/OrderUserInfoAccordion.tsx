import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormContext } from "@/app/_context/FormContext";
interface OrderUserInfoAccordionProps {
  order: any;
}

function OrderUserInfoAccordion({ order }: OrderUserInfoAccordionProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>User Info</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Email:</span> {order.userInfo.email}
          </p>
          <p>
            <span className="font-semibold">Country:</span>{" "}
            {order.userInfo.country}
          </p>
          <p>
            <span className="font-semibold">City:</span> {order.userInfo.city}
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
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderUserInfoAccordion;
