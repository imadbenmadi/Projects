import { format } from "date-fns";

export const Formate_Date = (date) => {
    return format(date, "d MMMM yyyy HH:mm");
};
export const Formate_Date_NoYear = (date) => {
    return format(date, "d MMMM HH:mm");
};