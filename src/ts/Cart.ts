interface Buyable {
    id: number;
    name: string;
    price: number;
    isUnique: boolean;
}

class Cart {
    private _items: Map<number, { item: Buyable; quantity: number }> = new Map();

    add(item: Buyable, quantity: number = 1): void {
        if (item.isUnique) {
            this._items.set(item.id, { item, quantity: 1 });
        } else {
            const existing = this._items.get(item.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                this._items.set(item.id, { item, quantity });
            }
        }
    }

    removeItemById(id: number): void {
        if (!this._items.has(id)) {
            throw new Error(`Item with id ${id} not found.`);
        }
        this._items.delete(id);
    }

    decreaseQuantity(id: number, amount: number = 1): void {
        const existing = this._items.get(id);
        if (!existing) {
            throw new Error(`Item with id ${id} not found.`);
        }
        if (existing.item.isUnique) {
            throw new Error(`Cannot decrease quantity of unique item.`);
        }
        if (existing.quantity <= amount) {
            this._items.delete(id);
        } else {
            existing.quantity -= amount;
        }
    }

    get items(): { item: Buyable; quantity: number }[] {
        return Array.from(this._items.values());
    }

    getTotalCost(): number {
        return Array.from(this._items.values()).reduce(
            (total, { item, quantity }) => total + item.price * quantity,
            0
        );
    }
}

export { Cart, Buyable };
