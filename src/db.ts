class Table<T extends Record<string, any> & { id?: string }> {
    private items = new Map<string, T>();
    constructor(public name: string) {}

    insert(item: T): void {
        item.id = crypto.randomUUID();
        this.items.set(item.id, this.copy(item));
    }

    update(id: string, updatedItem: Partial<T>): boolean {
        const existingItem = this.items.get(id);
        if (!existingItem) return false;
        const newItem = { ...existingItem, ...updatedItem, id };
        this.items.set(id, this.copy(newItem));
        return true;
    }

    getById(id: string): T | undefined {
        const item = this.items.get(id);
        if (!item) return undefined;
        return this.copy(item);
    }

    getAll(): T[] {
        return Array.from(this.items.values()).map((item) => this.copy(item));
    }

    deleteById(id: string): boolean {
        return this.items.delete(id);
    }

    private copy(item: T): T {
        return JSON.parse(JSON.stringify(item));
    }
}

type TLead = {
    id: string;
    name: string;
    email: string;
};

export const db = {
    leads: new Table<TLead>('leads'),
};
