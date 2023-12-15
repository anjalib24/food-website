import React, { useEffect, useState } from 'react'
import "./style.css"
import productimg from "./images/image 6.png"
import png360 from "./images/360.png"
import usflag from "./images/USA_Flag_icon.png"
import vectorimg from "./images/Vector.png"
import { fetchData } from './services/Api'


export const Allproduct = () => {

  const [data, setData] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  console.log(selectedOrigin, "country");

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData("products/get-product");
        console.log(result.data.docs)
        setData(result.data.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, []);
  const handleOriginCheckboxChange = (value) => {
    // Handle the change in the selectedOrigin state
    setSelectedOrigin((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const handlePriceCheckboxChange = (value) => {
    // Handle the change in the selectedPriceRange state
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
      <div className='container'>
        <section id="search" className="mt-5">
          <div className="col-md-12 pr-0 pl-0 mb-5" >
            <form id="out" className="navbar-form navbar-left" action="/action_page.php">
              <div className="input-group border rounded-pill">
                <input type="text" className="form-control" placeholder="Search" />
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
                  checked={selectedOrigin.includes('USA')}
                  onChange={() => handleOriginCheckboxChange('USA')}
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
                  checked={selectedOrigin.includes('France')}
                  onChange={() => handleOriginCheckboxChange('France')} />
                <label className="form-check-label" htmlFor="exampleCheck1">France</label>
              </div>
              <div className="mb-3  mt-3 form-check">
                <input type="checkbox"
                  className="form-check-input"
                  id="usaCheckbox"
                  checked={selectedOrigin.includes('Ukraine')}
                  onChange={() => handleOriginCheckboxChange('Ukraine')} />
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
                {
                  (selectedOrigin.length == 0 && selectedPriceRange.length == 0
                    ? data
                    :  data
                    .filter(item =>
                      (selectedOrigin.length === 0 || selectedOrigin.includes(item.origin_country)) &&
                      (selectedPriceRange.length === 0 || selectedPriceRange.includes(getPriceRange(item.price)))
                    )
                  )?.map(item => {
                    return (
                      <div key={item.id} className="col-md-3 mb-4 border border-success">

                        <img src={productimg} className="text-center m-2" alt="#" />
                        <h3><strong>{item.title}</strong></h3>
                        <p>{item.description}</p>
                        <h5>Origin County: <img src={usflag} alt="#" /></h5>
                        <a href="/" className="mr-3"><img src={png360} /></a><a href="/" className="mr-3"><img alt='vector' src={vectorimg} /></a>

                        <h3 className="text-center">{formatter.format(item.price)}</h3>
                        <div className="d-grid gap-3">
                          <button className="btn btn-success btn-block ">Add to Cart</button>
                          <button className="btn btn-success btn-block ">Buy Now</button>
                          <button className="btn btn-white btn-block border border-success mb-1 ">Explore</button>
                        </div>

                      </div>)
                  })
                }


              </div>
            </div>
          </div>

        </section>

      </div>

    </>
  )
}
