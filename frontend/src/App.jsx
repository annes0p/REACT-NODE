import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import Cart from './components/Cart';
import Compra from './components/Compra';
import Confirmation from './components/Confirmation';
import './index.css';

const storeData = {
  name: 'Rincon del Libro',
  slogan: 'Tu tienda de libros en línea',
}

function App() {

  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('shop');
  const [compraData, setCompraData] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error al cargar libros: ", error);
        alert("No se pudieron cargar los libros. Intenta nuevamente más tarde.");
      }
    };
    fetchBooks();
  }, []);

  const handleAddToCart = (bookId) => {
    const book = books.find(b => b.id === bookId);
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === bookId);
      const currentQuantity = existingItem ? existingItem.quantity : 0;

      if (currentQuantity >= book.stock) {
        alert(`¡Lo sentimos! No contamos con más stock para "${book.title}"`);
        return prevCart;   
      }

      if (existingItem) {
        return prevCart.map(item =>
          item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id: bookId, quantity: 1 }];
      }
    });
  };

  const handleConfirmOrder = async (userData) => { 
    alert('Procesando su orden...');

    const orderData = {
      ...userData, 
      items: cart,     
    };

    try {
      const response = await fetch('http://localhost:3001/api/order', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData), 
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de orden');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      setCompraData(orderData);
      setView('confirmation');
      setCart([]); 
    } catch (error) {
      console.error('Error al procesar orden: ', error);
      alert('Hubo un error al procesar su orden. Por favor, intente más tarde.');
    }
  };

  const handleBackToShopping = () => {
    setCompraData(null);
    setView('shop');
  }

  if (view === 'shop') {
    return(
      <div className="app-container">
        <Header info={storeData} />
        <main>
          <BookList
            books={books}
            onAddToCart={handleAddToCart}
            cart={cart}
          />
          <Cart
            cart={cart}
            books={books} // El carrito necesita 'books' para buscar precios y nombres
            onCheckOut={() => setView('checkout')} // Cambia la vista a 'checkout'
          />
        </main>
      </div>
    );
  }

  if (view === 'checkout') {
    return (
      <div className="app-container">
        <Header info={storeData} />
        <main>
          {/* El componente Compra.jsx se encarga del formulario */}
          <Compra onConfirm={handleConfirmOrder} />
        </main>
      </div>
    )
  }
  
  if (view === 'confirmation') {
    return (
      <div className="app-container">
        <Header info={storeData} />
        <main>
          <Confirmation
            compraData={compraData}
            onBack={handleBackToShopping}
          />
        </main>
      </div>
    )
  }
}

export default App;