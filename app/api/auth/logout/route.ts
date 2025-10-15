import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Get the cookies instance
    const cookieStore = await cookies()
    
    // Clear JWT token cookies
    cookieStore.delete('token')
    cookieStore.delete('refreshToken')
    cookieStore.delete('auth-token')
    
    // You can also set them to expire immediately as an alternative
    // cookieStore.set('token', '', { maxAge: 0 })
    
    return NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}