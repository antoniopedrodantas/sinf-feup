import { User } from "../entity/User";
import JasminRequester from "./JasminRequester";


export async function getTotalCosts(user: User, startDate: string, endDate: string) {
    let jasminRequest = new JasminRequester(user);

    let jasminResponse = (await jasminRequest.getAllPurchaseOrders()).data;

    let totalCosts = jasminResponse.reduce(
        (accumulator, order) => {
            const checkStartDate = (!!startDate && new Date(order.documentDate) >= new Date(startDate)) || !startDate;
            const checkEndDate = (!!endDate && new Date(order.documentDate) <= new Date(endDate)) || !endDate;

            if (checkStartDate && checkEndDate) {
                accumulator += order.grossValue.amount;
            }

            return accumulator
        }, 0);

    return totalCosts;
}