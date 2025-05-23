import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Paste() {
  const pastes = useSelector((state) => state.pastes.pastes);
  const [searchTerm, setSearchTerm] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  }

  const handleShare = (paste) => {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
      }).then(() => {
        toast.success("Shared successfully!");
      }).catch(() => {
        toast.error("Share cancelled or failed.");
      });
    } else {
      toast.error("Web Share API not supported on this device.");
    }
  };

  return (
    <div>
      <input
        className='p-2 rounded-2xl w-[400px] md:w-[600px] mt-2'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search here"
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 && filteredData.map((paste) => {
          return (
            <div className="border" key={paste?._id}>
              <div>
                {paste.title}
              </div>
              <div>
                {paste.content}
              </div>
              <div className='flex flex-row gap-4 place-content-evenly'>
                <button  onClick={() => navigate(`/?pasteId=${paste?._id}`)}>
                  Edit
                </button>
                <button onClick={() => navigate(`/pastes/${paste?._id}`)}>
                  View
                </button>
                <button onClick={() => handleDelete(paste?._id)}>
                  Delete
                </button>
                <button onClick={() => navigator.clipboard.writeText(paste.content) && toast.success("Copied to clipboard!")}>
                  Copy
                </button>
                <button onClick={() => handleShare(paste)}>
                  Share
                </button>
              </div>
              <div>
                {paste.createAt}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Paste;
