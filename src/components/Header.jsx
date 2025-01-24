

function Header({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, calcularTotal}) {
    

    // ** En este caso ahora como pasamos estas funciones a nuestro hook no lo podemos importar directamente Aquí
    // ** Ya que eso genera algunos problemas, en vez de eso solo lo importamos en el padre y pasamos las 
    // ** funciones via props
    // ** Ya que al instanciarlo multiples veces va generando multiples objetos, y no queremos eso, queremos
    // todo que todo esté en un solo lugar
    // const isEmpty = useMemo( () =>   cart.length === 0, [cart])
    
    //     const calcularTotal = useMemo( () =>{
    //         return cart.reduce( (total, item) => {
    //             return total + (item.price * item.quantity)
    //         }, 0)
    //     }, [cart]
    //     )
    
    

    return (
        <header className="py-5 header">
          <div className="container-xl">
              <div className="row justify-content-center justify-content-md-between">
                  <div className="col-8 col-md-3">
                      <a href="index.html">
                          <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                      </a>
                  </div>
                  <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                      <div 
                          className="carrito"
                      >
                          <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                          <div id="carrito" className="bg-white p-3">
                            {/* Creamos un if ternario para mostrar una u otra cosa */}
                            {
                                isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((guitar)=>{
                                                return(
                                                    <tr key={guitar.id}>
                                                        <td>
                                                            <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td className="fw-bold">
                                                                {guitar.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(guitar.id)}
                                                            >
                                                                -
                                                            </button>
                                                                {guitar.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(guitar.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(guitar.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    
                                                )
                                            })}
                                            
                                        </tbody>
                                    </table>
                                    <p className="text-end">Total a pagar: <span className="fw-bold">{calcularTotal}</span></p>
                                    <button onClick={clearCart} className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                                    </>
                                )
                                
                            }
                              
                              

                              
                          </div>
                      </div>
                  </nav>
              </div>
          </div>
      </header>
    )

}

export default Header