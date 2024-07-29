import UploadImage from "./UploadImage";
import avatarIcon from "../../../../public/avatarIcon.jpg";
import { useEffect, useState } from "react";
import UseProfile from "../UseProfile";
import AddressInputs from "./AddressInputs";

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
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 relative mx-auto rounded-lg max-w-[120px]">
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
        <AddressInputs
          addressProps={{ phoneNumber, streetAddress, postalCode, city }}
          setAddressProp={handleAddressChange}
        />
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
