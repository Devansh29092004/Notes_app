import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId ||
        Date.now().toString(36),
      createAt: new Date().toISOString()
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));

    }
    else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});

  }

  return (
    <div className="max-w-2xl mx-auto mt-2 p-6">
      <form>
        <div className="flex flex-row gap-4 items-center">
          <input
            className="flex-1 p-3 rounded-2xl w-[400px] md:w-[600px]"
            type="text"
            placeholder="Enter Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            type="button"
            className="px-6 py-3 rounded-2xl"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>
        <div className="mt-8">
          <textarea
            className="w-full min-h-[300px] p-4 text-lg rounded-2xl min-w-[400px] md:min-w-[600px]"
            placeholder="Enter Content Here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default Home;