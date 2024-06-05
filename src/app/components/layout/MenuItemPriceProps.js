import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import PlusSign from "../icons/PlusSign";
import DownToggle from "../icons/DownToggle";
import UpToggle from "../icons/UpToggle";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <>
      <div className="bg-gray-200 p-2 rounded-xl mb-2">
        <button
          className="inline-flex p-1 border-0 justify-start"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen && <UpToggle />}
          {!isOpen && <DownToggle />}

          <span>{name}</span>
          <span>({props?.length})</span>
        </button>
        <div className={isOpen ? "block" : "hidden"}>
          {props?.length > 0 &&
            props.map((size, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={size.name}
                    onChange={(ev) => editProp(ev, index, "name")}
                  />
                </div>
                <div>
                  <label>Additional Cost</label>
                  <input
                    type="text"
                    value={size.price}
                    onChange={(ev) => editProp(ev, index, "price")}
                  />
                </div>
                <div className="">
                  <button
                    type="button"
                    onClick={() => removeProp(index)}
                    className="border-hidden px-1 mb-3"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          <button type="button" onClick={addProp} className="bg-white">
            <PlusSign />
            {addLabel}
          </button>
        </div>
      </div>
    </>
  );
}
