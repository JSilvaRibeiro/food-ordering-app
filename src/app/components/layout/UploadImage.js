import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

const UploadImage = ({ link, setLink }) => {
  //Handles user profile image upload
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = async () => {
        const response = await axios.post("/api/upload", data);
        const link = response.data;
        setLink(link);
      };

      toast.promise(uploadPromise(), {
        loading: "Uploading...",
        success: <b>Image uploaded successfully!</b>,
        error: <b>Could not upload image.</b>,
      });
    }
  }
  return (
    <>
      {link && (
        <Image
          className="rounded-full mb-1"
          src={link}
          width={200}
          height={200}
          alt="avatar"
        />
      )}

      <label className="">
        <input
          type="file"
          name=""
          id=""
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="block border border-gray-300 rounded-lg hover:bg-gray-300 text-center cursor-pointer max-w-16 mx-auto">
          Edit
        </span>
      </label>
    </>
  );
};

export default UploadImage;
