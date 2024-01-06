'use client'
import InsititutionForm from "@/components/forms/institution-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function Settings() {
  const [institutionData, setInstitutionData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchInstitutionData() {
      try {
        const response = await fetch("/api/institutions");
        const data = await response.json();
        setInstitutionData(data);
      } catch (error) {
        console.error("Failed to fetch institution data", error);
        // Handle error appropriately in your application
        router.push("/settings");
      }
    }

    fetchInstitutionData();
  }, [router]); // Empty dependency array means this effect runs once on mount

  if (institutionData) {
    return (
      <Fragment>
      <h1 className="text-2xl font-semibold mb-4">{institutionData.name}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Short Name:</strong> {institutionData.shortName}</p>
          <p><strong>Address:</strong> {institutionData.address}</p>
          <p><strong>City/Municipality:</strong> {institutionData.city}</p>
          <p><strong>Province:</strong> {institutionData.province}</p>
          <p><strong>Region:</strong> {institutionData.region}</p>
        </div>
        <div>
          <p><strong>Phone:</strong> {institutionData.phone}</p>
          <p><strong>Email:</strong> {institutionData.email}</p>
          <p><strong>Period Type:</strong> {institutionData.periodType}</p>
          <p><strong>Periods:</strong> {institutionData.periods.join(', ')}</p>
        </div>
      </div>
      {institutionData.customLetterhead && (
        <div>
          <h3 className="mt-4 text-lg font-semibold">Custom Letterhead:</h3>
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: institutionData.customLetterhead }}
          />
        </div>
      )}
      <div className="my-3">
        <Link href="/settings/edit" className="btn btn-info">Edit</Link>
      </div>
    </Fragment>
    );
  }
  return (
    <section>
      <h1 className="text-3xl">Settings</h1>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl">HEI Basic Info</h2>
        <InsititutionForm institutionData={null} />
      </div>
    </section>
  );
}
