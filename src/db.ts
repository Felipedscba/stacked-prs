class Table<T extends Record<string, any> & { id: string }> {
    private items = new Map<string, T>();

    constructor(public name: string) {}

    insert(item: Omit<T, 'id'>): T {
        const id = crypto.randomUUID();
        const newItem = { ...item, id } as T;
        this.items.set(id, this.copy(newItem));
        return this.copy(newItem);
    }

    update(id: string, updatedItem: Partial<T>): T | false {
        const existingItem = this.items.get(id);
        if (!existingItem) return false;
        const newItem = { ...existingItem, ...updatedItem, id };
        this.items.set(id, this.copy(newItem));
        return this.copy(newItem);
    }

    getById(id: string): T | null {
        const item = this.items.get(id);
        if (!item) {
            return null;
        }
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
