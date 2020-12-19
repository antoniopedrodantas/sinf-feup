import { Between, getRepository } from "typeorm";
import { Saft, TaxAccountingBasis } from "../entity/Saft";


async function getSaftFiles(type: TaxAccountingBasis, start: any, end: any) {
    const saftRepository = getRepository(Saft);

    const safts = await saftRepository.find({
        select: ["path"],
        where: [
            {
                start_date: Between(start, end),
                tax_accounting_basis: type
            },
            {
                end_date: Between(start, end),
                tax_accounting_basis: type
            }
        ],
        order: {
            created_at: "DESC",
        }
    });

    return safts;
}

export { getSaftFiles };