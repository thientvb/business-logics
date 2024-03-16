/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './FilterAdvance.css';

export const FilterAdvance = () => {
    return (
        <div>
            <h5>Recently used filters</h5>
            <hr />
            <h5>Customer Reviews</h5>
            <div className="star-rating-filter">
                <a>
                    {Array.from({ length: 5 }, (_, i) => (
                        <span
                            key={i}
                            className={`star ${i <= 4 ? 'filled' : ''}`}
                        >
                            &#9733;
                        </span>
                    ))}
                    & Up
                </a>
                <a>
                    {Array.from({ length: 5 }, (_, i) => (
                        <span
                            key={i}
                            className={`star ${i <= 3 ? 'filled' : ''}`}
                        >
                            &#9733;
                        </span>
                    ))}
                    & Up
                </a>
                <a>
                    {Array.from({ length: 5 }, (_, i) => (
                        <span
                            key={i}
                            className={`star ${i <= 2 ? 'filled' : ''}`}
                        >
                            &#9733;
                        </span>
                    ))}
                    & Up
                </a>
                <a>
                    {Array.from({ length: 5 }, (_, i) => (
                        <span
                            key={i}
                            className={`star ${i <= 1 ? 'filled' : ''}`}
                        >
                            &#9733;
                        </span>
                    ))}
                    & Up
                </a>
            </div>
            <h5>Brands</h5>
            <div>
                <input type="checkbox" value="" /> Our Brands<br />
                <input type="checkbox" value="" /> Premium Brands<br />
                <input type="checkbox" value="" /> Top Brands
            </div>
        </div>
    );
}
