import React, { useState } from 'react';
import { Music, Play, Zap, Sliders, Info } from 'lucide-react';

function DJMixAssistant() {
const [tracks, setTracks] = useState([]);
const [spotifyUrl, setSpotifyUrl] = useState('');
const [analyzing, setAnalyzing] = useState(false);
const [selectedPair, setSelectedPair] = useState(null);

// Simulated track analysis - in production, this would call Spotify API
const analyzeTrack = (url) => {
// Mock data generation based on typical track characteristics
const genres = ['House', 'Techno', 'Tech House', 'Deep House', 'Melodic Techno'];
const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const modes = ['Major', 'Minor'];

return {
  id: Date.now() + Math.random(),
  name: `Track ${tracks.length + 1}`,
  artist: 'Artist Name',
  bpm: Math.floor(Math.random() * 40) + 120, // 120-160 BPM
  key: keys[Math.floor(Math.random() * keys.length)],
  mode: modes[Math.floor(Math.random() * modes.length)],
  energy: (Math.random() * 0.4 + 0.6).toFixed(2), // 0.6-1.0
  danceability: (Math.random() * 0.3 + 0.7).toFixed(2), // 0.7-1.0
  duration: Math.floor(Math.random() * 180) + 180, // 3-6 minutes
  genre: genres[Math.floor(Math.random() * genres.length)]
};

};

const addTrack = () => {
if (!spotifyUrl) return;

setAnalyzing(true);
setTimeout(() => {
  const newTrack = analyzeTrack(spotifyUrl);
  setTracks([...tracks, newTrack]);
  setSpotifyUrl('');
  setAnalyzing(false);
}, 800);

};

const calculateMixCompatibility = (track1, track2) => {
const bpmDiff = Math.abs(track1.bpm - track2.bpm);
const bpmScore = Math.max(0, 100 - (bpmDiff * 5));

const keyCompatibility = checkKeyCompatibility(track1.key, track1.mode, track2.key, track2.mode);

const energyDiff = Math.abs(track1.energy - track2.energy);
const energyScore = Math.max(0, 100 - (energyDiff * 100));

return Math.round((bpmScore * 0.4 + keyCompatibility * 0.4 + energyScore * 0.2));

};

const checkKeyCompatibility = (key1, mode1, key2, mode2) => {
const keyMap = { 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11 };
const k1 = keyMap[key1];
const k2 = keyMap[key2];

// Perfect: same key, relative major/minor, +/- 1 semitone
if (k1 === k2 && mode1 === mode2) return 100;
if (Math.abs(k1 - k2) <= 1 || Math.abs(k1 - k2) === 11) return 85;
if (Math.abs(k1 - k2) === 7) return 70; // Perfect fifth
return 50;

};

const generateMixRecommendation = (track1, track2) => {
const compatibility = calculateMixCompatibility(track1, track2);
const bpmDiff = track2.bpm - track1.bpm;

// Calculate ideal mix point based on track duration and energy
const track1MixPoint = Math.round(track1.duration * 0.75); // Last 25%
const track2MixPoint = Math.round(track2.duration * 0.15); // First 15%

const mixDuration = Math.round(30 + (compatibility / 10)); // 30-40 seconds

return {
  compatibility,
  track1MixPoint,
  track2MixPoint,
  mixDuration,
  bpmAdjustment: bpmDiff !== 0 ? '${bpmDiff > 0 ? \'+\' : \'\'}${bpmDiff.toFixed(1)}%' : 'None',
  techniques: generateTechniques(track1, track2, compatibility),
  effects: generateEffects(track1, track2),
  notes: generateNotes(track1, track2, compatibility)
};

};

const generateTechniques = (track1, track2, compatibility) => {
const techniques = [];

if (compatibility > 80) {
  techniques.push('Simple EQ blend - cut lows on incoming track');
} else if (compatibility > 60) {
  techniques.push('Gradual transition with filter sweeps');
} else {
  techniques.push('Use breakdown sections for transition');
}

const energyDiff = track2.energy - track1.energy;
if (energyDiff > 0.15) {
  techniques.push('Energy riser - build tension before drop');
} else if (energyDiff < -0.15) {
  techniques.push('Smooth energy reduction - use ambient section');
}

return techniques;

};

const generateEffects = (track1, track2) => {
const effects = {
pad: [],
filter: []
};

// Pad FX recommendations
effects.pad.push({
  name: 'Reverb Wash',
  timing: 'Last 8 bars of outgoing track',
  params: 'Wet: 40%, Decay: 3-4s',
  purpose: 'Create space for incoming track'
});

if (parseFloat(track2.energy) > parseFloat(track1.energy)) {
  effects.pad.push({
    name: 'Echo Build',
    timing: '16 bars before mix point',
    params: 'Feedback: 60%, 1/4 note',
    purpose: 'Build energy and anticipation'
  });
}

// Filter FX recommendations
effects.filter.push({
  name: 'High-Pass Filter',
  timing: 'Incoming track introduction',
  params: 'Start at 500Hz, sweep to 20Hz over 32 bars',
  purpose: 'Prevent low-end clash'
});

effects.filter.push({
  name: 'Low-Pass Filter',
  timing: 'Outgoing track finale',
  params: 'Sweep from 20kHz to 1kHz in last 16 bars',
  purpose: 'Smooth energy reduction'
});

return effects;

};

const generateNotes = (track1, track2, compatibility) => {
const notes = [];

if (compatibility > 80) {
  notes.push('✓ Excellent compatibility - straightforward mix');
} else if (compatibility > 60) {
  notes.push('Moderate compatibility - use creative transitions');
} else {
  notes.push('Challenging mix - find breakdown/intro sections');
}

const bpmDiff = Math.abs(track1.bpm - track2.bpm);
if (bpmDiff > 5) {
  notes.push('Consider tempo sync or quick cut transition (${bpmDiff} BPM difference)');
}

return notes;

};

const formatTime = (seconds) => {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return `${mins}:${secs.toString().padStart(2, '0')}`;
};

return (
<div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6">
<div className="max-w-6xl mx-auto">
<div className="text-center mb-8">
<h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
<Music className="w-10 h-10" />
DJ Mix Assistant
</h1>
<p className="text-purple-300">Intelligent mix point detection and effects recommendations</p>
</div>

    {/* Add Track Section */}
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6 border border-white/20">
      <h2 className="text-xl font-semibold mb-4">Add Track</h2>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Paste Spotify track URL (simulated for demo)"
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTrack()}
          className="flex-1 px-4 py-2 bg-black/30 border border-white/30 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={addTrack}
          disabled={!spotifyUrl || analyzing}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
        >
          {analyzing ? 'Analyzing...' : 'Add Track'}
        </button>
      </div>
    </div>

    {/* Track List */}
    {tracks.length > 0 && (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6 border border-white/20">
        <h2 className="text-xl font-semibold mb-4">Your Tracks ({tracks.length})</h2>
        <div className="space-y-3">
          {tracks.map((track, idx) => (
            <div key={track.id} className="bg-black/30 p-4 rounded-lg border border-white/20">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{track.name}</h3>
                  <p className="text-purple-300 text-sm">{track.artist}</p>
                </div>
                <div className="text-right text-sm space-y-1">
                  <div className="font-mono bg-purple-600/30 px-2 py-1 rounded">{track.bpm} BPM</div>
                  <div className="font-mono bg-blue-600/30 px-2 py-1 rounded">{track.key} {track.mode}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3 text-sm">
                <div>
                  <span className="text-purple-300">Energy:</span> {track.energy}
                </div>
                <div>
                  <span className="text-purple-300">Dance:</span> {track.danceability}
                </div>
                <div>
                  <span className="text-purple-300">Duration:</span> {formatTime(track.duration)}
                </div>
                <div>
                  <span className="text-purple-300">Genre:</span> {track.genre}
                </div>
              </div>
              {idx < tracks.length - 1 && (
                <button
                  onClick={() => setSelectedPair([track, tracks[idx + 1]])}
                  className="mt-3 w-full py-2 bg-purple-600/50 hover:bg-purple-600 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Generate Mix with Next Track
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Mix Recommendation */}
    {selectedPair && (
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Play className="w-6 h-6" />
            Mix Recommendation
          </h2>
          <button
            onClick={() => setSelectedPair(null)}
            className="text-sm px-3 py-1 bg-white/10 hover:bg-white/20 rounded"
          >
            Close
          </button>
        </div>

        {(() => {
          const rec = generateMixRecommendation(selectedPair[0], selectedPair[1]);
          return (
            <>
              {/* Compatibility Score */}
              <div className="mb-6 text-center">
                <div className="inline-block">
                  <div className="text-5xl font-bold mb-2">{rec.compatibility}%</div>
                  <div className="text-purple-300">Mix Compatibility</div>
                </div>
              </div>

              {/* Mix Points */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/40 p-4 rounded-lg border border-white/20">
                  <h3 className="font-semibold mb-2 text-purple-300">Outgoing Track</h3>
                  <p className="text-lg mb-1">{selectedPair[0].name}</p>
                  <p className="text-sm text-gray-300">Mix Point: {formatTime(rec.track1MixPoint)}</p>
                  <p className="text-xs text-gray-400 mt-2">Start transition at this timestamp</p>
                </div>
                <div className="bg-black/40 p-4 rounded-lg border border-white/20">
                  <h3 className="font-semibold mb-2 text-blue-300">Incoming Track</h3>
                  <p className="text-lg mb-1">{selectedPair[1].name}</p>
                  <p className="text-sm text-gray-300">Start From: {formatTime(rec.track2MixPoint)}</p>
                  <p className="text-xs text-gray-400 mt-2">Begin playback from this point</p>
                </div>
              </div>

              {/* Mix Details */}
              <div className="bg-black/40 p-4 rounded-lg border border-white/20 mb-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{rec.mixDuration}s</div>
                    <div className="text-sm text-gray-300">Mix Duration</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{rec.bpmAdjustment}</div>
                    <div className="text-sm text-gray-300">Tempo Adjustment</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-400">
                      {selectedPair[0].key} → {selectedPair[1].key}
                    </div>
                    <div className="text-sm text-gray-300">Key Change</div>
                  </div>
                </div>
              </div>

              {/* Techniques */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sliders className="w-5 h-5" />
                  Mixing Techniques
                </h3>
                <ul className="space-y-2">
                  {rec.techniques.map((tech, idx) => (
                    <li key={idx} className="bg-black/40 p-3 rounded border border-white/10">
                      • {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Effects */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-3 text-purple-300">Pad Effects</h3>
                  <div className="space-y-3">
                    {rec.effects.pad.map((fx, idx) => (
                      <div key={idx} className="bg-black/40 p-3 rounded border border-purple-500/30">
                        <h4 className="font-semibold text-sm mb-1">{fx.name}</h4>
                        <p className="text-xs text-gray-300 mb-1">Timing: {fx.timing}</p>
                        <p className="text-xs text-gray-400 mb-1">Settings: {fx.params}</p>
                        <p className="text-xs text-purple-300 italic">{fx.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-blue-300">Filter Effects</h3>
                  <div className="space-y-3">
                    {rec.effects.filter.map((fx, idx) => (
                      <div key={idx} className="bg-black/40 p-3 rounded border border-blue-500/30">
                        <h4 className="font-semibold text-sm mb-1">{fx.name}</h4>
                        <p className="text-xs text-gray-300 mb-1">Timing: {fx.timing}</p>
                        <p className="text-xs text-gray-400 mb-1">Settings: {fx.params}</p>
                        <p className="text-xs text-blue-300 italic">{fx.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Pro Tips
                </h3>
                <ul className="space-y-1 text-sm">
                  {rec.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </>
          );
        })()}
      </div>
    )}

    {tracks.length === 0 && (
      <div className="text-center py-12 text-gray-400">
        <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Add tracks to get started with intelligent mix recommendations</p>
      </div>
    )}
  </div>
</div>

);
};

export default DJMixAssistant;
