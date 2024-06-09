import UploadImage from "./UploadImage";
import avatarIcon from "../../../public/avatarIcon.jpg";

const UserInfoForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.userName || "");
  const [userImage, setUserImage] = useState(user?.userImage || avatarIcon);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");

  return (
    <div className="flex gap-4">
      <div className="p-2 relative max-w-[120px]">
        <UploadImage link={userImage} setLink={setUserImage} />
      </div>
      <form
        action=""
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            userName,
            userImage,
            phoneNumber,
            streetAddress,
            postalCode,
            city,
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
          value={session?.user?.email || ""}
        />
        <label>Phone</label>
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
        <div className="flex gap-2">
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
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserInfoForm;
