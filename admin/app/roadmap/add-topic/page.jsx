'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MultiSelect from '@/components/Common/MultipleSelect';
import { Plus, Trash } from 'lucide-react';

const schema = yup.object().shape({
  name: yup.string().required('Topic name is required'),
  description: yup.string().required('Description is required'),
  displayOrder: yup
    .number()
    .typeError('Display order must be a number')
    .required('Display order is required'),
  resourceIds: yup.array().of(yup.number()).min(1, 'At least one resource is required'),
  newResources: yup.array().of(
    yup.object().shape({
      title: yup.string().required('Title is required'),
      description: yup.string().required('Description is required'),
      link: yup.array().of(yup.string().url('Must be a valid URL')).min(1, 'At least one link is required'),
    })
  ),
});

export default function CreateTopic() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [newResources, setNewResources] = useState([{ title: '', description: '', link: [''] }]);
  const [newResources, setNewResources] = useState([{
        "title": "A Deep Dive into JWT Authentication",
        "description": "Explains how JSON Web Tokens work and how to implement JWT-based authentication in your backend.",
        "link": ["https://auth0.com/learn/json-web-tokens/"]
      },
      {
        "title": "Authentication in Node.js using Passport.js",
        "description": "Guide to setting up user login and registration with Passport.js in a Node.js app.",
        "link": ["https://www.digitalocean.com/community/tutorials/nodejs-user-authentication"]
      },
      {
        "title": "OAuth 2.0 Simplified",
        "description": "A simple and understandable breakdown of the OAuth 2.0 protocol, often used for third-party login like Google or GitHub.",
        "link": ["https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2"]
      }]);


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get('http://localhost:3090/resources/all');
        setResources(res.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, []);

  const onSubmit = async (data) => {
    console.log({
        ...data,
        resources:JSON.stringify(newResources)
      });
    setLoading(true);
    try {
      await axios.post('http://localhost:3090/roadmaps/add-topic', {
        ...data,
        resources:JSON.stringify(newResources)
      });
      alert('Topic created successfully!');
      reset();
      setNewResources([{ title: '', description: '', link: [''] }]);
    } catch (error) {
      console.error('Error creating topic:', error);
      alert('Failed to create topic.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">Create Topic</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Topic Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter topic name"
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-700"} bg-gray-800 text-gray-200`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter description"
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${errors.description ? "border-red-500" : "border-gray-700"} bg-gray-800 text-gray-200`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
            <input
              type="number"
              min={1}
              {...register("displayOrder")}
              placeholder="Enter display order"
              className={`w-full px-4 py-3 rounded-lg border ${errors.displayOrder ? "border-red-500" : "border-gray-700"} bg-gray-800 text-gray-200`}
            />
            {errors.displayOrder && <p className="text-red-500 text-sm">{errors.displayOrder.message}</p>}
          </div>
          <AddResource newResources={newResources} setNewResources={setNewResources} />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Creating..." : "Create Topic"}
          </button>
        </form>
      </div>
    </div>
  );
}

const AddResource = ({ newResources, setNewResources }) => {
  const addResource = () => {
    setNewResources([...newResources, { 
      title: '', 
      description: '', 
      link: ['']  // Start with one empty link
    }]);
  };

  const removeResource = (index) => {
    const updatedResources = newResources.filter((_, i) => i !== index);
    setNewResources(updatedResources);
  };

  const updateResourceField = (index, field, value) => {
    const updatedResources = newResources.map((resource, i) =>
      i === index ? { ...resource, [field]: value } : resource
    );
    setNewResources(updatedResources);
  };

  const addLink = (resourceIndex) => {
    const updatedResources = [...newResources];
    updatedResources[resourceIndex].link.push('');
    setNewResources(updatedResources);
  };

  const removeLink = (resourceIndex, linkIndex) => {
    const updatedResources = [...newResources];
    updatedResources[resourceIndex].link.splice(linkIndex, 1);
    setNewResources(updatedResources);
  };

  const updateLink = (resourceIndex, linkIndex, value) => {
    const updatedResources = [...newResources];
    updatedResources[resourceIndex].link[linkIndex] = value;
    setNewResources(updatedResources);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300">Resources</label>
      {newResources.map((resource, resourceIndex) => (
        <div key={resourceIndex} className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-4">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={resource.title}
            onChange={(e) => updateResourceField(resourceIndex, 'title', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-200"
          />

          {/* Description Input */}
          <textarea
            placeholder="Description"
            value={resource.description}
            onChange={(e) => updateResourceField(resourceIndex, 'description', e.target.value)}
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-200"
          ></textarea>

          {/* Links Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Links</label>
            {resource.link.map((link, linkIndex) => (
              <div key={linkIndex} className="flex gap-2 items-center">
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={link}
                  onChange={(e) => updateLink(resourceIndex, linkIndex, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeLink(resourceIndex, linkIndex)}
                  className="p-2 text-red-500 hover:text-red-400"
                  title="Remove link"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addLink(resourceIndex)}
              className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-sm"
            >
              <Plus size={16} /> Add Link
            </button>
          </div>

          {/* Remove Resource Button */}
          <button 
            onClick={() => removeResource(resourceIndex)}
            className="w-full flex items-center justify-center py-2 text-red-500 hover:text-red-400"
          >
            <Trash size={18} className="mr-2" /> Remove Resource
          </button>
        </div>
      ))}

      {/* Add Resource Button */}
      <button
        type="button"
        onClick={addResource}
        className="w-full flex items-center justify-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        <Plus size={20} className="mr-2" /> Add Resource
      </button>
    </div>
  );
};
