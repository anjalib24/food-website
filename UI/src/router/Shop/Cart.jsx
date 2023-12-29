import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchData } from './services/Api';
import axios from 'axios';
import Noproductincart from './Noproductincart';
import "./Carttest.css"

const Cart = () => {
  const [basketCount, setBasketCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const history = useHistory();
  const token = localStorage.getItem('token');

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const fetchDataFromApi = async () => {
    try {
      const result = await fetchData("products/get-product", { limit: 25 });
      if (token) {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products/get-cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const cartItems = response?.data?.data?.items;
        if (cartItems.length > 0) {
          const filteredData = result?.data?.docs
            .filter(item => cartItems.some(cartItem => cartItem?.productId == item._id))
            .map(item => {
              const cartItem = cartItems.find(cartItem => cartItem.productId == item._id);
              return {
                product: {
                  ...item,
                  quantity: cartItem ? cartItem.quantity : 0,
                  total: cartItem ? cartItem.total : 0
                }
              };
            });
          setCartData(filteredData.length > 0 ? { filteredData } : []);
        } else {
          setCartData([])
        }


      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    countCartItems();
  }, []);

  const totalPrice = cartData?.filteredData?.reduce((total, item) => total + (item?.product.price * item?.product?.quantity), 0)

  const countCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.product.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartData(updatedCart);
    const itemCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
    setBasketCount(itemCount);
  };

  const updateQuantity = async (index, newQuantity, item, incordec) => {

    const token = localStorage.getItem('token');
    const itemnewQuantity = item.product.quantity + incordec;
    if (token) {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/products/add-to-cart', [{
        productId: item?.product?._id,
        quantity: incordec,
        shippingCharge: 0
      }], {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchDataFromApi();
    } else {
      const updatedCart = [...cartData];
      updatedCart[index].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      countCartItems();
    }
  };

  const deleteProduct = (index) => {
    const updatedCart = [...cartData];
    updatedCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    countCartItems();
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {

      history.push('/login');
    } else {
      history.push('/strip')
    }
  };

  console.log(cartData, "final cart to show data");
  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex flex-row  justify-content-center my-4">
            <div className="col-md-8">
              <div className="card ">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart items</h5>
                </div>
                <div className="card-body ">
                  {cartData?.length === 0 ? (
                    <Noproductincart />
                  ) : (

                    (token ?
                      (cartData.filteredData) : cartData || []).map((item, index) => {
                        return (
                          <>


                            {<div className="_1AtVbE col-12-12">
                              <div className="zab8Yh _10k93p">
                                <div className="_2nQDXZ">
                                  <a href="/nb-nicky-boy-printed-men-round-neck-black-t-shirt/p/itmb1c6b5e8551de?pid=TSHGW3FNAGC9UJ7X&amp;lid=LSTTSHGW3FNAGC9UJ7XCU0GGF&amp;marketplace=FLIPKART"><span>
                                    <div className="CXW8mj" style={{ height: '112px', width: '112px' }}>
                                      <img loading="lazy" className="_396cs4" alt="productImg" src={"/api" + item?.products?.images[0]} />
                                    </div></span></a>
                                  <div className="_3fSRat">
                                    <div className="_2-uG6-">
                                      <a className="_2Kn22P gBNbID" href="/nb-nicky-boy-printed-men-round-neck-black-t-shirt/p/itmb1c6b5e8551de?pid=TSHGW3FNAGC9UJ7X&amp;lid=LSTTSHGW3FNAGC9UJ7XCU0GGF&amp;marketplace=FLIPKART">{item?.product?.title}</a>
                                    </div>
                                    <div className="_20RCA6"> {item?.product?.short_description}</div>
                                    {/* <div className="_3ZS8sw">Seller:NIKKYBOY
                                           <img className="WC-2wP" src="//static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" />
                                     </div> */}
                                    {/* <span className="_2-ut7f _1WpvJ7">{formatter.format(item.product.price * item.product.quantity)}</span> */}
                                  </div>
                                </div>
                                <div className="nZz3kj _1hNI6F">
                                  <div className="_1uc2IE">
                                    <div className="_3dY_ZR">
                                      <button
                                        className="_23FHuj"
                                        disabled={item.quantity === 1}
                                        onClick={() => updateQuantity(index, item.quantity - 1, item, -1)}
                                      >
                                        –
                                      </button>
                                      <div className="_26HdzL">
                                        <input type="text" className="_253qQJ" id={`form${index}`}
                                          min="0"
                                          name="quantity"
                                          value={item?.product?.quantity}
                                          onChange={(e) => updateQuantity(index, e.target.value)} />
                                      </div>
                                      <button className="_23FHuj" onClick={() => updateQuantity(index, item.quantity + 1, item, 1)}
                                      > + </button>
                                    </div>
                                  </div>
                                  <div className="_10vWcL td-FUv WDiNrH">
                                    <div className="_3dsJAO">Remove</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            }
                          </>
                        )
                      })
                  )}
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body text-right">
                  <button type="button" className="btn btn-primary" onClick={() => handleCheckout()}>
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Price Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li
                      className="list-group-item d-flex justify-content-between flex-row border-0 px-0 pb-0">
                      <div>
                        Price
                      </div>
                      <div>
                        {totalPrice}
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between flex-row  px-0">
                      <div>
                        Delivery Charges
                      </div>
                      <div>
                        2$
                      </div>
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between flex-row border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <div>
                        <span><strong>${totalPrice}</strong></span>
                      </div>
                    </li>
                  </ul>

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
