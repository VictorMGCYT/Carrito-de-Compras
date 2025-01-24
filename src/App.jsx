
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import useCart from './hooks/useCart';

function App() {

    const {data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
        isEmpty, calcularTotal
    } = useCart();

    
    return (
        <>
        {/* Aquí a la parte del header pasaremos el cart,
        para así ir actualizando esa parte en el header */}
        <Header 
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
            isEmpty={isEmpty}
            calcularTotal={calcularTotal}
        />
        

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar, index) => {

                return(
                    <Guitar 
                    key={guitar.id}
                    guitar={guitar}
                    cart={cart}
                    addToCart={addToCart}
                    />
                )
                })}
                
                
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>

        </>
    )
}

export default App
