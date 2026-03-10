import React, { useState } from "react";
import { realTripGallery } from "../data/trips";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = () => {

const [previewIndex,setPreviewIndex] = useState(null);

const nextImage = () => {
setPreviewIndex((prev) => (prev + 1) % realTripGallery.length);
};

const prevImage = () => {
setPreviewIndex((prev) =>
prev === 0 ? realTripGallery.length - 1 : prev - 1
);
};

return (

<section className="py-20 bg-[#f8fafc]">

<div className="max-w-7xl mx-auto px-4">

{/* TITLE */}

<div className="text-center mb-12">

<h2 className="text-4xl md:text-5xl font-extrabold text-[#1a2b4c]">
Our Community Gallery
</h2>

<p className="text-gray-500 mt-3">
Real moments captured by our travelers
</p>

</div>

{/* SLIDER */}

<div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide">

{realTripGallery.map((img,index)=>(
  
<div
key={index}
onClick={()=>setPreviewIndex(index)}
className="min-w-[260px] md:min-w-[340px] h-[230px] rounded-2xl overflow-hidden shadow-md cursor-pointer group"
>

<img
src={img.src}
alt="trip"
className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
/>

</div>

))}

</div>

{/* VIEW MORE */}

<div className="flex justify-center mt-8">

<button
onClick={()=>setPreviewIndex(0)}
className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow"
>

View More

</button>

</div>

</div>

{/* FULLSCREEN PREVIEW */}

{previewIndex !== null && (

<div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center">

<button
onClick={()=>setPreviewIndex(null)}
className="absolute top-6 right-10 text-white text-4xl"
>
×
</button>

{/* LEFT */}

<button
onClick={prevImage}
className="absolute left-8 text-white"
>
<ChevronLeft size={40}/>
</button>

{/* IMAGE */}

<img
src={realTripGallery[previewIndex].src}
className="max-h-[85vh] max-w-[90vw] rounded-xl"
/>

{/* RIGHT */}

<button
onClick={nextImage}
className="absolute right-8 text-white"
>
<ChevronRight size={40}/>
</button>

</div>

)}

</section>

);

};

export default ImageGallery;