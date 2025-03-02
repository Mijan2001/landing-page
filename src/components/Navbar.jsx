import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from '../database/Data';
import { MdClass, MdClose, MdKeyboardArrowDown, MdMenu } from 'react-icons/md';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = menu => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    return (
        <nav className="bg-black text-white fixed top-0 left-0 right-0 w-full border-b border-white/10 z-50">
            <div className="container mx-auto flex justify-between items-center px-4 py-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 w-full">
                    {/* logo=======  */}
                    <div>
                        <Link to="/" className="text-xl font-bold">
                            <span className="text-blue-500">Landing</span> Page
                        </Link>
                    </div>

                    {/* desktop menu =======  */}
                    <div className="hidden md:flex items-center space-x-4">
                        {Object.keys(menuItems)?.map(key => (
                            <div className="relative" key={key}>
                                <button
                                    onClick={() => toggleDropdown(key)}
                                    className="hover:text-gray-300 px-3 py-2 rounded-md text-sm cursor-pointer font-medium flex items-center"
                                >
                                    {menuItems[key]?.title}
                                    <MdKeyboardArrowDown
                                        className={`ml-2 h-5 w-5 transition-transform ${
                                            activeDropdown === key
                                                ? 'transform rotate-180'
                                                : ''
                                        }`}
                                    />
                                </button>

                                {/* dropdown menu =======  */}
                                {activeDropdown === key && (
                                    <div className="absolute top-0 left-0 mt-8 w-screen max-w-md bg-gray-200 rounded-md shadow-lg py-1 text-black">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-4">
                                            {key === 'platform' ? (
                                                menuItems[key]?.sections?.map(
                                                    (section, idx) => (
                                                        <div key={idx}>
                                                            <h3 className="text-sm font-semibold text-gray-500 tracking-wider mb-2">
                                                                {section?.title}
                                                            </h3>
                                                            <div>
                                                                {section?.items?.map(
                                                                    (
                                                                        item,
                                                                        idx
                                                                    ) => (
                                                                        <Link
                                                                            to={`/${key}/${item?.name.toLowerCase()}`}
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="group flex items-start p-2 rounded-lg hover:bg-gray-50"
                                                                        >
                                                                            <div className="px-4">
                                                                                <p className="text-sm font-medium text-gray-900 flex items-center">
                                                                                    {
                                                                                        item?.name
                                                                                    }
                                                                                    {item?.isNew && (
                                                                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                                                            New
                                                                                        </span>
                                                                                    )}
                                                                                </p>
                                                                                <p className="text-sm text-gray-500">
                                                                                    {
                                                                                        item?.desc
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <div className="space-y-2">
                                                    {menuItems[key]?.items?.map(
                                                        (item, idx) => (
                                                            <Link
                                                                to={`/${key}/${item?.name.toLowerCase()}`}
                                                                key={idx}
                                                                className="group flex items-start p-2 rounded-lg hover:bg-gray-50"
                                                            >
                                                                <div className="px-4">
                                                                    <p className="text-sm font-medium text-gray-900">
                                                                        {
                                                                            item?.name
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {
                                                                            item?.desc
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <Link className="hover:text-gray-300" to="/enterprise">
                            Enterprise
                        </Link>
                        <Link className="hover:text-gray-300" to="/pricing">
                            Pricing
                        </Link>
                    </div>

                    {/* auth btn ======  */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="hover:text-gray-300 hidden xl:block"
                        >
                            Login
                        </Link>
                        <Link
                            to="/contact"
                            className="hover:text-gray-300 hidden xl:block"
                        >
                            Contact Sales
                        </Link>
                        <Link
                            to="/get-started"
                            className="hover:text-gray-300 border-l-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Get Started - it's free
                        </Link>
                    </div>

                    {/* mobile menu ======  */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-300 hover:bg-gray-700"
                        >
                            {!isMenuOpen ? (
                                <MdMenu size={30} />
                            ) : (
                                <MdClose size={30} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* mobile responsive menu items ======  */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {Object.keys(menuItems)?.map(key => (
                            <div className="space-y-2 relative" key={key}>
                                <button
                                    onClick={() => toggleDropdown(key)}
                                    className=" px-3 py-2 hover:bg-gray-400 hover:border-b hover:shadow-md rounded-md flex justify-between  w-full items-center"
                                >
                                    {menuItems[key]?.title}
                                    <MdKeyboardArrowDown
                                        className={`ml-2 h-5 w-5 transition-transform ${
                                            activeDropdown === key
                                                ? 'transform rotate-180'
                                                : ''
                                        }`}
                                    />
                                </button>

                                {/* dropdown menu =======  */}
                                {activeDropdown === key && (
                                    <div className="absolute z-20 mx-auto w-full scroll-auto top-0 left-0 mt-8  max-w-md bg-gray-800 text-white rounded-md shadow-lg py-1 ">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-4">
                                            {key === 'platform' ? (
                                                menuItems[key]?.sections?.map(
                                                    (section, idx) => (
                                                        <div key={idx}>
                                                            <h3 className="text-sm font-semibold text-slate-200 tracking-wider mb-2">
                                                                {section?.title}
                                                            </h3>
                                                            <div>
                                                                {section?.items?.map(
                                                                    (
                                                                        item,
                                                                        idx
                                                                    ) => (
                                                                        <Link
                                                                            to={`/${key}/${item?.name.toLowerCase()}`}
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="group flex items-start p-2 rounded-lg hover:bg-gray-50"
                                                                        >
                                                                            <div className="px-4">
                                                                                <p className="text-sm font-medium text-slate-300 flex items-center">
                                                                                    {
                                                                                        item?.name
                                                                                    }
                                                                                    {item?.isNew && (
                                                                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                                                            New
                                                                                        </span>
                                                                                    )}
                                                                                </p>
                                                                                <p className="text-sm text-slate-400">
                                                                                    {
                                                                                        item?.desc
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <div className="space-y-2">
                                                    {menuItems[key]?.items?.map(
                                                        (item, idx) => (
                                                            <Link
                                                                to={`/${key}/${item?.name.toLowerCase()}`}
                                                                key={idx}
                                                                className="group flex items-start p-2 rounded-lg hover:bg-gray-50"
                                                            >
                                                                <div className="px-4">
                                                                    <p className="text-sm font-medium text-slate-300">
                                                                        {
                                                                            item?.name
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-slate-400">
                                                                        {
                                                                            item?.desc
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link
                            to="/enterprise"
                            className="block px-3 py-2 hover:bg-gray-700"
                        >
                            Enterprise
                        </Link>
                        <Link
                            to="/pricing"
                            className="block px-3 py-2 hover:bg-gray-700"
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/login"
                            className="block px-3 py-2 hover:bg-gray-700"
                        >
                            Login
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-3 py-2 hover:bg-gray-700"
                        >
                            Contact Sales
                        </Link>
                        <Link
                            to="/get-started"
                            className="block px-3 py-2 bg-blue-600 hover:bg-blue-700"
                        >
                            Get Started - it's free
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
