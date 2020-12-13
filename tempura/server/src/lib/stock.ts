import { User } from "../entity/User";
import JasminRequester from "./JasminRequester";



export async function getTotalAssetsInStock(user: User, startDate: string, endDate: string) {
    let jasminRequest = new JasminRequester(user);
    let jasminResponse = (await jasminRequest.getMaterialItems()).data;

    let totalAssets = jasminResponse.reduce((accumulator, item) => {

        const checkStartDate = (!!startDate && new Date(item.createdOn) >= new Date(startDate)) || !startDate;
        const checkEndDate = (!!endDate && new Date(item.createdOn) <= new Date(endDate)) || !endDate;

        if (!(checkStartDate && checkEndDate)) {
            return accumulator;
        }

        item.materialsItemWarehouses.forEach(wharehouse => {
            accumulator += wharehouse.inventoryBalance.amount;
        })

        return accumulator;
    }, 0);

    return totalAssets;
}