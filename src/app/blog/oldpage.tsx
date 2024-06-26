"use client"
import React, { useState, useEffect, useRef } from 'react';
import NewsCard from '../../components/newsCard';
import { motion } from 'framer-motion';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  shortdesc: string;
}

const BlogPage = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const news: NewsItem[] = [
    {
      id: 1,
      title: "Rumors of Dragon Sightings",
      content: "Reports have surfaced of dragon sightings near the eastern mountains. Adventurers are cautioned to be wary.",
      date: "April 28, 2024",
      shortdesc: "Reports have surfaced of dragon sightings."
    },
    {
      id: 2,
      title: "Mysterious Disappearance of the Royal Artifact",
      content: "The Crown Jewels have vanished from the palace vaults under mysterious circumstances. Authorities are investigating.",
      date: "April 27, 2024",
      shortdesc: "The Crown Jewels have vanished from the palace."
    },
    // Add more news items as needed
  ];

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const handleClosePopup = () => {
    setSelectedNews(null);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setSelectedNews(null);
      }
    };

    if (selectedNews) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedNews]);

  return (
    <div 
    className=" min-h-screen">
      <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-teal-700">Latest News</h1>
        <div className="grid gap-8 md:grid-cols-2 sm:grid-cols-1">
          {news.map(item => (
            <motion.div
              onClick={() => handleNewsClick(item)}
              className='hover:cursor-pointer'
              key={item.id}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.95 }}
            >
              <NewsCard {...item} />
            </motion.div>
          ))}
        </div>
        {selectedNews && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div ref={popupRef}>
              <div
                className="bg-GreenMist bg-opacity-60 p-6 rounded-lg shadow-md relative"
              >
                <h2 className="text-xl text-white font-semibold mb-2 mt-4">{selectedNews.title}</h2>
                <p className="text-white ">{selectedNews.content}</p>
                <p className="text-white text-sm absolute left-2 top-2 ">{selectedNews.date}</p>
                <button className="text-white absolute right-4 top-2 hover:text-gray-900 font-semibold" onClick={handleClosePopup}>Close</button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BlogPage;