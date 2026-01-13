import React, { useState, useRef } from 'react';
import { DownloadIcon, PlayIcon, AlertCircle, ExternalLink } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface VideoLandingProps {
  videoUrl: string;
}

export const VideoLanding: React.FC<VideoLandingProps> = ({ videoUrl }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setError(null);

    try {
      // Attempt to fetch the blob first to bypass cross-origin "download" attribute restrictions if CORS allows
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // Extract filename from URL or default
      const fileName = videoUrl.split('/').pop() || 'video-download.mp4';
      a.download = fileName;
      
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Direct download failed, trying fallback:", err);
      // Fallback: Open in new tab if CORS blocks the fetch
      // This is a "soft" download approach
      try {
        const a = document.createElement('a');
        a.target = '_blank';
        a.href = videoUrl;
        a.download = videoUrl.split('/').pop() || 'video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (fallbackErr) {
        setError("Impossible de télécharger la vidéo automatiquement. Veuillez faire un clic droit sur la vidéo et choisir 'Enregistrer la vidéo sous...'");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 animate-fade-in-up">
      
      {/* Header Text */}
      <div className="text-center space-y-2 mb-2">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Votre Vidéo
        </h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Regardez la vidéo ci-dessous ou téléchargez-la pour la visionner plus tard.
        </p>
      </div>

      {/* Video Container */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 bg-black border border-slate-800 group">
        <video 
          ref={videoRef}
          className="w-full h-auto max-h-[70vh] object-contain mx-auto"
          controls
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>

      {/* Action Area */}
      <div className="w-full flex flex-col items-center gap-4">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`
            group relative flex items-center justify-center gap-3 
            bg-white text-slate-900 
            hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20
            transition-all duration-300 ease-out
            px-8 py-4 rounded-full text-lg font-bold tracking-wide
            w-full sm:w-auto min-w-[280px]
            disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
          `}
        >
          {isDownloading ? (
            <>
              <LoadingSpinner size="sm" color="text-slate-900" />
              <span>Téléchargement...</span>
            </>
          ) : (
            <>
              <DownloadIcon className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
              <span>Télécharger la Vidéo</span>
            </>
          )}
          
          {/* Subtle glow effect */}
          <span className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-indigo-500/30 transition-all duration-300"></span>
        </button>

        <a
          href="https://paywin.fun"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group relative flex items-center justify-center gap-3 
            bg-indigo-600 text-white 
            hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40
            transition-all duration-300 ease-out
            px-8 py-4 rounded-full text-lg font-bold tracking-wide
            w-full sm:w-auto min-w-[280px]
          `}
        >
          <span>S'INSCRIRE SUR PAYWIN</span>
          <ExternalLink className="w-5 h-5 opacity-75 group-hover:translate-x-1 transition-transform" />
        </a>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-950/30 px-4 py-2 rounded-lg border border-red-900/50">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="text-xs text-slate-500 mt-2">
          Format MP4 • Haute Qualité
        </div>
      </div>
    </div>
  );
};