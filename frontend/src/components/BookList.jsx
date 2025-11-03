function BookList({ books, onAddToCart, cart }) {
    
    const getRemainingStock = (book) => {
        const itemInCart = cart.find(item => item.id === book.id);
        const quantityInCart = itemInCart ? itemInCart.quantity : 0;
        return book.stock - quantityInCart;
    };

    return(
        <section className="book-list"> 
            <h2>Nuestro Catálogo</h2>
            {books.length === 0 && <p>Cargando libros...</p>}
            
            {books.map(book => { 
                const remainingStock = getRemainingStock(book);
                return (
                    <div key={book.id} className="book-item"> 
                        <div className="book-details">
                            <h4>{book.title}</h4> 
                            <p className="book-author">por {book.author}</p>
                            <p className="book-price">${book.price} (Disponibles: {remainingStock})</p> 
                        </div>
                        <button 
                            className="add-to-cart-btn"
                            onClick={() => onAddToCart(book.id)} 
                            disabled={remainingStock === 0}
                        >
                            {remainingStock === 0 ? 'Agotado' : 'Agregar'}
                        </button>
                    </div>
                );
            })}
        </section>
    );
}
    
export default BookList;