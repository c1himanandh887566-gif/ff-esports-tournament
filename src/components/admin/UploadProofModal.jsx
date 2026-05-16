import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, CheckCircle, Save, X, Image as ImageIcon } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const UploadProofModal = ({ match, onClose }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (file?.preview) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handleFiles = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile)
      }));
      setError('');
    } else {
      setError('Please select a valid image file.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);
      const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
      
      if (!imgbbKey) throw new Error("ImgBB API Key is missing.");

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        const resultImageUrl = data.data.display_url;
        
        // Update Firestore
        const matchRef = doc(db, 'matches', match.id.toString());
        await updateDoc(matchRef, { resultImageUrl });

        setIsSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error(data.error?.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-lg rounded-2xl relative border-cyan-500/30">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10">
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2 font-heading uppercase">Upload Proof</h2>
          <p className="text-gray-400 mb-6 text-sm">Upload the official scoreboard screenshot for Match {match.id}.</p>

          {error && <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded mb-6 text-center border border-red-500/30 text-sm">{error}</div>}

          {isSuccess ? (
            <div className="py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">Upload Successful!</h3>
              <p className="text-gray-400 mt-2">The proof image has been attached to the match.</p>
            </div>
          ) : (
            <>
              {!file ? (
                <div 
                  className="border-2 border-dashed border-cyan-500/30 rounded-xl p-10 hover:bg-white/5 transition-colors cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    if (e.dataTransfer.files?.length > 0) handleFiles(e.dataTransfer.files[0]);
                  }}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.length > 0) handleFiles(e.target.files[0]);
                    }}
                  />
                  <UploadCloud className="w-12 h-12 text-cyan-500/50 group-hover:text-cyan-400 mx-auto mb-4 transition-colors" />
                  <p className="text-gray-300 font-medium">Click or drag image here</p>
                  <p className="text-gray-500 text-sm mt-2">Supports JPG, PNG (Max 5MB)</p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-white/10 group mb-6">
                  <img src={file.preview} alt="Preview" className="w-full h-48 object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setFile(null)}
                      className="px-4 py-2 bg-red-500/80 text-white rounded font-bold uppercase text-sm flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              )}

              {file && (
                <button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {isUploading ? (
                    <span className="animate-pulse">Uploading...</span>
                  ) : (
                    <><Save className="w-5 h-5"/> Save Proof</>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadProofModal;
