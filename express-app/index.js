import express from "express";
import axios from "axios";
import { getAuthenticationHead } from "./utils.js";
import cors from 'cors';

const app = express();
const secretKey = "cfa0babc3f9f3ad73c0e0791f15710ef"; // Replace with your actual secret key
app.use(cors()); 
app.use(express.json()); // Add this line to parse JSON request bodies


const API_BASE_URL = "https://api.revery.ai/console/v2";

app.post("/process_new_garment", async (req, res) => {
  const garmentDetails = req.body;
  console.log(req.body)
  const headers = getAuthenticationHead(secretKey);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/process_new_garment`,
      garmentDetails,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    // console.error("Error uploading garment:", error);
    res.status(500).json({ error: "Failed to upload garment" });
  }
});

app.get("/get_filtered_garments", async (req, res) => {
  const headers = getAuthenticationHead(secretKey);
  try {
    const response = await axios.get(`${API_BASE_URL}/get_filtered_garments`, {
      headers,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching garments:", error);
    res.status(500).json({ error: "Failed to fetch garments" });
  }
});

app.get("/get_selected_models", async (req, res) => {
  const { gender } = req.query;
  console.log(gender)
  const headers = getAuthenticationHead(secretKey);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/get_selected_models?gender=${gender}`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

app.get("/get_garment", async (req, res) => {
  const { garment_id } = req.query;
  const headers = getAuthenticationHead(secretKey);
  try {
    const response = await axios.get(`${API_BASE_URL}/get_garment`, {
      headers,
      params: { garment_id },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching specific garment:", error);
    res.status(500).json({ error: "Failed to fetch specific garment" });
  }
});

app.put("/modify_garment", async (req, res) => {
  const garmentData = req.body;
  const headers = getAuthenticationHead(secretKey);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/modify_garment`,
      garmentData,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error modifying garment:", error);
    res.status(500).json({ error: "Failed to modify garment" });
  }
});

app.put("/delete_garment", async (req, res) => {
  const { garment_id } = req.body;
  const headers = getAuthenticationHead(secretKey);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/delete_garment`,
      { garment_id },
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error deleting garment:", error);
    res.status(500).json({ error: "Failed to delete garment" });
  }
});

app.post("/request_tryon", async (req, res) => {
  const data = req.body
  console.log("data", data)
  const headers = getAuthenticationHead(secretKey);
  console.log("headers", headers)
  try {
    const response = await axios.post(`${API_BASE_URL}/request_tryon`, data, {
      headers,
    });
    res.json(response.data);
  } catch (error) {
    // console.error("Error trying on garments:", error);
    res.status(500).json({ error: "Failed to try on garments" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
