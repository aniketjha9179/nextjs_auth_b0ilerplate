import React from 'react'

const UserProfile = ({params}:any) => {
  return (
    <div className=' flex flex-col min-h-screen justify-center items-center'>
      <p>profile page</p>
      <p className=' text-4xl'>{params.id} </p>
    </div>
  )
}

export default UserProfile
