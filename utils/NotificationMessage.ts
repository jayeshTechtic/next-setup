import { toast } from "react-toastify";

const NotificationMessage = (type: any, msg: string) => {
  return toast(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    type,
    toastId: type,
  });
};

export default NotificationMessage;
