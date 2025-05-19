import { useAuth, useOrganization } from "@clerk/nextjs";
import { useMemo } from "react";

export default function useHasAdmin() {
  const { has } = useAuth();
  const { organization } = useOrganization();

  return useMemo(() => {
    return organization ? has && has({ role: "org:admin" }) : true;
  }, [has, organization]);
}
