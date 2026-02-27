import toast from "react-hot-toast";
import { TOAST_STYLE } from "../constants";

/**
 * Unified notification helpers.
 * Uses react-hot-toast consistently across the entire app.
 */
export const notify = {
    success: (message) => toast.success(message, TOAST_STYLE),
    error: (message) => toast.error(message),
    loading: (message) => toast.loading(message),
};
