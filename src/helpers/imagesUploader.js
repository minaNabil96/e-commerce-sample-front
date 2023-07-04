import React from "react";
import axios from "axios";
const url = process.env.REACT_APP_CLOUDURL;
const preset = process.env.REACT_APP_CLOUDUPLOADPRESET;
const cloudName = process.env.REACT_APP_CLOUDNAME;
export const imagesUploader = async (coverImage, uploadPreset) => {
  const image = coverImage;
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", `${uploadPreset ? uploadPreset : preset}`);
  formData.append("cloud_name", `${cloudName}`);
  formData.append("folder", "e-commerce");

  const upload = await axios.post(url, formData);
  const data = await upload.data;

  if (data) {
    const imageUrl = data.secure_url;
    return { imageUrl };
  } else return Error("the image doesn't upload");
};
