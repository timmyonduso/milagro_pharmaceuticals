// PokemonCard.jsx
import React from "react";

const PokemonCard = ({ number, name, types, image, background }) => {
    return (
        <div className="pokemon-card w-64 h-96 perspective">
            <div
                className="card-inner relative w-full h-full rounded-xl overflow-hidden shadow-xl transition-transform duration-500 [transform-style:preserve-3d] hover:rotate-x-[15deg]"
                style={{ background }}
            >
                <div
                    className="card-background absolute inset-0 opacity-10 bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url('/bg.svg')` }}
                ></div>

                <div className="card-number absolute top-2 left-2 bg-white/20 text-white text-xs px-2 py-1 rounded font-mono z-10">
                    {number}
                </div>

                <div className="pokemon-image flex-1 flex justify-center items-center p-6 transition-transform duration-500 translate-z-[20px] group-hover:translate-z-[40px] group-hover:-translate-y-2">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    />
                </div>

                <div className="pokemon-info p-4 bg-white/10 backdrop-blur-sm transition-transform duration-500 translate-z-[10px] group-hover:translate-z-[30px] group-hover:-translate-y-1">
                    <h2 className="text-xl font-bold text-white text-center mb-2">
                        {name}
                    </h2>
                    <div className="flex justify-center gap-2">
                        {types.map((type, i) => (
                            <span
                                key={i}
                                className={`type-badge text-white text-xs font-semibold px-3 py-1 rounded-full bg-${type.color}`}
                            >
                {type.name}
              </span>
                        ))}
                    </div>
                </div>

                <div className="shiny-effect absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-r from-transparent via-white/60 to-transparent bg-[length:200%_100%] animate-shimmer"></div>
            </div>
        </div>
    );
};

export default PokemonCard;
