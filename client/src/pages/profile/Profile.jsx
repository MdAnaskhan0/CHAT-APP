import { useAppStore } from '../../store/index.js';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { apiClient } from '../../lib/api-client.js';
import { GET_USER_INFO_ROUTE, UPDATE_USER_INFO_ROUTE, PROFILE_IMAGE_ROUTE } from '../../utils/constants.js';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, clearUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [image, setImage] = useState(userInfo?.image || null);
  const [selectedColor, setSelectedColor] = useState(userInfo?.color || 0);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO_ROUTE);
        if (response.data?.user) {
          setUserInfo(response.data.user);
          setFirstName(response.data.user.firstName || "");
          setLastName(response.data.user.lastName || "");
          setImage(response.data.user.image || null);
          setSelectedColor(response.data.user.color || 0);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        if (error.response?.status === 401) {
          clearUserInfo();
          navigate('/auth');
        }
      }
    };

    if (!userInfo) {
      fetchUserData();
    } else {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setImage(userInfo.image || null);
      setSelectedColor(userInfo.color || 0);
    }
  }, [userInfo, setUserInfo, clearUserInfo, navigate]);

  const validateProfile = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveChanges = async () => {
    if (!validateProfile()) return;

    setIsLoading(true);
    try {
      const response = await apiClient.post(
        UPDATE_USER_INFO_ROUTE,
        {
          firstName,
          lastName,
          color: selectedColor,
          profileSetUp: true
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUserInfo({
          ...userInfo,
          ...response.data.user,
          profileSetUp: true
        });
        navigate('/chat');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      if (error.response?.data?.message) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: "Failed to update profile. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Image Upload
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('profile-image', file);

      const response = await apiClient.post(PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image upload failed:', error);
      if (error.response?.data?.message) {
        setErrors({ ...errors, image: error.response.data.message });
      } else {
        setErrors({ ...errors, image: 'Failed to upload image' });
      }
    }
  };

  const handleDeleteImage = async () => {

  }
  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        <IoArrowBack
          className='text-white text-4xl cursor-pointer'
          onClick={() => navigate(-1)}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4'>
        <div className='flex flex-col items-center gap-6'>
          <div className="avatar relative">
            <div
              className="ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2 relative group"
              onClick={image ? handleDeleteImage : handleFileInputClick}
            >
              {image ? (
                <>
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/${userInfo.image}`}
                    alt="avatar"
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full transition-opacity group-hover:opacity-70"
                  />

                  <FaTrash
                    className="absolute inset-0 m-auto text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    size={24}
                  />
                </>
              ) : (
                <>
                  <div
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center transition-opacity group-hover:opacity-70"
                    style={{ backgroundColor: `hsl(${selectedColor * 60}, 70%, 50%)` }}
                  >
                    <div className="text-white text-5xl font-bold uppercase">
                      {(firstName || userInfo?.email || '?').charAt(0)}
                    </div>
                  </div>
                  <FaPlus
                    className="absolute inset-0 m-auto text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    size={24}
                  />
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name='profile-image'
              accept='.jpg,.png,.jpeg,.svg'
            />
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          {errors.server && (
            <div className="text-red-500 bg-red-50 p-2 rounded-md">
              {errors.server}
            </div>
          )}

          <div className='flex flex-col gap-2'>
            <label className='text-white'>Email</label>
            <input
              type="text"
              value={userInfo?.email || ''}
              readOnly
              className='bg-[#2a2b36] text-gray-400 p-2 rounded cursor-not-allowed'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white'>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors({ ...errors, firstName: '' });
              }}
              className={`bg-[#2a2b36] text-white p-2 rounded ${errors.firstName ? 'border border-red-500' : ''}`}
            />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white'>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrors({ ...errors, lastName: '' });
              }}
              className={`bg-[#2a2b36] text-white p-2 rounded ${errors.lastName ? 'border border-red-500' : ''}`}
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white'>Profile Color</label>
            <div className='flex flex-wrap gap-2'>
              {[0, 1, 2, 3, 4, 5].map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full cursor-pointer ${selectedColor === color ? 'ring-2 ring-white' : ''}`}
                  style={{ backgroundColor: `hsl(${color * 60}, 70%, 50%)` }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <button
            onClick={saveChanges}
            disabled={isLoading}
            className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition mt-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;