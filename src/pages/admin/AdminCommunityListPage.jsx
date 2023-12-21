import * as React from "react";
import AdminCommunityList from "../../components/admin/AdminCommunityList";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminCommunityListPage() {
  return (
    <div style={{display:'flex'}}>
      <AdminHeader />
      <AdminCommunityList />
    </div>
  );
}
