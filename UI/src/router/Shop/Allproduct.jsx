import React, { useEffect, useState } from 'react'
import "./style.css"
import productimg from "./images/image 6.png"
import png360 from "./images/360.png"
import usflag from "./images/USA_Flag_icon.png"
import vectorimg from "./images/Vector.png"
import { fetchData } from './services/Api'
import Modal from './Modal'
import Modal360 from './Modal360';


export const Allproduct = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [show360Modal, setShow360Modal] = useState(false);


  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData("products/get-product", { limit: 25 });
        setData(result.data.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleOriginCheckboxChange = (value) => {
    setSelectedOrigin((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const handlePriceCheckboxChange = (value) => {
    setSelectedPriceRange((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };
  const getPriceRange = (price) => {
    if (price >= 1 && price <= 20) {
      return '1-20';
    } else if (price > 20 && price <= 50) {
      return '20-50$';
    } else if (price > 50 && price <= 70) {
      return '50-70$';
    } else {
      return '+70$';
    }
  };

  const handleExploreClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleExploreClicks = (item) => {
    setSelectedItem(item);
    setShow360Modal(true);
  };

console.log(show360Modal,"modal 360  setshow");
  return (
    <>
      {/* <Modal showModal={showModal} setShowModal={setShowModal} data={selectedItem} /> */}
<Modal360 showModal={show360Modal} setShowModal={setShow360Modal} data={selectedItem}  />
      <div className='container'>
        <section id="search" className="mt-5">
          <div className="col-md-12 pr-0 pl-0 mb-5" >
            <form id="out" className="navbar-form navbar-left" action="/action_page.php">
              <div className="input-group border rounded-pill">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <div className="input-group-btn">
                  <button className="btn btn border rounded-end " type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-md-2 align-items-centerss ">
              <h5>Origin County</h5>
              <h6>All</h6>
              <div className="mb-3 mt-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="usaCheckbox"
                  checked={selectedOrigin.includes('usa')}
                  onChange={() => handleOriginCheckboxChange('usa')}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">USA</label>
              </div>
              <div className="mb-3 mt-3 form-check">
                <input type="checkbox"
                  className="form-check-input"
                  id="usaCheckbox"
                  checked={selectedOrigin.includes('india')}
                  onChange={() => handleOriginCheckboxChange('india')} />
                <label className="form-check-label" htmlFor="exampleCheck1">India</label>
              </div>
              <div className="mb-3 mt-3 form-check">
                <input type="checkbox"
                  className="form-check-input"
                  id="usaCheckbox"
                  checked={selectedOrigin.includes('france')}
                  onChange={() => handleOriginCheckboxChange('france')} />
                <label className="form-check-label" htmlFor="exampleCheck1">France</label>
              </div>
              <div className="mb-3  mt-3 form-check">
                <input type="checkbox"
                  className="form-check-input"
                  id="usaCheckbox"
                  checked={selectedOrigin.includes('ukraine')}
                  onChange={() => handleOriginCheckboxChange('ukraine')} />
                <label className="form-check-label" htmlFor="exampleCheck1">Ukraine</label>
              </div>

              <h5 className="mt-4">Price</h5>
              <div className="mb-3  mt-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="range1Checkbox"
                  checked={selectedPriceRange.includes('1-20')}
                  onChange={() => handlePriceCheckboxChange('1-20')}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">1-20$</label>
              </div>
              <div className="mb-3  mt-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="range1Checkbox"
                  checked={selectedPriceRange.includes('20-50$')}
                  onChange={() => handlePriceCheckboxChange('20-50$')}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">20-50$</label>
              </div>
              <div className="mb-3  mt-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="range1Checkbox"
                  checked={selectedPriceRange.includes('50-70$')}
                  onChange={() => handlePriceCheckboxChange('50-70$')}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">50-70$</label>
              </div>
              <div className="mb-3  mt-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="range1Checkbox"
                  checked={selectedPriceRange.includes('+70$')}
                  onChange={() => handlePriceCheckboxChange('+70$')}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">+70$</label>
              </div>
            </div>
            <div className="col-md-10">
              <div className="row">

                {loading && (
                  <div className="col-md-12 text-center">
                    <p>Loading...</p>
                  </div>
                )}
                {!loading && data && data.length === 0 && (
                  <div className="col-md-12 text-center">
                    <p>No products available</p>
                  </div>
                )}
                {!loading &&
                  (selectedOrigin.length === 0 && selectedPriceRange.length === 0
                    ? data.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase()))
                    : data
                      .filter(item =>
                        (selectedOrigin.length === 0 || selectedOrigin.includes(item.country.name)) &&
                        (selectedPriceRange.length === 0 || selectedPriceRange.includes(getPriceRange(item.price))) &&
                        item.title.toLowerCase().includes(searchInput.toLowerCase())
                      )
                  )?.length === 0 ? (
                  <div className="col-md-12 text-center">
                    <p>No products match the search criteria</p>
                  </div>
                ) : (
                  data?.filter(item =>
                    (selectedOrigin.length === 0 || selectedOrigin.includes(item.country.name)) &&
                    (selectedPriceRange.length === 0 || selectedPriceRange.includes(getPriceRange(item.price))) &&
                    item.title.toLowerCase().includes(searchInput.toLowerCase())
                  )
                )?.map(item => (
                  <div key={item.id} className="col-md-3 mb-4 border border-success card-container">
                    <div className="d-flex flex-column h-100">
                      <div>
                        <img src={"/api" + item.images[0]} className="text-center m-2" alt="#" />
                        <div className="card-content">
                          <h3 className="clamp-2">{item.title}</h3>
                          <p className="description clamp-2">{item.description}</p>
                          <h5>Origin County: <img src={usflag} alt="#" /></h5>

                          <div className='d-flex flex-row '>
                            <div className="mr-3">
                              <img
                                src={png360}
                                alt="png360"
                                onClick={() => handleExploreClicks(item)}
                                data-toggle="modal"
                                data-target="#explore360Modal"  
                                
                                style={{ cursor: 'pointer' }}
                              />
                            </div>


                            
                            <div>
                              <a href="/" className="mr-3">
                                <img alt='vector' src={vectorimg} />
                              </a>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="flex-grow-1 d-flex flex-column justify-content-between">
                        <div>
                          <h3 className="text-center">{formatter.format(item.price)}</h3>
                        </div>
                        <div className="d-grid gap-3">
                          <button className="btn btn-success btn-block ">Add to Cart</button>
                          <button className="btn btn-success btn-block ">Buy Now</button>
                          <button
                            className="btn btn-white btn-block border border-success mb-1"
                            onClick={() => handleExploreClick(item)}
                            data-toggle="modal"
                            data-target="#exploreModal"
                          >
                            Explore
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

      </div>

    </>
  )
}
