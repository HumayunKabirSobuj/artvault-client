import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


function useAllDonorRequest() {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosPublic()

    const { data: donorReq = [], refetch, isLoading } = useQuery({
        queryKey: ['donorReq'],
        queryFn: async () => {
            const res = await axiosSecure.get(donorReq);
            return res.data;
        }
    })
    return { donorReq, refetch, isLoading }
}

export default useAllDonorRequest