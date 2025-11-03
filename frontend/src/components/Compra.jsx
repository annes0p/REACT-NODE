import { useState } from 'react';

function Compra({ onConfirm }) {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !email) {
            alert('Por favor, completa todos los campos.');
            return;
        }


        onConfirm({ name, email });
    };

    return (
        <section className="checkout-form">
            <h2>Finalizar Compra</h2>
            <p>Por favor, ingresa tus datos para completar el pedido.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre Completo:</label>
                    <input 
                        type="text" 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <button type="submit" className="confirm-btn">
                    Confirmar Pedido
                </button>
            </form>
        </section>
    );
}

export default Compra;