import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "../assets/style/Submit.css";

interface FormData {
  tags: string;
  description: string;
  authorName: string;
  images: File[];
}

const ImageUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    tags: "",
    description: "",
    authorName: "",
    images: [],
  });

  const [errors, setErrors] = useState({
    tags: "",
    description: "",
    authorName: "",
    images: "",
  });

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, tags: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleAuthorNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, authorName: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    let formValid = true;
    const newErrors = {
      tags: "",
      description: "",
      authorName: "",
      images: "",
    };

    if (!formData.tags) {
      newErrors.tags = "Tags field is required";
      formValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description field is required";
      formValid = false;
    }

    if (!formData.authorName) {
      newErrors.authorName = "Author Name field is required";
      formValid = false;
    }

    if (formData.images.length === 0) {
      newErrors.images = "Please select an image";
      formValid = false;
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("author", formData.authorName);
      formDataToSend.append("file", formData.images[0]); // Assuming only one image is selected
      const response = await axios.post(
        "http://127.0.0.1:5000/submit",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      setFormData({
        tags: "",
        description: "",
        authorName: "",
        images: [],
      });
      setErrors({
        tags: "",
        description: "",
        authorName: "",
        images: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Submit your astro art!</h2>{" "}
      {/* Added title with styling */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pb-8 pt-8"
      >
        <div className="flex items-center mb-2">
          <label htmlFor="tags" className="text-gray-700 mr-4 font-bold">
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={handleTagsChange}
            className="block w-full px-3 pt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
          />
        </div>
        {errors.tags && (
          <p className="text-red-500 text-xs  mb-5">{errors.tags}</p>
        )}

        <div className="flex items-center mb-2">
          <label htmlFor="description" className="text-gray-700 mr-4 font-bold">
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={handleDescriptionChange}
            className="block w-full px-3 pt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
          />
        </div>
        {errors.description && (
          <p className="text-red-500 text-xs  mb-5">{errors.description}</p>
        )}
        <div className="flex items-center mb-2">
          <label htmlFor="author" className="text-gray-700 mr-4 font-bold">
            Author:
          </label>
          <input
            type="text"
            id="author"
            value={formData.authorName}
            onChange={handleAuthorNameChange}
            className="block w-full px-3 pt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
          />
        </div>
        {errors.authorName && (
          <p className="text-red-500 text-xs mb-5">{errors.authorName}</p>
        )}
        <div className="flex items-center mb-2">
          <label htmlFor="images" className="text-gray-700 mr-4 font-bold">
            Images:
          </label>
          <input
            type="file"
            id="images"
            onChange={handleImageChange}
            className="block w-full px-3 pt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
          />
        </div>
        {errors.images && (
          <p className="text-red-500 text-xs  mb-5 ">{errors.images}</p>
        )}
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold pt-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImageUploadForm;
