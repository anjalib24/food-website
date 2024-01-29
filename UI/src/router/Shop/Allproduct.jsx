import React, { useEffect, useState } from 'react'
import "./style.css"
import png360 from "./images/360.png"
import usflag from "./images/USA_Flag_icon.png"
import vectorimg from "./images/Vector.png"
import { fetchData } from './services/Api'
import Modal360 from './Modal360';
import Socialmedia from './Socialmedia'
import videoimg from "./images/Group.png"
import VideoModal from './VideoModal'
import Alert from './Alert'
import "./CheckProductCartResponsiveness.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useProductState } from './context/ProductContext'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Pagination } from '@mui/material'
import Loader from '@/components/Loader'
import { slice } from 'lodash'


export const Allproduct = ({ getProduct }) => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { handleaddtocard, showvideomodal, videodata, showAlert, setShowAlert, show360Modal, alertmsg, setAlertMsg, showcard, setShowCard, cart, setCart, handleExploreClicks, handleSocialmedia, handleVideomodal, setSelectedItem, selectedItem, setProductId, productId, showsocial, setShowSocial, loading, setLoading } = useProductState();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const currentItems = data;
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setLoading(true);
        const result = await fetchData(`products/get-product-list?page=${currentPage}&limit=${itemsPerPage}`);
        setData(prevData => {
          return currentPage === 1 ? result?.data?.product : [...prevData, ...result.data.product];
        });
        setTotalItems(result?.data?.totalDocs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
    };
    fetchDataFromApi();
  }, [currentPage]);

  useEffect(() => {
    if (data !== null) {
      setLoading(false);
    }
  }, [data]);


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
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await fetchData(`products/get-product-list?title=${searchInput}`);
      setData(result.data.product)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const loadMore = () => {
    setIsLoadingMore(true);
    setCurrentPage(prevPage => prevPage + 1);

    // Scroll to the top of the container when loading more
    const container = document.getElementById('yourContainerId'); // Replace 'yourContainerId' with the actual ID of the container
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth', // You can use 'auto' or 'smooth' for the scrolling behavior
      });
    }
  };
  const handleClearSearch = async () => {
    setSearchInput('');
    const result = await fetchData(`products/get-product-list?page=${currentPage}&limit=${itemsPerPage}`);
    setData(result.data.product);
   };

  return (
    <>
    {loading &&<Loader/>}
      {showAlert && <Alert type="success" message={alertmsg} />}
      {showsocial && <Socialmedia productId={productId} />}
      {show360Modal && <Modal360 data={selectedItem} />}
      {showvideomodal && <VideoModal data={videodata} title="videoModal" />}

      <div className="hambagarmenu" style={{
        marginLeft: "47px",
        marginTop: "29px"
      }}>
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Filter
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ padding: "23px" }}>
          <h5>Origin County</h5>
          <h6>All</h6>
          <a className="dropdown-item" href="#"><input
            type="checkbox"
            className="form-check-input"
            id="usaCheckbox"
            checked={selectedOrigin.includes('usa')}
            onChange={() => handleOriginCheckboxChange('usa')}
          />
            <label className="form-check-label" htmlFor="exampleCheck1">USA</label>

          </a>
          <a className="dropdown-item" href="#"> <input type="checkbox"
            className="form-check-input"
            id="usaCheckbox"
            checked={selectedOrigin.includes('india')}
            onChange={() => handleOriginCheckboxChange('india')} />
            <label className="form-check-label" htmlFor="exampleCheck1">India</label></a>
          <a className="dropdown-item" href="#"><input type="checkbox"
            className="form-check-input"
            id="usaCheckbox"
            checked={selectedOrigin.includes('france')}
            onChange={() => handleOriginCheckboxChange('france')} />
            <label className="form-check-label" htmlFor="exampleCheck1">France</label></a>
          <a className="dropdown-item" href="#"> <input type="checkbox"
            className="form-check-input"
            id="usaCheckbox"
            checked={selectedOrigin.includes('ukraine')}
            onChange={() => handleOriginCheckboxChange('ukraine')} />
            <label className="form-check-label" htmlFor="exampleCheck1">Ukraine</label></a>
          <h5 className="mt-4">Price</h5>
          <a className="dropdown-item" href="#"> <input
            type="checkbox"
            className="form-check-input"
            id="range1Checkbox"
            checked={selectedPriceRange.includes('1-20')}
            onChange={() => handlePriceCheckboxChange('1-20')}
          />
            <label className="form-check-label" htmlFor="exampleCheck1">1-20$</label></a>
          <a className="dropdown-item" href="#">
            <input
              type="checkbox"
              className="form-check-input"
              id="range1Checkbox"
              checked={selectedPriceRange.includes('20-50$')}
              onChange={() => handlePriceCheckboxChange('20-50$')}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">20-50$</label>
          </a>
          <a className="dropdown-item" href="#">
            <input
              type="checkbox"
              className="form-check-input"
              id="range1Checkbox"
              checked={selectedPriceRange.includes('50-70$')}
              onChange={() => handlePriceCheckboxChange('50-70$')}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">50-70$</label>
          </a>
          <a className="dropdown-item" href="#">
            <input
              type="checkbox"
              className="form-check-input"
              id="range1Checkbox"
              checked={selectedPriceRange.includes('+70$')}
              onChange={() => handlePriceCheckboxChange('+70$')}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">+70$</label>
          </a>
        </div>
      </div>

      <div className='container'>
        <section id="search" className="mt-5">
          <div className="col-md-12 pr-0 pl-0 mb-5" >
          <form id="out" className="navbar-form navbar-left" onSubmit={handleFormSubmit}>
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
      <button className="btn btn border rounded-end " type="button" onClick={handleClearSearch}>
 <i className="fa-solid fa-times"></i>
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

                  </div>
                )}
                {!loading && data && data?.length === 0 && (
                  <div className="col-md-12 text-center">
                    <p>No products available</p>
                  </div>
                )}
                {!loading &&
                  data?.map(item => (
                    <>
                      <div key={item._id} className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4 border border-success">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                          <img src={import.meta.env.VITE_APP_BASE_API + item?.product?.images[0]} className="text-center m-2 img-fluid" alt="#" />
                        </div>
                        <div className="product-info">
                          <div>
                            <h3 className="product-title" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '20px', marginTop: '13px' }}><strong>{item.product?.title}</strong></h3>
                          </div>
                          <div>
                            <p className="product-description" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.product?.short_description}
                            </p>
                          </div>
                          <div className='d-flex flex-row align-items-center'>
                            <h5>Origin County:</h5>
                            <img src={usflag} alt="#" className='my-auto' />
                          </div>
                        </div>
                        <div className="product-actions">
                          <div className='d-flex flex-row '>
                            {item.product?.zipFile && <div className="mr-3">
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
                            {item.product?.video_url && <div>
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
                          <h3 className="text-center">{formatter.format(item.product?.price)}</h3>
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
                            onClick={() => window.open(`/productdetail/${item?.product?._id}`, "_blank")}
                            data-toggle="modal"
                            data-target="#exploreModal"
                          >
                            Explore
                          </button>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Stack spacing={1}>
                              <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly />
                            </Stack>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {data && data.length < totalItems && (
                  <button onClick={loadMore} type="button" className="btn btn-danger">
                    {isLoadingMore ? 'Loading...' : 'Load More +'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}









