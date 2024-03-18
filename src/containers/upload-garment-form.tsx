import React, { useState } from "react";
import { uploadGarment } from "../api";

const UploadGarmentPage: React.FC = () => {
  const [category, setCategory] = useState("");
  const [bottomsSubCategory, setBottomsSubCategory] = useState("");
  const [gender, setGender] = useState("");
  const [garmentImgUrl, setGarmentImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await uploadGarment({
        category,
        bottoms_sub_category: bottomsSubCategory,
        gender,
        garment_img_url: garmentImgUrl,
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 p-6 space-y-4 md:space-y-6 sm:p-8">
        <h2 className="font-semibold text-2xl">Upload Garment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white border outline-[#007AD2] border-gray-200 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-4 px-6 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="outerwear">Outerwear</option>
              <option value="allbody">Allbody</option>
            </select>
          </div>
          {category === "bottoms" && (
            <div>
              <select
                value={bottomsSubCategory}
                onChange={(e) => setBottomsSubCategory(e.target.value)}
                className="bg-white border outline-[#007AD2] border-gray-200 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-4 px-6 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Bottoms Subcategory</option>
                <option value="pants">Pants</option>
                <option value="trousers">Trousers</option>
              </select>
            </div>
          )}
          <div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="bg-white border outline-[#007AD2] border-gray-200 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-4 px-6 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Garment Image URL"
              value={garmentImgUrl}
              onChange={(e) => setGarmentImgUrl(e.target.value)}
              className="bg-white border outline-[#007AD2] border-gray-200 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-4 px-6 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            style={{
              border: "1px solid #007AD2",
            }}
            type="submit"
            disabled={loading}
            className="hover:bg-white hover:text-[#007AD2] hover:font-semibold text-xl font-semibold  py-4 px-6 mt-5 w-full rounded-lg border text-md bg-sky-600 text-white "
          >
            Upload
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default UploadGarmentPage;