import React from 'react';
import { VideoLanding } from './components/VideoLanding';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="w-full max-w-5xl mx-auto mb-8 flex justify-between items-center opacity-80">
        <div className="text-sm font-medium tracking-widest uppercase text-slate-400">
          Media Share
        </div>
      </header>
      
      <main className="w-full flex-grow flex flex-col items-center justify-center">
        <VideoLanding videoUrl="https://celinaroom.com/wp-content/uploads/2026/01/video_2026-01-13_11-19-49.mp4" />
      </main>

      <footer className="w-full mt-12 py-6 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} Tous droits réservés.
      </footer>
    </div>
  );
};

export default App;