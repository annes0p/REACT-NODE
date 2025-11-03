function Confirmation({ compraData, onBack }) {

    if (!compraData) {
        return <p>Cargando confirmación...</p>;
    }

    return (
        <section className="confirmation">
            <h2>¡Gracias por tu compra, {compraData.name}!</h2>
            <p>Hemos recibido tu pedido. Te enviaremos un correo de confirmación a <strong>{compraData.email}</strong>.</p>
            
            <h4>Resumen de tu pedido:</h4>
            <ul className="order-summary">
                {compraData.items.map(item => (
                    <li key={item.id}>
                        Item ID: {item.id} (Cantidad: {item.quantity})

                    </li>
                ))}
            </ul>

            <button onClick={onBack} className="back-btn">
                Volver a la tienda
            </button>
        </section>
    );
}

export default Confirmation;