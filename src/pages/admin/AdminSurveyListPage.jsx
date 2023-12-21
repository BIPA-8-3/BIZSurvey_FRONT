import * as React from "react";
import AdminSurveyList from "../../components/admin/AdminSurveyList";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminUserListPage() {
  return (
    <div style={{display:'flex'}}>
      <AdminHeader />
      <AdminSurveyList />
    </div>
  );
}
