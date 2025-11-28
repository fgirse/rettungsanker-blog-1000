import React from 'react'
import { auth } from '@clerk/nextjs/server'  
import MenuebarClient from './MenuebarClient'

const Menuebar = async () => {
  const { userId } = await auth();
  return <MenuebarClient userId={userId || null} />
}

export default Menuebar
