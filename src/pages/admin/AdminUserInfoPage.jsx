import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminUserInfo from "../../components/admin/AdminUserInfo";

export default function AdminUserInfoPage() {
  return (
    <div style={{display:'flex'}}>
      <AdminHeader />
      <AdminUserInfo />
    </div>
  );
}
