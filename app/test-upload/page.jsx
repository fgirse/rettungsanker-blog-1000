'use client';

import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/firebase';
import { Button, FileInput, Alert } from 'flowbite-react';
import Image from 'next/image';

export default function TestUploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);
    setLogs([]);
    addLog('🚀 Starting upload process...');

    try {
      // Check environment variables
      addLog(`📋 Checking environment variables...`);
      addLog(`   API Key: ${process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}`);
      addLog(`   Storage Bucket: ${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '❌ Missing'}`);
      
      if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
        throw new Error('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is not set');
      }

      // Get storage instance
      addLog('🔥 Initializing Firebase Storage...');
      const storage = getStorage(app);
      addLog(`   Storage initialized with bucket: ${storage.app.options.storageBucket}`);

      // Create file reference
      const fileName = `test_${Date.now()}_${file.name}`;
      addLog(`📁 Creating storage reference: ${fileName}`);
      const storageRef = ref(storage, fileName);
      addLog(`   Reference created successfully`);

      // Start upload
      addLog(`⬆️  Starting upload of ${file.name} (${(file.size / 1024).toFixed(2)} KB)...`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercent);
          addLog(`   Progress: ${progressPercent.toFixed(1)}% (${snapshot.bytesTransferred}/${snapshot.totalBytes} bytes)`);
        },
        (error) => {
          addLog(`❌ Upload failed!`);
          addLog(`   Error code: ${error.code}`);
          addLog(`   Error message: ${error.message}`);
          addLog(`   Full error: ${JSON.stringify(error, null, 2)}`);
          setError(`Upload failed: ${error.message} (${error.code})`);
          setUploading(false);
        },
        async () => {
          addLog(`✅ Upload completed successfully!`);
          try {
            addLog(`🔗 Getting download URL...`);
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            addLog(`   Download URL: ${downloadURL}`);
            setImageUrl(downloadURL);
            addLog(`🎉 All done!`);
          } catch (urlError) {
            addLog(`❌ Failed to get download URL: ${urlError.message}`);
            setError(`Failed to get download URL: ${urlError.message}`);
          }
          setUploading(false);
        }
      );
    } catch (err) {
      addLog(`❌ Error: ${err.message}`);
      setError(err.message);
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Firebase Upload Test</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">Select Image:</label>
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              if (selectedFile) {
                addLog(`📷 File selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`);
              }
            }}
          />
        </div>

        <Button
          onClick={testUpload}
          disabled={!file || uploading}
          gradientDuoTone="purpleToBlue"
        >
          {uploading ? `Uploading... ${progress.toFixed(0)}%` : 'Test Upload'}
        </Button>

        {error && (
          <Alert color="failure">
            <span className="font-bold">Error:</span> {error}
          </Alert>
        )}

        {imageUrl && (
          <Alert color="success">
            <div>
              <p className="font-bold mb-2">✅ Upload Successful!</p>
              <p className="text-sm break-all mb-2">URL: {imageUrl}</p>
              <Image 
                src={imageUrl} 
                alt="Uploaded" 
                width={400} 
                height={300}
                className="rounded-lg"
              />
            </div>
          </Alert>
        )}

        {logs.length > 0 && (
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="font-bold mb-2">📝 Debug Log:</div>
            {logs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h2 className="font-bold mb-2">Firebase Configuration Check:</h2>
        <ul className="space-y-1 text-sm">
          <li>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}</li>
          <li>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}</li>
          <li>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}</li>
          <li>Storage Bucket: {process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing'}</li>
          <li>Messaging Sender ID: {process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing'}</li>
          <li>App ID: {process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'}</li>
        </ul>
      </div>
    </div>
  );
}
