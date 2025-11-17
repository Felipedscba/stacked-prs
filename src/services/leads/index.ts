import { db } from '../../db';
import { createRouteError } from '../../utils';

type TLeadInput = {
    name: string;
    email: string;
};

export const leadsService = {
    getAll: () => {
        const leads = db.leads.getAll();
        return {
            data: leads,
        };
    },
    create: (data: TLeadInput) => {
        if (!data.name || !data.email) {
            throw createRouteError('Name and email are required', 400);
        }
        const lead = {
            name: data.name,
            email: data.email,
        } as any;

        db.leads.insert(lead);
        return lead;
    },
    getById: (id: string) => {
        const lead = db.leads.getById(id);
        if (!lead) {
            return null;
        }
        return lead;
    },
    updateById: (id: string, data: Partial<TLeadInput>) => {
        const updated = db.leads.update(id, data);
        if (!updated) {
            return null;
        }
        return db.leads.getById(id);
    },
    deleteById: (id: string) => {
        const lead = db.leads.getById(id);
        if (!lead) {
            return null;
        }
        db.leads.deleteById(id);
        return lead;
    },
};
