import { useState, useEffect, useRef } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconCross,
  IconHamburger,
} from "@components/Icons";

const Navbar = ({ currentPath }: { currentPath: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Set dropdown open by default if on any paket path
  const [isDropDownOpen, setIsDropDownOpen] = useState(
    currentPath.startsWith("/paket")
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  type MenuItem = {
    page: string;
    path: string;
    hasDropdown?: boolean;
    dropdownItems?: {
      name: string;
      path: string;
    }[];
  };

  const listMenu: MenuItem[] = [
    { page: "Home", path: "/" },
    {
      page: "Paket",
      path: "/paket",
      hasDropdown: true,
      dropdownItems: [
        { name: "Promo", path: "/paket/promo" },
        { name: "Domestik", path: "/paket/domestik" },
        { name: "Internasional", path: "/paket/internasional" },
        { name: "Semua Paket", path: "/paket" },
      ],
    },
    { page: "About", path: "/about" },
    { page: "FAQ", path: "/faq" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) {
      // Special case for "Semua Paket" (/paket)
      if (path === "/paket" && currentPath !== "/paket") {
        const dropdownItem = listMenu
          .find((item) => item.path === "/paket")
          ?.dropdownItems?.find((item) => item.path === currentPath);
        // Only return false if we're on a specific dropdown page
        return !dropdownItem;
      }
      return true;
    }
    return false;
  };

  // Special function to check if a dropdown item is active
  const isDropdownItemActive = (path: string) => {
    // For "Semua Paket", only highlight when exactly on /paket/
    if (path === "/paket") return currentPath === "/paket";
    // For other dropdown items, highlight when the path matches exactly
    return currentPath === path;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-deep-blue shadow-md"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto sm:px-12 px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center gap-x-1">
            <img
              src="/logo.png"
              alt="Logo Ceria Hari Kita - Travel Agency Indonesia"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-white hover:text-soft-turquoise hover:cursor-pointer after:content-[''] after:block after:border-b-2 after:transition-all after:duration-300 after:scale-x-0 after:origin-center hover:after:scale-x-100">
              Ceria Hari Kita
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-auto flex items-center space-x-4">
              {listMenu.map((item, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 font-medium after:content-[''] after:block after:border-b-2 after:transition-all after:duration-300 ${
                    isActive(item.path)
                      ? "text-soft-turquoise after:scale-x-100"
                      : "text-white hover:text-soft-turquoise after:scale-x-0 after:origin-center hover:after:scale-x-100"
                  }`}
                >
                  {item.hasDropdown ? (
                    <div ref={dropdownRef}>
                      <button
                        onClick={toggleDropDown}
                        className="inline-flex items-center gap-x-1 hover:cursor-pointer"
                      >
                        {item.page}
                        {isDropDownOpen ? (
                          <IconChevronUp />
                        ) : (
                          <IconChevronDown />
                        )}
                      </button>
                      {isDropDownOpen && (
                        <div className="absolute mt-2 w-48 shadow-lg rounded-xs bg-white z-30">
                          <div className="p-2">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <a
                                key={idx}
                                href={dropdownItem.path}
                                className={`block px-4 py-2 ${
                                  isDropdownItemActive(dropdownItem.path)
                                    ? "text-black font-bold bg-soft-turquoise"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {dropdownItem.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a href={item.path}>{item.page}</a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? <IconCross /> : <IconHamburger />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-deep-blue pb-3">
            {listMenu.map((item, index) => (
              <div key={index} className="mt-2 font-medium">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={toggleDropDown}
                      className={`px-3 py-2 rounded-sm w-full flex items-center justify-between ${
                        isActive(item.path)
                          ? "text-deep-blue bg-gray-300"
                          : "text-white"
                      }`}
                    >
                      <span>{item.page}</span>
                      {isDropDownOpen ? <IconChevronUp /> : <IconChevronDown />}
                    </button>
                    {/* For paket menu, show dropdown if we're on any paket path OR if dropdown is toggled open */}
                    {item.path === "/paket" &&
                      (isDropDownOpen || currentPath.startsWith("/paket")) && (
                        <ul className="pl-6 py-1 space-y-1 list-disc">
                          {item.dropdownItems?.map((dropdownItem, idx) => (
                            <div key={idx} className="pl-2">
                              <li className="text-white">
                                <a
                                  href={dropdownItem.path}
                                  className={`block px-3 py-2 rounded-sm ${
                                    isDropdownItemActive(dropdownItem.path)
                                      ? "text-deep-blue bg-gray-300"
                                      : "text-white"
                                  }`}
                                >
                                  {dropdownItem.name}
                                </a>
                              </li>
                            </div>
                          ))}
                        </ul>
                      )}
                  </div>
                ) : (
                  <a
                    href={item.path}
                    className={`block w-full rounded-sm px-3 py-2 ${
                      isActive(item.path)
                        ? "text-deep-blue bg-gray-300"
                        : "text-white"
                    }`}
                  >
                    {item.page}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
