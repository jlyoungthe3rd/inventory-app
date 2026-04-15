import { Link } from 'react-router-dom';

export const SplashScreen = () => {
  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
      <h1 className='mb-8 text-4xl font-bold text-gray-800'>
        Game Master Tools
      </h1>
      <div className='flex gap-4'>
        <Link
          to='/inventory'
          className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition'
        >
          Inventory Manager
        </Link>
        <Link
          to='/compendium'
          className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition'
        >
          Item Compendium
        </Link>
      </div>
    </div>
  );
};
