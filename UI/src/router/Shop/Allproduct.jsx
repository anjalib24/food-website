import React, { useEffect, useState } from 'react'
import "./style.css"
import png360 from "./images/360.png"
import usflag from "./images/USA_Flag_icon.png"
import vectorimg from "./images/Vector.png"
import { fetchData } from './services/Api'
import Modal360 from './Modal360';
import Socialmedia from './Socialmedia'
import Loader from '@/components/Loader'
import videoimg from "./images/Group.png"
import VideoModal from './VideoModal'
import Alert from './Alert'
import "./CheckProductCartResponsiveness.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useProductState } from './context/ProductContext'

export const Allproduct = () => {
  const history = useHistory();

  const [data, setData] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { handleaddtocard, showvideomodal, setShowvideomodal, videodata, setVideoData, showAlert, setShowAlert, show360Modal, setShow360Modal, alertmsg, setAlertMsg, showcard, setShowCard, cart, setCart, handleExploreClicks, handleSocialmedia, handleVideomodal, setSelectedItem, selectedItem, setProductId, productId, showsocial, setShowSocial,setLoading ,loading} = useProductState();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData("products/get-product", { limit: 25 });
        setLoading(true)
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




  return (
    <>
      {showAlert && <Alert type="success" message={alertmsg} />}
      {showsocial && <Socialmedia showModal={showsocial} setShowModal={setShowSocial} productId={productId} />}
      {show360Modal && <Modal360 showModal={show360Modal} setShowModal={setShow360Modal} data={selectedItem} />}
      {showvideomodal && <VideoModal showModal={showvideomodal} setShowModal={setShowvideomodal} data={videodata} title="videoModal" />}
      <div className='hambagarmenu' >
        <i className="fa-solid fa-bars"></i>
      </div>
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
            <div id="checkboxfilter" className="col-md-2 align-items-centerss ">
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
            <div className="col-md-10" >
              <div className="row">
                {loading && (
                  <div className="col-md-12 text-center">
                    <Loader/>
                  </div>
                )}
                {!loading && data && data.length === 0 && (
                  <div className="col-md-12 text-center">
                    <p>No products available</p>
                  </div>
                )}
                {!loading &&
                  (selectedOrigin.length === 0 && selectedPriceRange.length === 0
                    ? data?.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase()))
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
                  <div key={item.id} className="col-md-3 col-sm-6 col-md-4 col-lg-3 mb-4 border border-success">
                    <div>
                      <img src={"/api" + item.images[0]} className="text-center m-2" style={{ maxWidth: '100%', height: '200px', objectFit: 'cover' }} alt="#" />
                    </div>
                    <div className="product-info">
                      <div>
                        <h3 className="product-title" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '20px', marginTop: '13px' }}><strong>{item.title}</strong></h3>
                      </div>
                      <div>
                        <p className="product-description" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.short_description}
                        </p>
                      </div>
                      <div>
                        <h5>Origin County: <img src={usflag} alt="#" /></h5>
                      </div>
                    </div>
                    <div className="product-actions">
                      <div className='d-flex flex-row '>
                        {item.zipFile_url && <div className="mr-3">
                          <img
                            src={png360}
                            alt="png360"
                            onClick={() => handleExploreClicks(item)}
                            data-toggle="modal"
                            data-target="#explore360Modal"
                            style={{ cursor: 'pointer' }}
                          />
                        </div>}
                        <div>
                          <div className="mr-3">
                            <img alt='vector' src={vectorimg}
                              onClick={() => handleSocialmedia(item)}
                              data-toggle="modal"
                              data-target="#socialmedia"
                              style={{ cursor: 'pointer' }}
                            />
                          </div>
                        </div>
                        {item.video_url && <div>
                          <div className="mr-3">
                            <img alt='vector' src={videoimg}
                              onClick={() => handleVideomodal(item)}
                              data-toggle="modal"
                              data-target="#videomodal"
                              style={{ cursor: 'pointer', width: "22px", height: "20p" }}
                            />
                          </div>
                        </div>}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-center">{formatter.format(item.price)}</h3>
                    </div>
                    <div className="d-grid gap-3 mt-1">
                      <button
                        className="btn btn-success btn-block"
                        onClick={() => handleaddtocard(item)}
                        data-target="#myModal2"
                        data-toggle="modal"
                      >
                        Add to cart
                      </button>
                      <button
                        className="btn btn-white btn-block border border-success mb-1"
                        onClick={() => history.push(`/productdetail/${item._id}`)}
                        data-toggle="modal"
                        data-target="#exploreModal"
                      >
                        Explore
                      </button>
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








