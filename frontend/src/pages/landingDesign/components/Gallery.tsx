import { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1766297248027-864589dbd336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3R1ZGVudHMlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc3MTA5MjkwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Medical students in laboratory',
    },
    {
      url: 'https://images.unsplash.com/photo-1766297247924-6638d54e7c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNvbXB1dGVyJTIwbGFifGVufDF8fHx8MTc3MTA5MjkwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Computer lab',
    },
    {
      url: 'https://images.unsplash.com/photo-1632217142144-f96b15d867a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBsaWJyYXJ5JTIwYm9va3N8ZW58MXx8fHwxNzcwOTgyODU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Library',
    },
    {
      url: 'https://images.unsplash.com/photo-1770208524687-9ed3dfa80c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGF3YXJkJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzcxMDkyOTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Award ceremony',
    },
    {
      url: 'https://images.unsplash.com/photo-1646956141733-2d456a4d337a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFiJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MTA5MjkwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Science lab equipment',
    },
    {
      url: 'https://images.unsplash.com/photo-1686213011371-2aff28a08f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBzdHVkZW50c3xlbnwxfHx8fDE3NzA5ODEyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Graduation ceremony',
    },
  ];

  return (
    <>
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-sm">
              Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mt-3 mb-4">
              Campus Life at Nova Neeti
            </h2>
            <p className="text-[#64748b] max-w-2xl mx-auto">
              A glimpse into our state-of-the-art facilities and vibrant learning environment
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#0f172a]/0 group-hover:bg-[#0f172a]/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-[#d4af37] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}