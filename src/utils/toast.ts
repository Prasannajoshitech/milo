import { toast } from "react-toastify";
const showErrorMessage = (message: string) => toast.error(message);
const showSucessMessage = (message: string) => toast.success(message);
const showInfoMessage = (message: string) => toast.info(message);

export { showErrorMessage, showSucessMessage, showInfoMessage };
