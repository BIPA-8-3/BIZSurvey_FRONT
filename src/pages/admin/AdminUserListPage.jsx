import * as React from "react";
import AdminUserList from "../../components/admin/AdminUserList";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminUserListPage() {
  return (
    <div style={{display:'flex'}}>
      <AdminHeader />
      <AdminUserList />
    </div>
  );
}
