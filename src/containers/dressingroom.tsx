import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTshirt,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import {
  TryOnResponse,
  deleteGarment,
  fetchModels,
  fetchProcessedGarments,
  tryOnGarments,
} from "../api";
import { Tab, Tabs } from "@material-ui/core";

import { PiPantsThin } from "react-icons/pi";
import { PiDressLight } from "react-icons/pi";
import { CgBoy } from "react-icons/cg";
import { GiShirt } from "react-icons/gi";

type Icons = {
  [key: string]: JSX.Element;
};

interface Garment {
  id: string;
  gender: "male" | "female";
  image_urls: {
    product_image: string;
  };
  tryon: {
    category: "tops" | "bottoms" | "outerwear" | "allbody";
    enabled: boolean;
    open_outerwear?: boolean;
    bottoms_sub_category?: "pants" | "shorts";
  };
}
const icons: Icons = {
  tops: (
    <FontAwesomeIcon className="h-[30px] w-[30px] text-white" icon={faTshirt} />
  ),
  bottoms: <PiPantsThin className="h-[30px] w-[30px] text-white" />,
  // shirt: <GiShirt className="h-[30px] w-[30px] text-white" />,
  // dress: <PiDressLight className="h-[30px] w-[30px] text-white" />,
  // shoes: (
  //   <FontAwesomeIcon
  //     className="h-[30px] w-[30px] text-white"
  //     icon={faShoePrints}
  //   />
  // ),
  model: <CgBoy className="h-[30px] w-[30px] text-white" />,
};

