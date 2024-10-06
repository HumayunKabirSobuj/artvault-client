import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
const useRole = () => {
  const { user} = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()

  const { data: role = ' ', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic(`/user/${user?.email}`)
      return data.role
    },
  })


  return [role, isLoading]
}

export default useRole
