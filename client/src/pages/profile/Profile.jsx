import { useAppStore } from '../../store/index.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { use } from 'react';
import { apiClient } from '../../lib/api-client.js';
import { GET_USER_INFO_ROUTE } from '../../utils/constants.js';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hover, setHover] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO_ROUTE);
        if (response.data?.user) {
          useAppStore.getState().setUserInfo(response.data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        if (error.response?.status === 401) {
          useAppStore.getState().clearUserInfo();
        }
      }
    };
    if (!useAppStore.getState().userInfo) {
      fetchUserData();
    }
  }, []);

  const saveChanges = async () => { };

  return (
    <>
      <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
        <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
          <IoArrowBack className='text-white text-4xl' />
        </div>
        <div className='grid grid-cols-2'>
          <div className='h-full md:w-48 md:h-48 relative flex items-center justify-center'>
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                {image ? (<>
                  <img src={userInfo?.image} alt="avatar" className="w-full h-full" />
                </>) : (<>
                  <div className="w-full h-full bg-primary rounded-full">
                    <div className="text-white text-2xl font-bold">
                      {userInfo?.firstName?.charAt(0)}
                    </div>
                  </div>
                </>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile