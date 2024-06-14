import UploadImage from "./UploadImage";
import avatarIcon from "../../../../public/avatarIcon.jpg";
import { useEffect, useState } from "react";
import UseProfile from "../UseProfile";
import CheckoutForm from "./CheckoutForm";

const UserInfoForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState(avatarIcon);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: loggedInUserData } = UseProfile();

  useEffect(() => {
    if (user) {
      setUserName(user.name || "");
      setUserEmail(user.email || "");
      setUserImage(user.image || avatarIcon);
      setPhoneNumber(user.phoneNumber || "");
      setStreetAddress(user.streetAddress || "");
      setPostalCode(user.postalCode || "");
      setCity(user.city || "");
      setIsAdmin(user.admin || false);
    }
  }, [user]);

  function handleAddressChange(propName, value) {
    if (propName === "city") setCity(value);
    if (propName === "phoneNumber") setPhoneNumber(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
  }

  return (
    <div className="flex gap-4">
      <div>
        <div className="p-2 relative rounded-lg max-w-[120px]">
          <UploadImage link={userImage} setLink={setUserImage} />
        </div>
      </div>

      <form
        action=""
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            _id: user._id,
            name: userName,
            image: userImage,
            phoneNumber,
            streetAddress,
            postalCode,
            city,
            admin: isAdmin,
          })
        }
      >
        <label>Full Name</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="First and Last Name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          id=""
          disabled={true}
          value={userEmail}
        />
        <CheckoutForm
          addressProps={{ phoneNumber, streetAddress, postalCode, city }}
          setAddressProp={handleAddressChange}
        />
        {/* <label>Phone</label>
        <input
          type="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(ev) => setPhoneNumber(ev.target.value)}
        />
        <label>Street Address</label>
        <input
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(ev) => setStreetAddress(ev.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(ev) => setPostalCode(ev.target.value)}
            />
          </div>
        </div> */}
        {loggedInUserData?.admin && (
          <div className="flex gap-2 mb-2 p-2 items-center">
            <input
              className="cursor-pointer"
              id="adminCb"
              type="checkbox"
              checked={isAdmin}
              onChange={(ev) => setIsAdmin(ev.target.checked)}
            />
            <label htmlFor="adminCb">Admin</label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserInfoForm;
