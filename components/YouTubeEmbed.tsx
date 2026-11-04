"use client";

import { useEffect, useRef } from "react";

const EMBED_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

/**
 * Autoplaying YouTube iframe that reports its playback position, so the same
 * video can be handed between the inline player and the cinema overlay
 * without restarting. Uses YouTube's postMessage protocol (enablejsapi=1):
 * after a "listening" handshake the player sends "infoDelivery" messages
 * carrying currentTime.
 */
export function YouTubeEmbed({
  youtubeId,
  title,
  start = 0,
  onTime,
  className = "",
}: {
  youtubeId: string;
  title: string;
  /** Second to start playing from. */
  start?: number;
  onTime?: (segundos: number) => void;
  className?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onTimeRef = useRef(onTime);

  useEffect(() => {
    onTimeRef.current = onTime;
  }, [onTime]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow || typeof e.data !== "string") return;
      try {
        const data = JSON.parse(e.data);
        const tempo = data?.info?.currentTime;
        if (typeof tempo === "number") onTimeRef.current?.(tempo);
      } catch {
        // Not a YouTube player message.
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  function onLoad() {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: youtubeId, channel: "widget" }),
      "*",
    );
  }

  const inicio = Math.max(0, Math.floor(start));

  return (
    <iframe
      ref={iframeRef}
      onLoad={onLoad}
      className={className}
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&enablejsapi=1${inicio ? `&start=${inicio}` : ""}`}
      title={title}
      allow={EMBED_ALLOW}
      allowFullScreen
    />
  );
}
