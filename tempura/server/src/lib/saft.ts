import { Between, getRepository } from "typeorm";
import { Saft, TaxAccountingBasis } from "../entity/Saft";



async function getSaftFiles(start: any, end: any) {
    const saftRepository = getRepository(Saft);

    const safts = await saftRepository.find({
        select: ["path"],
        where: [
            {
                start_date: Between(start, end),
                tax_accounting_basis: TaxAccountingBasis.ACCOUNTING
            },
            {
                end_date: Between(start, end),
                tax_accounting_basis: TaxAccountingBasis.ACCOUNTING
            }
        ],
        order: {
            created_at: "DESC",
        }
    });

    return safts;
}

export { getSaftFiles };