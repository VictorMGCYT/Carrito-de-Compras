import { useState, useEffect,useMemo } from 'react';
import { db } from '../data/db';

function useCart() {


    

    // Datos iniciales traidos del localStorage
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('carrito')
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);


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

    // con esto sacamos un poco la lógica para mostrar o no algo dentro del JSX
    // useMemo hace que el render solo se ejecute si algo cambió en la dependencia
    // En este caso si algo cambio en nuestro carrito
    const isEmpty = useMemo( () =>   cart.length === 0, [cart])

    const calcularTotal = useMemo( () =>{
        return cart.reduce( (total, item) => {
            return total + (item.price * item.quantity)
        }, 0)
    }, [cart]
    )



    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        calcularTotal
    }

}

export default useCart;