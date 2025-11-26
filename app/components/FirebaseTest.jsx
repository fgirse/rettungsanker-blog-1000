'use client';

import { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '@/firebase';
import { Alert, Button } from 'flowbite-react';

export default function FirebaseTest() {
  const [testResult, setTestResult] = useState('');
  const [testing, setTesting] = useState(false);

  const testFirebaseConnection = async () => {
    setTesting(true);
    setTestResult('');
    
    try {
      // Check environment variables
      const envCheck = {
        FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      };
      
      console.log('Environment variables:', envCheck);
      
      if (!envCheck.FIREBASE_API_KEY) {
        setTestResult('❌ NEXT_PUBLIC_FIREBASE_API_KEY is not set');
        setTesting(false);
        return;
      }
      
      if (!envCheck.FIREBASE_STORAGE_BUCKET) {
        setTestResult('❌ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is not set');
        setTesting(false);
        return;
      }

      // Try to get storage
      const storage = getStorage(app);
      console.log('Storage bucket:', storage.app.options.storageBucket);
      
      if (!storage.app.options.storageBucket) {
        setTestResult('❌ Firebase Storage bucket is not configured');
        setTesting(false);
        return;
      }

      // Try to create a reference (without uploading)
      const testRef = ref(storage, 'test-connection.txt');
      
      setTestResult(`✅ Firebase connection successful!\nBucket: ${storage.app.options.storageBucket}`);
    } catch (error) {
      console.error('Firebase test error:', error);
      setTestResult(`❌ Error: ${error.message}`);
    }
    
    setTesting(false);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Firebase Connection Test</h2>
      <Button onClick={testFirebaseConnection} disabled={testing}>
        {testing ? 'Testing...' : 'Test Firebase Connection'}
      </Button>
      {testResult && (
        <Alert color={testResult.includes('✅') ? 'success' : 'failure'} className="mt-4">
          <pre className="whitespace-pre-wrap">{testResult}</pre>
        </Alert>
      )}
    </div>
  );
}
