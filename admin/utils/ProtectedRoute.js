'use client'

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, allowedRoles }) {
  const role = useSelector(state=>state.auth.role);
  console.log(role);
  const navigate=useRouter();
  if (!role) return <p>Loading...</p>;
  if (!allowedRoles.includes(role)){
    navigate.replace('/unauthorized');
    return;
  }

  return children;
}
