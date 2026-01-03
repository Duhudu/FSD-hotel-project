import React, { useState, useEffect, useRef } from 'react';

function GuestDropdown({ onTotalChange }) {
    // variables for Guest Dropdown
    const [isOpen, setIsOpen] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

    //variable to see if user clicked somewhere else
    const dropdownRef = useRef(null);
    //Cal the adult and children total
    const totalGuests = adults + children;

    //whenever the count changes, update the parent component 
    useEffect(() => {
        onTotalChange(totalGuests);
    }, [adults, children, onTotalChange, totalGuests]);

    //Handle the clicking outside funtion 
    useEffect(() => {
        const handleClickOutside = (click) => {
            if (dropdownRef.current && !dropdownRef.current.contains(click.target)) {
                setIsOpen(false);
            }
        };
        //call fun
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);
    // change the isOpen vlaue from f<->t
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    //Handle Increment and Decrement of customers 
    const handleCounter = (type, operation) => {
        if (type === "adults") {
            if (operation === "increment") {
                setAdults(prev  => prev + 1);
            } else {
                //stop the value going below zero
                setAdults(prev => (prev > 2 ? prev - 1 : 2));
            }
        } else if (type === "children") {
            if (operation === "increment") {
                setChildren(prev => prev + 1);
            } else {
                setChildren(prev => (prev > 0 ? prev - 1 : 0));
            }
        }
    }


    return (
        <div className="dropdownGuests" ref={dropdownRef} style={{ position: 'relative' }}>
            
            <div onClick={toggleDropdown} style={{
                border: '1px solid #ccc', padding: '5px', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: '150px'
            }}>
                <span>Guests {totalGuests}</span>
                <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </div>
            {isOpen && (
                <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0,
                    background: 'white', border: '1px solid #ccc', zIndex: 10, padding: '10px'
                }}>
                    {/* Adults Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div><strong>Adults</strong><br /><small>(Ages 13+)</small></div>
                        <div>
                            <button type="button" onClick={() => handleCounter('adults', 'decrement')}>-</button>
                            <span style={{ margin: '0 10px' }}>{adults}</span>
                            <button type="button" onClick={() => handleCounter('adults', 'increment')}>+</button>
                        </div>
                    </div>

                    {/* Children Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div><strong>Children</strong><br /><small>(Ages 0-12)</small></div>
                        <div>
                            <button type="button" onClick={() => handleCounter('children', 'decrement')}>-</button>
                            <span style={{ margin: '0 10px' }}>{children}</span>
                            <button type="button" onClick={() => handleCounter('children', 'increment')}>+</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GuestDropdown
