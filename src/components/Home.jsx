import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');

  return (
    <div className='flex flex-row gap-7'>
      <input
        className='p-2 rounded-2xl mt-2'
        type="text"
        placeholder="Enter Title Here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className='p-2 rounded-2xl mt-2'>
       {
        pasteId ? "Update My Paste" : "Create My Paste"
       }
      </button>
    </div>
  );
}

export default Home;