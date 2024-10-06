/* eslint-disable react/prop-types */


import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import ReqStatus from '../../Components/ReqStatus';


const CustomerData = ({ user, refetch, handleDelete, role }) => {


  return (
    <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'><Link to={`/customerDetail/${user?._id}`}>{user?.userName}</Link></p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.city}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.date}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.time}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'inactive' ? 'text-red-500' : 'text-green-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-green-500 whitespace-no-wrap'>Active</p>
        )}
      </td>

      {
        user?.status === "cancel" ?
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <ReqStatus userId={user._id} initialStatus={user.status} />
        </td>
        :
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          {}
        </td>
      }
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'><img src={user?.imgurl} className="rounded-full border-2 border-gray-200 p-1" alt="product image" /></p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-blue-6 00 whitespace-no-wrap'>{user?.email}</p>
      </td>
   
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-teal-600 whitespace-no-wrap'><Link to={'/dashboard/create-donation-request'}><FaEdit  className='text-3xl  hover:text-green-400'></FaEdit></Link></p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => handleDelete(user?._id)} className='text-red-700 whitespace-no-wrap'><MdDelete className='text-3xl  hover:text-red-400'/></button>
      </td>

    </tr>
  )  
}
export default CustomerData