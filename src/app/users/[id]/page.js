"use client";

import UseProfile from "@/app/components/UseProfile";
import UserTabs from "@/app/components/layout/UserTabs";

const EditUserPage = () => {
  const { loading, data } = UseProfile();

  if (loading) {
    return "Loading...";
  }

  if (!data) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div>Edit user page</div>
    </section>
  );
};

export default EditUserPage;
