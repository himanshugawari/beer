import React from 'react';

const Beers = ({ beers, loading, beerImages }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const imageArr = beerImages.map((img) => img.image);
  return (
    <div className='section-center'>
      {beers.map((beer) => {
        const { abv, ibu, id, name, style, ounces } = beer;
        return (
          <article key={id} className='menu-item'>
            <img
              src={imageArr[Math.floor(Math.random() * 5)]}
              alt={name}
              className='photo'
            />
            <div className='item-info'>
              <header>
                <h4>Name : {name}</h4>
              </header>
              <h4>Style : {style}</h4>
              <h4>ABV : {abv}</h4>
              {ibu && <h4>IBU : {ibu}</h4>}
              <h4>Ounces : {ounces}</h4>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Beers;
