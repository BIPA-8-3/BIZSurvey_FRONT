import * as React from "react";
import AdminClaimList from "../../components/admin/AdminClaimList";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminClaimListPage() {
  return (
    <div style={{display:'flex'}}>
      <AdminHeader />
      <AdminClaimList />
    </div>
  );
}
