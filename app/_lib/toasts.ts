import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Toasts
const SuccessToast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  showCloseButton: true,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseover = MySwal.stopTimer;
    toast.onmouseleave = MySwal.resumeTimer;
  },
  icon: "success",
  background: "#51a351",
  color: "#fff",
  iconColor: "#fff",
});

const ErrorToast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  showCloseButton: true,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseover = MySwal.stopTimer;
    toast.onmouseleave = MySwal.resumeTimer;
  },
  icon: "error",
  background: "#bd362f",
  color: "#fff",
  iconColor: "#fff",
});

export { MySwal, SuccessToast, ErrorToast };
