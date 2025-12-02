import React from 'react'
import { auth } from '@clerk/nextjs/server'  
import MenuebarClient from './MenuebarClient'

export default async function Menuebar() {
  const { userId } = await auth();

  return <MenuebarClient userId={userId || null} />
}
