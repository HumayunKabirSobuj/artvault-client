import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const images = [
    {
        url: 'https://cdn.shopify.com/s/files/1/0070/7032/files/Shopify_ArtWindowsmany_HEADER_3ac56e63-dbb9-45de-bd26-31ef9d233631.jpg?v=1694117497',
        heading: 'Create Your Art Listing',
        description: 'Upload your artwork and choose vendors to sell on.',
    },
    {
        url: 'https://eksotikart.com/wp-content/uploads/2024/08/Eksotikart-Expands-Global-Market-Reach-at-JIFFINA-2024-with-Featured-Products-04-1024x683.jpg',
        heading: 'Reach Global Markets',
        description: 'Get your art seen by millions across different platforms.',
    },
    {
        url: 'https://printify.com/wp-content/uploads/2023/06/Define-the-Target-Audience-Interested-in-Your-Art.jpg',
        heading: 'Sell Your Artwork with Ease',
        description: 'Manage your art listings effortlessly with our portal.',
    },
];

const Banner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {user}= useContext(AuthContext)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    
    return (
        <div className="z-0 ">
            {/* Background Image Carousel */}
            <div
                className="min-h-[calc(100vh-1px)] bg-cover bg-center transition-all duration-700 ease-in-out"
                style={{ backgroundImage: `url(${images[currentImageIndex].url})` }}
            ></div>

            {/* Centered Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center bg-black min-h-[calc(100vh-192px)] bg-opacity-40 z-10">
                <div className="text-center text-white">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                        {images[currentImageIndex].heading}
                    </h1>
                    <p className="mb-6 text-sm lg:text-base">
                        {images[currentImageIndex].description}
                    </p>
                   
                    
                </div>
            </div>
        </div>
    );
};

export default Banner;
