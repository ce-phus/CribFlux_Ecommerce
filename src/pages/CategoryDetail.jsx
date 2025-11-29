import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Products } from '../components'
import { getCategoryDetail } from '../actions/productsActions';
import { useParams, Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const CategoryDetail = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();

    const { category, loading, error, products } = useSelector(state => state.categoryDetailReducer);
    console.log(category)

    useEffect(()=> {
        dispatch(getCategoryDetail(slug))
    }, [dispatch, slug]);


    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-violet-400 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl mb-2">Failed to load Categories</h2>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }
  return (
    <div className='container mx-auto pb-20'>
        <h1 className='text-white text-4xl font-light flex items-center justify-center mt-20'>
            {loading ? <Skeleton width={300} height={40} /> : error ? "" : category?.title}
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-1'>
            {products && products.map((product) => (
                <div key={product.id}>
                    <Products product={product} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default CategoryDetail