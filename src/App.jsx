import { useState, useEffect } from 'react';
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from './data/db';

function App() {


    // Datos iniciales traidos del localStorage
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('carrito')
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data, setData] = useState([]);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        setData(db);
    },[])

    // Almacenar en el localStorage con useEffect para asincronia
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        let exist = cart.findIndex((guitar) => guitar.id === item.id);

        if(exist >= 0){
            if (cart[exist].quantity >= 5) {
                return
            }
            // item.cuantity ++; <- esto no se debe hacer ya que se modifica directamente el useState

            // en su lugar creamor una copia a modificar
            let updateCart = [...cart];
            // Accedemos a la posicion del elemento que queremos modificar en la propiedad quantity
            updateCart[exist].quantity++;

            // Y ahora seteamos la copia que creamos al useState
            setCart(updateCart);
        }
        else{

            // Agregamos una nueva propiedad al objeto para incrementar la cantidad
            item.quantity = 1;
            setCart([...cart, item]);
        }
        
    }

    function removeFromCart(id) {

        let carritoBorrado = cart.filter( (guitarra) => guitarra.id !== id)

        setCart(carritoBorrado);
        
    }

    function increaseQuantity(id){
        
        const updatedCart = cart.map( (guitarra, index) => {
            if (guitarra.id == id && guitarra.quantity <5) {
                return{
                    ...guitarra,
                    quantity: guitarra.quantity +1
                }
            }
            return guitarra;
        })

        setCart(updatedCart);

    }

    function decreaseQuantity(id){
        
        const updatedCart = cart.map( (item) =>{

            if (item.id == id && item.quantity > 1) {
                return{
                    ...item,
                    quantity: item.quantity - 1,
                }
            }
            return item;
        })

        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    
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
                    setCart={setCart}
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
