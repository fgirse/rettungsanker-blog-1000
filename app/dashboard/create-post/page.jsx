'use client';

import { useUser } from '@clerk/nextjs';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import Image from 'next/image';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
// https://dev.to/a7u/reactquill-with-nextjs-478b
import 'react-quill-new/dist/quill.snow.css';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const router = useRouter();
  console.log(formData);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      
      setImageUploadError(null);
      setImageUploadProgress(1);
      console.log('🚀 Starting Cloudinary upload for:', file.name);
      
      // Create FormData for Cloudinary upload
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('upload_preset', 'ml_default'); // Cloudinary unsigned preset
      
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      console.log('📤 Uploading to Cloudinary cloud:', cloudName);
      
      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: uploadFormData,
        }
      );
      
      setImageUploadProgress(50);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Upload failed');
      }
      
      const data = await response.json();
      console.log('✅ Upload successful! URL:', data.secure_url);
      
      setImageUploadProgress(100);
      setImageUploadError(null);
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
      
      // Reset progress after a short delay
      setTimeout(() => setImageUploadProgress(null), 1000);
      
    } catch (error) {
      console.error('❌ Cloudinary upload error:', error);
      setImageUploadError(`Upload failed: ${error.message}`);
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Submitting post with data:', formData);
    
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      console.log('📡 Response from API:', { status: res.status, data });
      
      if (!res.ok) {
        setPublishError(data.message || 'Failed to create post');
        console.error('❌ Post creation failed:', data);
        return;
      }
      
      if (res.ok) {
        setPublishError(null);
        console.log('✅ Post created successfully! Slug:', data.slug);
        router.push(`/post/${data.slug}`);
      }
    } catch (error) {
      console.error('❌ Error submitting post:', error);
      setPublishError(`Something went wrong: ${error.message}`);
    }
  };

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Create a post
        </h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Title'
              required
              id='title'
              className='flex-1'
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value='uncategorized'>Select a category</option>
              <option value='rettungsanker-freiburg'>Rettungsanker-Freiburg</option>
              <option value='bundesliga'>Bundesliga</option>
              <option value='sc-freiburg'>SC Freiburg</option>
            </Select>
          </div>
          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size='sm'
              outline
              onClick={handleUpdloadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className='w-16 h-16'>
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                'Upload Image'
              )}
            </Button>
          </div>

          {imageUploadError && (
            <Alert color='failure'>{imageUploadError}</Alert>
          )}
          {formData.image && (
            <Image
              src={formData.image}
              alt='upload'
              width={800}
              height={288}
              className='w-full h-72 object-cover'
            />
          )}
          {publishError && (
            <Alert color='failure'>{publishError}</Alert>
          )}

          <ReactQuill
            theme='snow'
            placeholder='Write something...'
            className='h-72 mb-12'
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />
          <Button type='submit' gradientDuoTone='purpleToPink'>
            Publish
          </Button>
        </form>
      </div>
    );
  } else {
    return (
      <h1 className='text-center text-3xl my-7 font-semibold'>
        You are not authorized to view this page
      </h1>
    );
  }
}
