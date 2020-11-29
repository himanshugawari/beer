import { useState, useEffect } from 'react';
import Search from './components/Search';
import Beers from './components/Beers';
import Pagination from './components/Pagination';
import Categories from './components/Categories';

function App() {
  // Beer state
  const [beers, setBeers] = useState([]);
  const [beerImages, setBeerImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Page Count
  const [currentPage, setCurrentPage] = useState(1);
  const [beerPerPage] = useState(20);

  // Filtered Beer Array
  const [filteredBeers, setFilteredBeers] = useState([]);

  // Filtering ounces dynamically
  const [ounces, setOunces] = useState([]);

  // Array of Unique ounce values
  const uniqueOunces = (data) => {
    const allOunces = ['all', ...new Set(data.map((item) => item.ounces))];

    setOunces(
      allOunces.sort(function (a, b) {
        return a - b;
      })
    );
  };

  // Filtered beers array using ounces
  const filterItems = (category) => {
    if (category === 'all') {
      setFilteredBeers(beers);
      return;
    }
    const ouncesFiltered = beers.filter(
      (beer) => beer.ounces === Number(category)
    );
    setFilteredBeers(ouncesFiltered);
  };

  // Fetching beer data
  useEffect(() => {
    const fetchBeers = async () => {
      setLoading(true);
      const response = await fetch(
        'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json'
      );
      const result = await response.json();
      setBeers(result);
      uniqueOunces(result);
      setLoading(false);
    };
    const fetchImages = async () => {
      setLoading(true);
      const response = await fetch(
        'https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json'
      );
      const result = await response.json();
      setBeerImages(result);
      setLoading(false);
    };
    fetchBeers();
    fetchImages();
  }, []);

  // Setting Filtered beers array to initial beers array
  useEffect(() => {
    setFilteredBeers(beers);
  }, [beers]);

  // For Pagination
  const indexOfLastPost = currentPage * beerPerPage;
  const indexOfFirstPost = indexOfLastPost - beerPerPage;
  const currentBeers = filteredBeers.slice(indexOfFirstPost, indexOfLastPost);

  // Set Current page if total pages are less than 10
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search using name or style of beers array
  const handleChange = (e) => {
    const search = e.target.value;
    if (search !== '') {
      const filteredBeers = beers.filter(
        (beer) =>
          beer.style.toLowerCase().includes(search.toLowerCase()) ||
          beer.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBeers(filteredBeers);
    } else {
      setFilteredBeers(beers);
    }
  };

  return (
    <main>
      <section className='menu section'>
        <Search
          handleChange={handleChange}
          placeholder='Search by style or name...'
        />
        <div className='title'>
          <h2>beers </h2>
          <div className='underline'></div>
        </div>
        <Categories categories={ounces} filterItems={filterItems} />
        <Beers beers={currentBeers} loading={loading} beerImages={beerImages} />
        <Pagination
          beerPerPage={beerPerPage}
          totalBeers={filteredBeers.length}
          paginate={paginate}
          activePage={currentPage}
        />
      </section>
    </main>
  );
}

export default App;
