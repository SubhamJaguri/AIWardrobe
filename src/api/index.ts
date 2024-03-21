import axios from "axios";
import { getAuthenticationHead } from "./auth";
import { secretKey } from "./constant";

const API_BASE_URL = "https://api.revery.ai/console/v2";
// const API_BASE_URL = "http://localhost:3000";
export interface TryOnResponse {
  model_metadata: {
    gender: string;
    model_file: string;
    model_id: string;
    shoes_id: string | null;
    version: string;
  };
  success: boolean;
}

export const uploadGarment = async (garmentDetails: {
  category: string;
  bottoms_sub_category: string;
  gender: string;
  garment_img_url: string;
}) => {
  const headers = getAuthenticationHead(secretKey);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/process_new_garment`,
      garmentDetails,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error uploading garment: ${error.message}`);
  }
};

export async function fetchProcessedGarments() {
  const headers = getAuthenticationHead("cfa0babc3f9f3ad73c0e0791f15710ef");
  const response = await axios.get(`${API_BASE_URL}/get_filtered_garments`, {
    headers,
  });
  return response.data;
}
export async function fetchModels(gender: string) {
  const headers = getAuthenticationHead("cfa0babc3f9f3ad73c0e0791f15710ef"); // Ensure this function is defined and returns the correct headers
  const response = await axios.get(
    `${API_BASE_URL}/get_selected_models?gender=${gender}`,
    {
      headers,
    }
  );
  return response.data;
}

export async function fetchSpecificGarment(garmentId: string) {
  const headers = getAuthenticationHead(secretKey);
  const response = await axios.get(`${API_BASE_URL}/get_garment`, {
    headers,
    params: { garment_id: garmentId },
  });
  return response.data;
}

export const modifyGarment = async (garmentData: {
  garment_id: string;
  category?: string;
  sub_category?: string;
  gender?: string;
  brand?: string;
  url?: string;
}) => {
  const headers = getAuthenticationHead(secretKey);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/modify_garment`,
      garmentData,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error modifying garment: ${error.message}`);
  }
};

export const deleteGarment = async (garment_id: string) => {
  const headers = getAuthenticationHead(secretKey);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/delete_garment`,
      { garment_id },
      { headers }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error deleting garment: ${error.message}`);
  }
};

export const tryOnGarments = async (
  modelId: string,
  topsId: string,
  bottomsId?: string
): Promise<TryOnResponse> => {
  const data = {
    garments: {
      tops: topsId,
      bottoms: bottomsId,
    },
    model_id: modelId,
  };

  const headers = getAuthenticationHead(secretKey); // Replace "YOUR_API_KEY" with your actual API key

  try {
    const response = await axios.post<TryOnResponse>(
      `${API_BASE_URL}/request_tryon`,
      data,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error trying garment: ${error.message}`);
    throw new Error(`Error trying garment: ${error.message}`);
  }
};