export const VirtualDressingRoom: React.FC = () => {
  const [garmentsData, setGarmentsData] = useState<Garment[]>([]);
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [gender, setGender] = useState("female"); // Default gender
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState<string>("");

  const [selectedGarmentTop, setSelectedGarmentTop] = useState<Garment | null>(
    null
  );
  const [selectedGarmentBottom, setSelectedGarmentBottom] =
    useState<Garment | null>(null);

  useEffect(() => {
    const fetchGarments = async () => {
      try {
        const data = await fetchProcessedGarments();
        setGarmentsData(data.garments);
      } catch (error) {
        console.error("Error fetching garments:", error);
      }
    };
    fetchGarments();
  }, []);

  useEffect(() => {
    const fetchModelsData = async () => {
      try {
        if (selectedCategory === "model") {
          const modelsData = await fetchModels(gender);
          setModels(modelsData.model_ids);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModelsData();
  }, [gender, selectedCategory]);

  const handleGarmentSelect = (garment: Garment) => {
    setSelectedGarment(garment);
    if (garment?.tryon.category === "tops") {
      setSelectedGarmentTop(garment);
    }
    if (garment?.tryon.category === "bottoms") {
      setSelectedGarmentBottom(garment);
    }
  };

  const filteredGarments = garmentsData.filter(
    (garment) =>
      garment.tryon.category === selectedCategory && garment.gender === gender
  );

  const handleChange = (event: any, newValue: string) => {
    setGender(newValue);
  };
  const MODEL_IMAGE_BASE_URL = "https://media.revery.ai/revery_client_models/";
  // console.log(models);

  const handleSelectModel = (model: any) => {
    setSelectedModel(model);
  };
  const [tryOnImageUrl, setTryOnImageUrl] = useState("");
  const handleTryOn = async () => {
    try {
      if (selectedGarmentTop && selectedGarmentTop.id && selectedModel) {
        // You would need to adjust this call based on how tryOnGarments is designed
        // For example, if it expects both tops and bottoms IDs:
        const response = await tryOnGarments(
          selectedModel,
          selectedGarmentTop?.id,
          selectedGarmentBottom?.id
        );
        //  console.log('tryOn',response)
        const modelFile = response?.model_metadata.model_file;

        setTryOnImageUrl(
          `https://media.revery.ai/generated_model_image/${modelFile}.png`
        );
      }
    } catch (error) {
      console.error("Error trying on garments:", error);
    }
  };
  const handleDelete = async () => {
    if (selectedGarment && selectedGarment.id) {
      const response = await deleteGarment(selectedGarment?.id);
    }
  };

  console.log("top", selectedGarmentTop, "bottom", selectedGarmentBottom);
  return (
    <div className="container  mt-10 mx-auto ml-[40px] mr-[40px] mb-[40px] p-6  rounded-md h-screen  overflow-hidden">
      <div className="flex justify-end w-full h-full">
        <div className="flex justify-center items-center">
          <div className="w-1/2 pr-2 ">
            {selectedModel ? (
              <>
                <img
                  src={
                    tryOnImageUrl ||
                    `${MODEL_IMAGE_BASE_URL}${selectedModel}/ou_aligned_transparent.png`
                  }
                  alt="Model"
                  className="w-full h-full object-contain"
                />
                <p className="text-center">{selectedModel}</p>
              </>
            ) : (
              <p>Select a model..</p>
            )}
          </div>
          {selectedModel && (selectedGarmentTop || selectedGarmentBottom) ? (
          <>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <img
                src={selectedGarmentTop?.image_urls.product_image}
                alt={selectedGarmentTop?.tryon.category}
                className="w-20 h-15 cursor-pointer object-cover"
              />
              <img
                src={selectedGarmentBottom?.image_urls.product_image}
                alt={selectedGarmentBottom?.tryon.category}
                className="w-20 h-15 cursor-pointer object-cover"
              />
              <button
                onClick={handleTryOn}
                style={{
                  border: "1px solid #007AD2",
                }}
                type="submit"
                className="hover:bg-white hover:text-[#007AD2] hover:font-semibold text-xl font-semibold py-2 px-5 w-full rounded-lg border bg-sky-600 text-white"
              >
                Try On
              </button>
              
            </div>
            {/* <div className="mt-5">
              <button
                onClick={handleTryOn}
                style={{
                  border: "1px solid #007AD2",
                }}
                type="submit"
                className="hover:bg-white hover:text-[#007AD2] hover:font-semibold text-xl font-semibold py-2 px-5 w-full rounded-lg border bg-sky-600 text-white"
              >
                Try On
              </button>
            </div> */}
          </>
        ) : (
          " "
        )}
          
        </div>

        <div className="w-[110px]   h-full rounded-s-[16px] border  border-gray-300">
          <div className="flex-1  justify-between h-full">
            {Object.keys(icons).map((category, keys) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`mt-5 flex justify-center  w-full ${
                  selectedCategory === category ? "" : ""
                }`}
              >
                <div className="border bg-gray-400 hover:text-white hover:bg-black rounded-full w-16 h-16 flex justify-center items-center">
                  {icons[category]}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="w-1/3 h-full border overflow-auto p-4 ">
          {/* Dresses */}

          <div className="xl:flex-col  box-border">
            <Tabs
              value={gender}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                style={{
                  fontWeight: "600",
                }}
                label="Female"
                value="female"
              />
              <Tab
                style={{
                  fontWeight: "600",
                }}
                label="Male"
                value="male"
              />
            </Tabs>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            {selectedCategory ? (
              filteredGarments.map((garment) => (
                <div key={garment.id} className="flex flex-col items-center">
                  <img
                    src={garment.image_urls.product_image}
                    alt={garment.tryon.category}
                    className="w-50 h-50 cursor-pointer object-cover"
                    onClick={() => handleGarmentSelect(garment)}
                  />
                  <p>
                    {garment.gender} {garment.tryon.category}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center">No category selected</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3 overflow-y-auto">
            {selectedCategory === "model" &&
              models.map((modelId) => (
                <img
                  key={modelId}
                  src={`${MODEL_IMAGE_BASE_URL}${modelId}/ou_aligned_transparent.png`}
                  alt="Model"
                  className="w-full h-full cursor-pointer object-contain"
                  onClick={() => handleSelectModel(modelId)}
                />
              ))}
          </div>
          {/* <button onClick={handleTryOn}>Try On</button> */}
          <br />
          {/* <button onClick={handleDelete}>Delete</button> */}
        </div>
      </div>
    </div>
  );
};
