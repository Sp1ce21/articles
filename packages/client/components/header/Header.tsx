"use client";

import Link from "next/link";
import React, { memo, useCallback } from "react";
import { User } from "@prisma/client";
import { Button } from "@mui/material";
import Container from "../container/Container";
import { UserRole } from "@/utils/constants";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { removeToken } = useAuth();
  const router = useRouter();

  const onLogout = useCallback(() => {
    removeToken();
    toast.success("Logged out");
    router.push("/");
    router.refresh();
  }, [router, removeToken]);

  return (
    <header className="border-b border-gray-200">
      <Container>
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="text-3xl font-bold">
            Articles
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === UserRole.ADMIN && (
                <Link href="/admin">
                  <Button size="large">Admin Dashboard</Button>
                </Link>
              )}
              <Button size="large" variant="outlined" onClick={onLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button size="large">Login</Button>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default memo(Header);
