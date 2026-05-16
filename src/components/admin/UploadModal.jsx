import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, CheckCircle, Search, AlertCircle, Save, X, Trash2, Image as ImageIcon } from 'lucide-react';
import { parseScreenshots } from '../../lib/gemini';
import { publishMatchResult } from '../../lib/syncEngine';

const UploadModal = ({ match, onClose }) => {
  const [step, setStep] = useState('idle'); // idle, scanning, verification, success
  const [teamData, setTeamData] = useState([]);
  const [matchScores, setMatchScores] = useState({ left: 0, right: 0 });
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  const handleFileSelect = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map(file => {
      // Add a preview property to each file object for rendering
      Object.defineProperty(file, 'preview', {
        value: URL.createObjectURL(file),
        writable: true,
        enumerable: false
      });
      return file;
    });

    if (files.length + newFiles.length > 3) {
      setError('You can only upload up to 3 images per match.');
      return;
    }
    setFiles([...files, ...newFiles]);
    setError('');
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    const removedFile = newFiles.splice(index, 1)[0];
    if (removedFile && removedFile.preview) {
      URL.revokeObjectURL(removedFile.preview);
    }
    setFiles(newFiles);
  };

  const handleProcessImages = async () => {
    if (files.length === 0) return;
    setStep('scanning');
    setError('');
    
    try {
      const data = await parseScreenshots(files);
      const formattedData = data.players.map((player, idx) => ({ ...player, id: idx + 1 }));
      setTeamData(formattedData);
      setMatchScores({ left: data.leftTeamScore, right: data.rightTeamScore });
      setStep('verification');
    } catch (err) {
      console.error(err);
      setError('Error parsing: ' + err.message);
      setStep('idle');
    }
  };

  const handlePublish = async () => {
    setStep('uploading');
    try {
      await publishMatchResult(match, teamData, matchScores);
      setStep('success');
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to sync database.");
      setStep('verification');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl relative border-purple-500/30">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-2 font-heading uppercase">
            Upload Result: <span className="text-purple-400">{match.team1?.name} vs {match.team2?.name}</span>
          </h2>
          <p className="text-gray-400 mb-8">Upload up to 3 screenshots (Scoreboard + Stats) to automatically sync standings and stats.</p>

          {error && <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded mb-6 text-center border border-red-500/30">{error}</div>}

          {step === 'idle' && (
            <div className="space-y-6">
              <div 
                className="border-2 border-dashed border-purple-500/50 rounded-2xl p-12 text-center bg-purple-900/10 hover:bg-purple-900/20 transition-all cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFileSelect(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" className="hidden" ref={fileInputRef} accept="image/*" multiple onChange={(e) => handleFileSelect(e.target.files)} />
                <UploadCloud className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Click or Drag Images Here</h3>
                <p className="text-gray-400 text-sm">Upload up to 3 images ({files.length}/3 selected)</p>
              </div>

              {files.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-white font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Selected Images
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {files.map((file, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/50 p-2">
                        <img 
                          src={file.preview} 
                          alt="Preview" 
                          className="w-full h-24 object-cover rounded"
                        />
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                          className="absolute top-3 right-3 bg-red-500/80 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-gray-400 mt-2 truncate" title={file.name}>{file.name}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button 
                      onClick={handleProcessImages}
                      className="btn-primary px-8 py-3 w-full sm:w-auto"
                    >
                      Parse {files.length} Image{files.length > 1 ? 's' : ''} with AI
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'scanning' && (
            <div className="p-12 text-center">
              <Search className="w-16 h-16 text-cyan-400 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-2">Gemini Vision Parsing...</h3>
              <p className="text-gray-400">Extracting players and cross-referencing stats across {files.length} images...</p>
            </div>
          )}

          {step === 'verification' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><AlertCircle className="w-5 h-5 text-cyan-400"/> Verify Data</h3>
                <button onClick={handlePublish} className="btn-primary flex items-center gap-2 px-6 py-2"><Save className="w-4 h-4"/> Sync Results</button>
              </div>
              
              <div className="mb-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg flex justify-between items-center">
                <div className="text-center w-1/3">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Left Team Score</p>
                  <p className="text-3xl font-black text-white">{matchScores.left}</p>
                </div>
                <div className="text-center w-1/3">
                  <p className="text-gray-500 font-black italic text-xl">VS</p>
                </div>
                <div className="text-center w-1/3">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Right Team Score</p>
                  <p className="text-3xl font-black text-white">{matchScores.right}</p>
                </div>
              </div>

              <div className="overflow-x-auto bg-black/40 rounded-lg border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white/5 text-gray-300 uppercase tracking-wider text-xs">
                      <th className="p-3">Player</th>
                      <th className="p-3 text-center">K / D / A</th>
                      <th className="p-3 text-center">Damage</th>
                      <th className="p-3 text-center">Revives</th>
                      <th className="p-3 text-center">Headshot %</th>
                      <th className="p-3 text-center">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {teamData.map((player) => (
                      <tr key={player.id || player.name}>
                        <td className="p-3 text-white font-bold">{player.name}</td>
                        <td className="p-3 text-center text-gray-300">{player.k}/{player.d}/{player.a}</td>
                        <td className="p-3 text-center text-white">{player.dmg}</td>
                        <td className="p-3 text-center text-white">{player.revives}</td>
                        <td className="p-3 text-center text-cyan-400 font-medium">{player.hs || '0%'}</td>
                        <td className="p-3 text-center text-yellow-400 font-bold">{player.rating || '0.0'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="p-12 text-center border border-green-500/30 rounded-2xl bg-green-900/10">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">Sync Complete!</h3>
              <p className="text-gray-400">Standings and Player Stats have been updated automatically.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UploadModal;
