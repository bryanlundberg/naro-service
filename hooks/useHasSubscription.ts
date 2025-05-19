import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";

export default function useHasSubscription() {
  const { has } = useAuth();

  return useMemo(() => {
    return has ?  has({ plan: "professional" }) : false;
  }, [has]);
}
