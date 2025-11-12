"use client";

import React, { useState, useEffect, useMemo } from "react";

export default function ShopFilters({ categories , collections}) {
    const [selectedFilters, setSelectedFilters] = useState({
        brand: [],
        series: [],
        model: [],
        priceRange: [],
        features: []
    });

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const MAX_PRICE = 10000;

    const filterOptions = useMemo(() => {
        const brandOptions = categories?.map(category => ({
            id: category.id,
            name: category.name,
            count: category.products?.length || 0,
            code: category.handle
        })) || [];

        const seriesOptions = collections.collections?.map(collection => ({
            id: collection.id,
            name: collection.title,
            count: collection.products?.length || 0,
            code: collection.handle
        })) || [];

        return {
            brand: brandOptions,
            series: seriesOptions,
            model: [
                { id: "gaming", name: "בִּמלַאִי", count: 1200, code: "VX7D2" },
                { id: "ultrabook", name: "אזל מהמלאי", count: 265, code: "VX7D1D_21K" },
            ],
        };
    }, [categories , collections]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (window.innerWidth < 768 && isFiltersOpen) {
                const filtersElement = document.getElementById('filters-sidebar');
                if (filtersElement && !filtersElement.contains(event.target)) {
                    setIsFiltersOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFiltersOpen]);

    const handleFilterChange = (category, value, checked) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev };
            if (checked) {
                newFilters[category] = [...newFilters[category], value];
            } else {
                newFilters[category] = newFilters[category].filter(item => item !== value);
            }
            return newFilters;
        });
    };

    const clearAllFilters = () => {
        setSelectedFilters({
            brand: [],
            series: [],
            model: [],
            priceRange: [],
            features: []
        });
        setMinPrice(0);
        setMaxPrice(MAX_PRICE);
    };

    const handleMinPriceChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 100);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 100);
        setMaxPrice(value);
    };

    const getProgressStyles = () => {
        const minPercent = (minPrice / MAX_PRICE) * 100;
        const maxPercent = (maxPrice / MAX_PRICE) * 100;
        return {
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`
        };
    };

    const hasActiveFilters = Object.values(selectedFilters).flat().length > 0 || minPrice > 0 || maxPrice < MAX_PRICE;

    const FilterSection = ({ title, options, category }) => (
        <div className="border-b border-[#1921610D] pb-4 mb-4">
            <h3 className="font-semibold text-lg mb-3 ">{title}</h3>
            <div className="space-y-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#19216133] [&::-webkit-scrollbar-thumb]:rounded-full">
                {options.map(option => (
                    <label key={option.id} className="flex items-center justify-between group cursor-pointer p-1 rounded-lg transition-colors">

                        <input
                            type="checkbox"
                            checked={selectedFilters[category].includes(option.id)}
                            onChange={(e) => handleFilterChange(category, option.id, e.target.checked)}
                            className="hidden peer"
                        />
                        <div className="flex flex-col text-[#919191] peer-checked:text-[#0A90C8] peer-checked:font-bold">
                            <span className="text-sm font-medium ">{option.name}</span>
                        </div>

                        <span className="text-xs text-[#919191] text-center peer-checked:text-[#0A90C8] peer-checked:font-bold flex flex-row-reverse">
                            ({option.count})
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );

    const PriceSliderSection = () => (
        <div className="border-b border-[#1921610D] pb-4 mb-4">
            <h3 className="font-semibold text-lg mb-3">טווח מחירים</h3>

            <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium text-[#0A90C8]">
                    {minPrice.toLocaleString()} ₪ - {maxPrice.toLocaleString()} ₪
                </div>
            </div>

            <div className="relative mb-6 h-6" dir="ltr">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2"></div>

                <div
                    className="absolute top-1/2 h-1 bg-[#0A90C8] rounded-full transform -translate-y-1/2"
                    style={getProgressStyles()}
                ></div>

                <input
                    type="range"
                    min="0"
                    max={MAX_PRICE}
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="absolute top-1/2 left-0 right-0 w-full h-1 opacity-0 cursor-pointer transform -translate-y-1/2 z-10"
                />
                <div
                    className="absolute top-1/2 w-4 h-4 bg-[#192161] rounded-full shadow-md transform -translate-y-1/2 cursor-pointer z-20"
                    style={{ left: `calc(${(minPrice / MAX_PRICE) * 100}% - 8px)` }}
                ></div>

                <input
                    type="range"
                    min="0"
                    max={MAX_PRICE}
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="absolute top-1/2 left-0 right-0 w-full h-1 opacity-0 cursor-pointer transform -translate-y-1/2 z-10"
                />
                <div
                    className="absolute top-1/2 w-4 h-4 bg-[#192161] rounded-full shadow-md transform -translate-y-1/2 cursor-pointer z-20"
                    style={{ left: `calc(${(maxPrice / MAX_PRICE) * 100}% - 8px)` }}
                ></div>
            </div>
        </div>
    );

    const toggleFilters = () => {
        setIsFiltersOpen(!isFiltersOpen);
    };

    return (
        <>
            <div className="md:hidden fixed bottom-6 left-6 z-40">
                <button
                    onClick={toggleFilters}
                    className="bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] text-white font-semibold py-3 px-6 rounded-full shadow-lg flex items-center gap-2"
                >
                    <svg width="20" height="20" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.4363 2.45601C30.9197 1.42658 29.8632 0.76842 28.6977 0.75H3.86268C2.68319 0.75 1.60636 1.40663 1.07886 2.44678C0.551358 3.48539 0.664929 4.72961 1.37296 5.65931L10.9956 17.9939C11.1637 18.2087 11.2555 18.471 11.257 18.7425V31.6788C11.2555 32.811 11.8888 33.8527 12.9018 34.3865C13.9148 34.922 15.1441 34.8621 16.0995 34.2316L19.8341 31.7769C20.6977 31.2047 21.2205 30.2504 21.2283 29.2241V18.7673C21.2298 18.4957 21.3217 18.2334 21.4897 18.0186L31.1124 5.6593C31.825 4.73725 31.9514 3.49768 31.4363 2.45601ZM29.1334 4.19881L19.5107 16.4721C18.9988 17.1303 18.7265 17.9388 18.7389 18.7672V29.2241C18.7389 29.4266 18.6362 29.6153 18.4651 29.7272L14.7305 32.1819C14.5313 32.2985 14.2823 32.2985 14.0832 32.1819C13.8902 32.0837 13.7673 31.8919 13.7595 31.6787V18.7672C13.7611 17.9557 13.4887 17.1656 12.9877 16.5212L3.36505 4.24791C3.18143 4.06534 3.1332 3.78765 3.24368 3.55447C3.35571 3.32128 3.60313 3.18167 3.863 3.20469H28.698C28.9376 3.20162 29.1586 3.33356 29.266 3.5468C29.3718 3.75852 29.3453 4.01319 29.1959 4.19884L29.1334 4.19881Z" fill="white" stroke="white" strokeWidth="1.5"/>
                    </svg>
                    סינונים
                </button>
            </div>

            {isFiltersOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-[#00000080] z-30 transition-opacity"
                    onClick={() => setIsFiltersOpen(false)}
                />
            )}

            <div 
                id="filters-sidebar"
                className={`
                    w-80 bg-white md:border-l border-[#1921610D] p-6 h-fit
                    transition-transform duration-300 ease-in-out z-40
                    ${isFiltersOpen ? 'fixed top-0 right-0 h-screen overflow-y-auto' : 'hidden'}
                    md:sticky md:top-4 md:block
                `}
            >
                {isFiltersOpen && (
                    <button
                        onClick={() => setIsFiltersOpen(false)}
                        className="md:hidden absolute top-4 left-4 text-gray-500 hover:text-gray-700"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}

                <div className="flex items-center mb-6 border-b border-[#1921610D] pb-3">
                    <svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[30px] w-[20px]">
                        <path d="M31.4363 2.45601C30.9197 1.42658 29.8632 0.76842 28.6977 0.75H3.86268C2.68319 0.75 1.60636 1.40663 1.07886 2.44678C0.551358 3.48539 0.664929 4.72961 1.37296 5.65931L10.9956 17.9939C11.1637 18.2087 11.2555 18.471 11.257 18.7425V31.6788C11.2555 32.811 11.8888 33.8527 12.9018 34.3865C13.9148 34.922 15.1441 34.8621 16.0995 34.2316L19.8341 31.7769C20.6977 31.2047 21.2205 30.2504 21.2283 29.2241V18.7673C21.2298 18.4957 21.3217 18.2334 21.4897 18.0186L31.1124 5.6593C31.825 4.73725 31.9514 3.49768 31.4363 2.45601ZM29.1334 4.19881L19.5107 16.4721C18.9988 17.1303 18.7265 17.9388 18.7389 18.7672V29.2241C18.7389 29.4266 18.6362 29.6153 18.4651 29.7272L14.7305 32.1819C14.5313 32.2985 14.2823 32.2985 14.0832 32.1819C13.8902 32.0837 13.7673 31.8919 13.7595 31.6787V18.7672C13.7611 17.9557 13.4887 17.1656 12.9877 16.5212L3.36505 4.24791C3.18143 4.06534 3.1332 3.78765 3.24368 3.55447C3.35571 3.32128 3.60313 3.18167 3.863 3.20469H28.698C28.9376 3.20162 29.1586 3.33356 29.266 3.5468C29.3718 3.75852 29.3453 4.01319 29.1959 4.19884L29.1334 4.19881Z" fill="black" stroke="black" strokeWidth="1.5"/>
                    </svg>
                    <h2 className="text-[20px] md:text-[25px] font-bold">הסינונים </h2>
                </div>

                <div className="space-y-1">
                    <FilterSection
                        title="מותג"
                        options={filterOptions.brand}
                        category="brand"
                    />

                    <FilterSection
                        title="סדרה"
                        options={filterOptions.series}
                        category="series"
                    />

                    <FilterSection
                        title="סוג דגם"
                        options={filterOptions.model}
                        category="model"
                    />

                    <PriceSliderSection />
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="mt-[30px] bg-gradient-to-r from-[#3EE8F0] to-[#0A90C8] text-white font-semibold py-4 px-8 rounded-[76px] text-sm transition-colors w-full"
                    >
                        נקה מסננים
                    </button>
                )}
            </div>
        </>
    );
}