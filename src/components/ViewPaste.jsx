import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.pastes.pastes);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const paste = allPastes.find((p) => p._id === id);
    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [id, allPastes]);

  return (
    <div className="max-w-2xl mx-auto mt-2 p-6">
      <form>
        <div className="flex flex-row gap-4 items-center">
          <input
            className="flex-1 p-3 rounded-2xl w-[400px] md:w-[600px]"
            type="text"
            placeholder="Enter Title Here"
            value={title}
            readOnly
          />
        </div>
        <div className="mt-8">
          <textarea
            className="w-full min-h-[300px] p-4 text-lg rounded-2xl min-w-[400px] md:min-w-[600px]"
            placeholder="Enter Content Here"
            value={value}
            readOnly
          />
        </div>
      </form>
    </div>
  );
}

export default ViewPaste;
