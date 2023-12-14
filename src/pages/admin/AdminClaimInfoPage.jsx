import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import AdminClaimInfo from "../../components/admin/AdminClaimInfo";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminClaimListPage() {
  return (
    <div style={{display:'flex'}}>
      <AdminHeader />
      <AdminClaimInfo />
    </div>
  );
}
