import { Cart, Buyable } from '../Cart';

describe('Cart', () => {
    let cart: Cart;

    const uniqueItem: Buyable = { 
        id: 1, 
        name: 'Movie', 
        price: 100, 
        isUnique: true 
    };

    const nonUniqueItem: Buyable = { 
        id: 2, 
        name: 'iPhone', 
        price: 1000,
        isUnique: false 
    };

    beforeEach(() => {
        cart = new Cart();
    });

    test('should add unique items only once', () => {
        cart.add(uniqueItem);
        cart.add(uniqueItem);
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].quantity).toBe(1);
    });

    test('should add non-unique items with quantity', () => {
        cart.add(nonUniqueItem, 2);
        cart.add(nonUniqueItem, 3);
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].quantity).toBe(5);
    });

    test('should decrease quantity of non-unique item', () => {
        cart.add(nonUniqueItem, 5);
        cart.decreaseQuantity(nonUniqueItem.id, 2);
        expect(cart.items[0].quantity).toBe(3);
    });

    test('should remove non-unique item when quantity is decreased to 0', () => {
        cart.add(nonUniqueItem, 2);
        cart.decreaseQuantity(nonUniqueItem.id, 2);
        expect(cart.items.length).toBe(0);
    });

    test('should throw error when decreasing quantity of unique item', () => {
        cart.add(uniqueItem);
        expect(() => cart.decreaseQuantity(uniqueItem.id)).toThrow(
            'Cannot decrease quantity of unique item.'
        );
    });

    test('should throw error when decreasing quantity for non-existent item', () => {
        expect(() => cart.decreaseQuantity(99)).toThrow(
            'Item with id 99 not found.'
        );
    });

    test('should return total cost with quantities considered', () => {
        cart.add(uniqueItem);
        cart.add(nonUniqueItem, 3);
        expect(cart.getTotalCost()).toBe(3100);
    });

    test('should remove item by id', () => {
        cart.add(uniqueItem);
        cart.removeItemById(uniqueItem.id);
        expect(cart.items.length).toBe(0);
    });

    test('should throw error when removing non-existent item', () => {
        expect(() => cart.removeItemById(99)).toThrow(
            'Item with id 99 not found.'
        );
    });
});
