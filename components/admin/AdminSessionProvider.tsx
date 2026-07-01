"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface AdminSessionContextType {
  isAdmin: boolean;
  adminUser: any;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  isLoading: boolean;
}

const AdminSessionContext = createContext<AdminSessionContextType>({
  isAdmin: false,
  adminUser: null,
  editMode: false,
  setEditMode: () => {},
  isLoading: true,
});

export function AdminSessionProvider({ children }: { children: ReactNode }) {
  const adminUser = useQuery(api.admin.getCurrentAdmin);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (adminUser !== undefined) {
      setIsLoading(false);
    }
  }, [adminUser]);

  // Reset editMode if admin signs out
  useEffect(() => {
    if (!adminUser) {
      setEditMode(false);
    }
  }, [adminUser]);

  const isAdmin = !!adminUser && adminUser.isActive;

  return (
    <AdminSessionContext.Provider
      value={{
        isAdmin,
        adminUser,
        editMode,
        setEditMode,
        isLoading,
      }}
    >
      {children}
    </AdminSessionContext.Provider>
  );
}

export function useAdminSession() {
  return useContext(AdminSessionContext);
}
