const EventMoment = ({ multimedia = [] }) => {
  if (!multimedia.length) {
    return (
      <section>
        <div className="container">
          <h1 className="font-Parkinsans text-[56px] font-[400] text-black leading-[150%] mb-8">
            Dokumentasi Kita
          </h1>
          <p className="text-center text-gray-500">Tidak ada dokumentasi tersedia.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <h1 className="font-Parkinsans text-[56px] font-[400] text-black leading-[150%] mb-8 max-md:text-[32px] max-md:mb-6">
          Dokumentasi Kita
        </h1>
        <div className="flex justify-between gap-5 max-md:flex-col max-md:gap-4">
          {multimedia.map((mediaUrl, idx) => {
            const isVideo = /\.(mp4|mov|avi|mkv)$/i.test(mediaUrl);
            const src = mediaUrl.startsWith('http') ? mediaUrl : mediaUrl;

            return (
              <div key={idx} className="flex-1 max-w-[32%] max-md:max-w-full">
                {isVideo ? (
                  <video controls className="w-full h-full rounded-md bg-gray-200 object-cover">
                    <source src={src} type={`video/${src.split('.').pop()}`} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={src}
                    alt={`Dokumentasi ${idx + 1}`}
                    className="w-full h-full rounded-md object-cover bg-gray-200"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventMoment;
