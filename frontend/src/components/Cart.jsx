function Cart({ cart, books, onCheckOut }) {

    const cartItems = cart.map(item => {
        const book = books.find(b => b.id === item.id);
        return {
            ...book, // title, author, price, etc.
            quantity: item.quantity,
        };
    });

    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return (
        <aside className="cart">
            <h2>Carrito</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <span>{item.title} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <hr />
                    <div className="cart-total">
                        <strong>Total:</strong>
                        <strong>${totalPrice.toFixed(2)}</strong>
                    </div>
                    <button 
                        className="checkout-btn" 
                        onClick={onCheckOut}
                        disabled={cartItems.length === 0}
                    >
                        Ir a Pagar
                    </button>
                </>
            )}
        </aside>
    );
}

export default Cart;