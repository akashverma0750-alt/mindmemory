export function Blobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-blush/60 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-lavender/60 blur-3xl animate-blob [animation-delay:-7s]" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-peach/60 blur-3xl animate-blob [animation-delay:-14s]" />
      <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-mint/40 blur-3xl animate-blob [animation-delay:-3s]" />
    </div>
  );
}
