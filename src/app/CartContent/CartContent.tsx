'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import Link from 'next/link';
import { removefromcart } from '../Redux/CreateSlice';
import { IoHomeSharp } from "react-icons/io5";
import Lottie from "lottie-react";
import cartAnime from "./emptycart.json";
import Skeleton from 'react-loading-skeleton';  
import 'react-loading-skeleton/dist/skeleton.css'; 
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartContent = () => {
  const cartInfo = useSelector((state: RootState) => state.cart.cartData) as unknown as Product[];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
  
    setTimeout(() => setLoading(false), 500); 
  }, []);

  const calculateTotal = () => {
    return cartInfo.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartInfo.length === 0 && !loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you have not added any items to your cart yet.</p>
        <Link href="/">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
            Continue Shopping
          </button>
          <div className='min-w-full flex justify-center items-center translate-y-20'>
            <div className='h-96 w-96'>
              <Lottie animationData={cartAnime} loop={true} />
            </div>
          </div>
        </Link>
      </div>
    );
  }

  const deleteitem = (id: number) => {
    dispatch(removefromcart(id));
  };

  return (
    <>
      <div className='fixed top-0 min-w-full bg-blue-500 h-14 flex justify-start items-center text-white z-10 '>
        <div>
          <Link href="/">
            <p className="ml-10 text-2xl font-bold"><IoHomeSharp /></p>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center border-b border-gray-200 py-4">
                  <Skeleton className="w-24 h-24" />
                  <div className="ml-4 flex-1">
                    <Skeleton height={20} width="70%" />
                    <Skeleton height={20} width="40%" className="my-2" />
                  </div>
                  <div className="ml-4">
                    <Skeleton height={20} width="50%" />
                    <Skeleton height={20} width="40%" className="my-2" />
                  </div>
                </div>
              ))
            ) : (
              cartInfo.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                    <img src={item.image} alt={item.name} width={96} height={96} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600 font-black">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => deleteitem(item.id)} className="text-red-500 mt-2 focus:outline-none hover:text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="md:col-span-1 text-white">
            <div className="bg-blue-500 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {loading ? (
                <>
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="60%" />
                  <Skeleton height={20} width="40%" />
                  <div className="border-t mt-4 pt-4">
                    <Skeleton height={30} width="80%" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">Total</span>
                      <span className="text-2xl font-bold">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full bg-yel text-blue-800 py-3 rounded-md mt-6 active:scale-95 transition-colors">
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
