'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Roadmap name is required'),
  description: yup.string().required('Description is required'),
  topics: yup
    .array()
    .min(1, 'Select at least one topic')
    .required('Select at least one topic'),
  iconName: yup.string().required('Icon name is required'),
  iconColor: yup.string().required('Icon color is required'),
});

export default function CreateRoadmap() {
  const [topicsArr, setTopicsArr] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      topics: [],
    }
  });

  // Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      setLoadingTopics(true);
      try {
        const response = await axios.get('http://localhost:3090/roadmaps/all-topics');
        setTopicsArr(
          response.data.map((topic) => ({
            label: topic.name,
            value: topic.id,
          }))
        );
      } catch (error) {
        console.error('Error fetching topics:', error);
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, []);

  // Form submission handler - FIXED
  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const formattedData = {
        ...data,
        topics: data.topics.map((topic) => topic.value), // extract topic IDs
      };
      
      await axios.post('http://localhost:3090/roadmaps/create-roadmap', formattedData);
      alert('Roadmap created successfully!');
      reset();
    } catch (error) {
      console.error('Error creating roadmap:', error);
      alert('Failed to create roadmap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">Create Roadmap</h1>
        
        {/* FIXED: removed onSubmit={handleSubmit(onSubmit)} */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Roadmap Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Roadmap Name</label>
            <input
              type="text"
              {...register('name')}
              placeholder="Enter roadmap name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } bg-gray-900 text-gray-200`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Roadmap Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              {...register('description')}
              placeholder="Enter roadmap description"
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } bg-gray-900 text-gray-200`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Icon</label>
            <select
              {...register('iconName')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.iconName ? 'border-red-500' : 'border-gray-300'
              } bg-gray-900 text-gray-200`}
            >
              <option value="">Select an icon</option>
              <option value="star">Star</option>
              <option value="heart">Heart</option>
              <option value="check-circle">Check Circle</option>
              {/* Add more icons as needed */}
            </select>
            {errors.iconName && (
              <p className="text-red-500 text-sm">{errors.iconName.message}</p>
            )}
          </div>

          {/* Color Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Color</label>
            <input
              type="color"
              {...register('iconColor')}
              className={`w-full h-[50px] px-[10px] py-[8px] rounded-md border ${
                errors.iconColor ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.iconColor && (
              <p className="text-red-500 text-sm">{errors.iconColor.message}</p>
            )}
          </div>

          {/* Multi-select Topics */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Topics</label>
            <Controller
              name="topics"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={topicsArr}
                  value={field.value || []}
                  onChange={field.onChange}
                  labelledBy="Search topics"
                  isLoading={loadingTopics}
                  disableSearch={false}
                  hasSelectAll={false}
                  overrideStrings={{
                    selectSomeItems: 'Search topics...',
                    search: 'Search by title',
                  }}
                  className="bg-gray-900 text-gray-200"
                />
              )}
            />
            {errors.topics && (
              <p className="text-red-500 text-sm mt-1">{errors.topics.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-[10px] rounded-lg font-bold text-white ${
              loading ? 'bg-blue-500 opacity-70 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Creating...' : 'Create Roadmap'}
          </button>
        </form>
      </div>
    </div>
  );
}