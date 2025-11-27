import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Volume2 } from 'lucide-react';

const DJMixAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [mixPoints, setMixPoints] = useState([]);
  const [waveformData, setWaveformData] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const startTimeRef = useRef(0);
  const pauseTimeRef = useRef(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setAnalyzing(true);
    setMixPoints([]);
    
    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      audioBufferRef.current = audioBuffer;
      setDuration(audioBuffer.duration);
      
      analyzeAudio(audioBuffer);
    } catch (error) {
      console.error('Error processing audio:', error);
      setAnalyzing(false);
    }
  };

  const analyzeAudio = (audioBuffer) => {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    
    // Generate waveform for visualization
    const samples = 500;
    const blockSize = Math.floor(channelData.length / samples);
    const waveform = [];
    
    for (let i = 0; i < samples; i++) {
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(channelData[i * blockSize + j]);
      }
      waveform.push(sum / blockSize);
    }
    setWaveformData(waveform);
    
    // Analyze for mix points
    const points = detectMixPoints(channelData, sampleRate, audioBuffer.duration);
    setMixPoints(points);
    setAnalyzing(false);
  };

  const detectMixPoints = (channelData, sampleRate, duration) => {
    const points = [];
    const windowSize = Math.floor(sampleRate * 0.5); // 500ms windows
    const hopSize = Math.floor(sampleRate * 0.1); // 100ms hops
    
    let energyValues = [];
    
    // Calculate energy over time
    for (let i = 0; i < channelData.length - windowSize; i += hopSize) {
      let energy = 0;
      for (let j = 0; j < windowSize; j++) {
        energy += channelData[i + j] * channelData[i + j];
      }
      energyValues.push({
        time: i / sampleRate,
        energy: energy / windowSize
      });
    }
    
    // Find energy peaks and drops (potential mix points)
    const avgEnergy = energyValues.reduce((sum, v) => sum + v.energy, 0) / energyValues.length;
    
    for (let i = 10; i < energyValues.length - 10; i++) {
      const current = energyValues[i].energy;
      const before = energyValues.slice(i-10, i).reduce((sum, v) => sum + v.energy, 0) / 10;
      const after = energyValues.slice(i+1, i+11).reduce((sum, v) => sum + v.energy, 0) / 10;
      
      // Mix-in point: energy increases significantly
      if (current > avgEnergy * 1.3 && before < avgEnergy * 0.8 && current > before * 1.5) {
        points.push({
          time: energyValues[i].time,
          type: 'mix-in',
          confidence: Math.min(((current - before) / avgEnergy) * 100, 100)
        });
      }
      
      // Mix-out point: energy decreases significantly
      if (current < avgEnergy * 0.7 && after < current * 0.7 && before > avgEnergy) {
        points.push({
          time: energyValues[i].time,
          type: 'mix-out',
          confidence: Math.min(((before - current) / avgEnergy) * 100, 100)
        });
      }
      
      // Breakdown/drop point: sudden energy change
      if (Math.abs(current - before) > avgEnergy * 0.8 && i > 20) {
        const prevPoint = points[points.length - 1];
        if (!prevPoint || Math.abs(prevPoint.time - energyValues[i].time) > 2) {
          points.push({
            time: energyValues[i].time,
            type: 'breakdown',
            confidence: Math.min((Math.abs(current - before) / avgEnergy) * 80, 100)
          });
        }
      }
    }
    
    // Filter out points too close together
    const filtered = [];
    for (let i = 0; i < points.length; i++) {
      if (i === 0 || points[i].time - filtered[filtered.length - 1].time > 3) {
        filtered.push(points[i]);
      }
    }
    
    return filtered.sort((a, b) => a.time - b.time);
  };

  const togglePlayPause = () => {
    if (!audioBufferRef.current) return;
    
    if (playing) {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current = null;
      }
      pauseTimeRef.current = currentTime;
      setPlaying(false);
    } else {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      
      startTimeRef.current = audioContextRef.current.currentTime - pauseTimeRef.current;
      source.start(0, pauseTimeRef.current);
      sourceNodeRef.current = source;
      setPlaying(true);
      
      source.onended = () => {
        setPlaying(false);
        pauseTimeRef.current = 0;
        setCurrentTime(0);
      };
      
      updateTime();
    }
  };

  const updateTime = () => {
    if (playing && audioContextRef.current) {
      const time = audioContextRef.current.currentTime - startTimeRef.current;
      setCurrentTime(Math.min(time, duration));
      requestAnimationFrame(updateTime);
    }
  };

  const seekTo = (time) => {
    if (playing) {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      
      startTimeRef.current = audioContextRef.current.currentTime - time;
      source.start(0, time);
      sourceNodeRef.current = source;
      pauseTimeRef.current = time;
      
      source.onended = () => {
        setPlaying(false);
        pauseTimeRef.current = 0;
        setCurrentTime(0);
      };
    } else {
      pauseTimeRef.current = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'mix-in': return 'bg-green-500';
      case 'mix-out': return 'bg-red-500';
      case 'breakdown': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'mix-in': return 'Mix In';
      case 'mix-out': return 'Mix Out';
      case 'breakdown': return 'Breakdown/Drop';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">DJ Mix Point Analyzer</h1>
          <p className="text-purple-300">Upload a track to find optimal mix points</p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 mb-6">
          <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-purple-500/50 rounded-lg cursor-pointer hover:border-purple-400 transition-colors">
            <Upload className="w-12 h-12 text-purple-400 mb-2" />
            <span className="text-purple-300">
              {file ? file.name : 'Upload audio file (MP3, WAV)'}
            </span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {analyzing && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-purple-300 mt-4">Analyzing audio...</p>
          </div>
        )}

        {!analyzing && waveformData.length > 0 && (
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 mb-6">
            <div className="relative h-48 bg-black/50 rounded-lg mb-4 overflow-hidden">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <path
                  d={`M 0 ${96} ${waveformData.map((val, i) => {
                    const x = (i / waveformData.length) * 100;
                    const y = 96 - (val * 90);
                    return `L ${x}% ${y}`;
                  }).join(' ')}`}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Mix points markers */}
              {mixPoints.map((point, i) => (
                <div
                  key={i}
                  className={`absolute top-0 bottom-0 w-0.5 ${getTypeColor(point.type)} opacity-70 cursor-pointer hover:opacity-100`}
                  style={{ left: `${(point.time / duration) * 100}%` }}
                  onClick={() => seekTo(point.time)}
                  title={`${getTypeLabel(point.type)} at ${formatTime(point.time)}`}
                />
              ))}
              
              {/* Current time indicator */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={togglePlayPause}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-colors"
              >
                {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <div className="flex-1">
                <div className="text-purple-300 text-sm mb-1">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => seekTo(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {mixPoints.map((point, i) => (
                <div
                  key={i}
                  onClick={() => seekTo(point.time)}
                  className="bg-black/50 rounded-lg p-4 border border-purple-500/30 cursor-pointer hover:border-purple-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getTypeColor(point.type)}`}>
                      {getTypeLabel(point.type)}
                    </span>
                    <span className="text-purple-400 text-sm">
                      {Math.round(point.confidence)}%
                    </span>
                  </div>
                  <div className="text-white font-mono text-lg">
                    {formatTime(point.time)}
                  </div>
                </div>
              ))}
            </div>

            {mixPoints.length === 0 && (
              <div className="text-center py-8 text-purple-300">
                No significant mix points detected. Try a track with more dynamic changes.
              </div>
            )}
          </div>
        )}

        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
          <h2 className="text-xl font-bold text-white mb-3">Mix Point Types</h2>
          <div className="space-y-2 text-purple-200 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span><strong>Mix In:</strong> Energy builds up - good entry point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span><strong>Mix Out:</strong> Energy drops - good exit point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span><strong>Breakdown/Drop:</strong> Sudden change - dramatic transition point</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DJMixAnalyzer;
