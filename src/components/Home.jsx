/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBrands } from '../Redux/Slices/brandsFetchSlice';
import { setTitle } from '../Redux/Slices/menuSlice';
import Brands from './Brands';
import SearchInput from './SearchInput';

function Home() {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const { loading } = useSelector((state) => state.brands);
  const [newBrands, setNewBrands] = useState([]);
  const [filterBrands, setFilterBrands] = useState([]);
  const [searchTexts, setSearchTexts] = useState('');

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(setTitle('Brands'));
  }, []);

  useEffect(() => {
    setSearchTexts('');
    setNewBrands(brands);
    setFilterBrands(brands);
  }, [brands]);

  const handleBrandClick = (link) => {
    dispatch(fetchBrands(link));
  };

  if (loading) {
    return (
      <h2 className="h-screen animate-pulse text-white flex items-center justify-center text-xl">
        Loading.........
      </h2>
    );
  }
  return (
    <main className="">
      <article className=" homeBg flex  flex-col text-white items-end p-8">
        <h3 className="flex flex-col text-2xl font-bold items-end">
          2023
          <span>Phone Specs</span>
        </h3>
        <h4 className="flex flex-col items-center">
          {`${newBrands.length}
          Brands`}
        </h4>
      </article>
      <h3 className="text-white grid grid-cols-2 gap-4 items-center px-3 py-1 border bg-rose-500 border-[#e0407d] text-xl shadow-xl">
        <div className="flex-1">
          {newBrands.length === 119 ? (
            <p className="flex-1">All Brands Stats</p>
          ) : (
            <p className="flex-1 capitalize">{`${searchTexts} Stats`}</p>
          )}
        </div>
        <SearchInput
          brands={newBrands}
          setNewBrands={setNewBrands}
          filterBrands={filterBrands}
          searchTexts={searchTexts}
          setSearchTexts={setSearchTexts}
        />
      </h3>
      <div className="flex w-full px-4 py-3 border-rose-500 border bg-rose-600 text-rose-200 font-semibold">
        <h3 className="flex flex-col text-xl flex-1 justify-between items-center">
          {newBrands.length}
          <span className="text-sm"> Brands</span>
        </h3>
        <h3 className="flex flex-col text-xl flex-1 justify-between items-center">
          {newBrands.length * 33}
          <span className="text-sm">Views</span>
        </h3>
        <h3 className="flex flex-col text-xl flex-1 justify-between items-center">
          {newBrands.length * 234}
          <span className="text-sm">Likes</span>
        </h3>
        <h3 className="flex flex-col text-xl flex-1 justify-between items-center">
          {newBrands.length * 223}
          <span className="text-sm">Orders</span>
        </h3>
      </div>
      {newBrands.length < 1 && (
        <p className="text-rose-200 mt-8 flex justify-center">
          No brands available for your search
        </p>
      )}
      <section className="cards grid grid-cols-2 w-full justify-center items-center">
        {newBrands.map((brand) => (
          <Link key={brand.brand_id} to={`/brands/${brand.brand_slug}`}>
            <section
              onClick={() => handleBrandClick(brand.details)}
              aria-hidden="true"
              className="border border-rose-400"
            >
              <Brands brand={brand} />
            </section>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Home;
