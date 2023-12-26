import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [basketCount, setBasketCount] = useState(0);
  const [cartData, setCartData] = useState([]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    countCartItems();
    const handleStorageChange = () => {
      countCartItems();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const countCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(item => ({
      ...item,
      quantity: item.quantity || 1, 
    }));
    setCartData(updatedCart);
    const itemCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
    setBasketCount(itemCount);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cartData];
    updatedCart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    countCartItems();
  };

  const deleteProduct = (index) => {
    const updatedCart = [...cartData];
    updatedCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    countCartItems();
  };
  return (
    <>
     <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-10">
              <div className="card ">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart items</h5>
                </div>
                <div className="card-body ">
                  {cartData.length === 0 ? (
                    <p>No products in your cart.</p>
                  ) : (
                    cartData.map((item, index) => {
                      { console.log(item, "itemmmm") }
                      return (
                        <>
                          <div className="row mt-5 " key={index}>
                            <div>

                            </div>
                            <div className="col-lg-3 col-md-12 ">
                              <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                <img src={"/api" + item.images[0]} className="w-100" alt="Blue Jeans Jacket" />
                                <a href="#!">
                                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 ">
                              <div>
                                <p><strong>{item?.title}</strong></p>
                                <p>{item?.short_description}</p>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 ">
                              <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 bd-highlight">
                                  <button
                                    className="btn btn-primary px-3 me-2"
                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                </div>
                                <div className="p-2 bd-highlight">
                                  <div className="form-outline">
                                    <input
                                      id={`form${index}`}
                                      min="0"
                                      name="quantity"
                                      value={item.quantity}
                                      type="number"
                                      className="form-control"
                                      onChange={(e) => updateQuantity(index, e.target.value)}
                                    />
                                    <label className="form-label" htmlFor={`form${index}`}>
                                      Quantity
                                    </label>
                                  </div>
                                </div>
                                <div className="p-2 bd-highlight">
                                  <button
                                    className="btn btn-primary px-3 ms-2"
                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2 text-md-center">
                              <p>
                                <strong>{formatter.format(item.price * item.quantity)}</strong>
                              </p>
                              <p>Price</p>
                              <div className="col-lg-1">
            <button
              className="btn btn-danger"
              onClick={() => deleteProduct(index)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
                            </div>
                            
                          </div>
                           </>
                      )
                    })
                  )
                  
                  }


                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <p><strong>Expected shipping delivery</strong></p>
                  <p className="mb-0">12.10.2020 - 14.10.2020</p>
                </div>
              </div>
              <div className="card ">
                <div className="card-body">
                  <p><strong>We accept</strong></p>
                  <img className="me-2" width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa" />
                  <img className="me-2" width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express" />
                  <img className="me-2" width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard" />
                  <img className="me-2" width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                    alt="PayPal acceptance mark" />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>$53.98</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>Gratis</span>
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span><strong>$53.98</strong></span>
                    </li>
                  </ul>
                  <button type="button" className="btn btn-primary btn-lg btn-block">
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
