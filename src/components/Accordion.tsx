import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@components/Icons";

const Accordion = ({ data, faqPage }: any) => {
  const [openDays, setOpenDays] = useState<{ [key: string]: boolean }>({});

  const toggleDay = (title: string) => {
    setOpenDays((prev: any) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleDay(item.title)}
            className={`w-full px-4 py-3 flex items-center justify-between transition-colors duration-200 ${
              openDays[item.title]
                ? "bg-deep-blue text-white"
                : "bg-gray-50 text-black"
            }`}
          >
            <div className="flex items-center">
              <span
                className={`text-lg ${
                  openDays[item.title] ? "text-sandy-beige" : "text-deep-blue"
                } font-semibold ${faqPage || ""}`}
              >
                Hari {index + 1}
              </span>
              <span className="ml-2 font-medium">{item.title}</span>
            </div>
            {openDays[item.title] ? <IconChevronUp /> : <IconChevronDown />}
          </button>
          <div
            className={`
                overflow-hidden transition-all duration-200 bg-white
                ${
                  openDays[item.title]
                    ? "max-h-96 px-2 sm:px-4 py-3"
                    : "max-h-0"
                }
              `}
          >
            {faqPage ? (
              <ul className="space-y-2">
                {item.items.map((item: any, idx: number) => (
                  <li
                    key={idx}
                    className="text-slate-800 sm:text-base text-sm list-disc list-inside"
                  >
                    {item.details}
                  </li>
                ))}
              </ul>
            ) : (
              <table className="w-full ">
                <tbody>
                  {item.items.map((item: any, idx: number) => (
                    <tr
                      key={idx}
                      className="flex text-slate-900 sm:text-base text-sm mb-2 last:mb-0"
                    >
                      <td className="flex mr-1 justify-center min-w-13">
                        {item.time && <b>{item.time}</b>}
                      </td>
                      <td>
                        {item.details
                          .split(/(exclude)/gi)
                          .map((part: string, i: number) =>
                            part.toLowerCase() === "exclude" ? (
                              <b key={i}>{part}</b>
                            ) : (
                              part
                            )
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Accordion;
