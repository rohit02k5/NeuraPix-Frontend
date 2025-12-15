import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => (
  <div className="rounded-xl group relative shadow-card hover:shadow-neon transition-all duration-300 card hover:scale-[1.02] bg-[#0b0b1e] border border-transparent hover:border-neon-blue/50 overflow-hidden">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={photo}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f]/90 backdrop-blur-sm m-2 p-4 rounded-md border border-gray-700">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full object-cover bg-gradient-to-r from-neon-blue to-neon-purple flex justify-center items-center text-white text-xs font-bold shadow-sm">
            {name[0]}
          </div>
          <p className="text-white text-sm font-medium">{name}</p>
        </div>
        <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none hover:opacity-80 transition-opacity">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>
      </div>
    </div>
  </div>
);

export default Card;