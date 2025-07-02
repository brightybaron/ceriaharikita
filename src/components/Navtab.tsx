// NavTab.tsx
import { useState } from "react";

type Tab = {
  name: string;
};

type NavTabProps = {
  tabs: Tab[];
};

function NavTab({ tabs }: NavTabProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      {tabs.map((tab, index) => (
        <button
          key={index}
          id={`${tab.name}-tab`}
          className={`col-span-1 px-4 py-2 rounded w-full text-center capitalize ring-1 ring-deep-blue/25 hover:cursor-pointer ${
            activeTab === index
              ? "bg-deep-blue text-white font-semibold"
              : "bg-gray-200 text-gray-700 font-medium"
          }`}
          onClick={() => handleClick(index)}
        >
          {tab.name}
        </button>
      ))}
    </>
  );
}

export default NavTab;
