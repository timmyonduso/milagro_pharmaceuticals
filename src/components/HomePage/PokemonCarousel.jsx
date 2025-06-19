// PokemonCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PokemonCard from "./PokemonCard";

const pokemonList = [
    {
        number: "#0001",
        name: "Bulbasaur",
        image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png",
        background: "linear-gradient(145deg, #78c850 0%, #5ca935 100%)",
        types: [{ name: "Grass", color: "green-500" }, { name: "Poison", color: "purple-500" }],
    },
    {
        number: "#0004",
        name: "Charmander",
        image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png",
        background: "linear-gradient(145deg, #f08030 0%, #dd6610 100%)",
        types: [{ name: "Fire", color: "orange-500" }],
    },
    {
        number: "#0007",
        name: "Squirtle",
        image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png",
        background: "linear-gradient(145deg, #6890f0 0%, #4c6fcc 100%)",
        types: [{ name: "Water", color: "blue-500" }],
    },
    // Add more Pokémon...
];

const PokemonCarousel = () => {
    return (
        <div className="max-w-6xl mx-auto py-10">
            <Swiper
                spaceBetween={30}
                grabCursor
                slidesPerView={"auto"}
                centeredSlides
                loop
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {pokemonList.map((pokemon) => (
                    <SwiperSlide key={pokemon.number} className="flex justify-center">
                        <PokemonCard {...pokemon} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PokemonCarousel;
