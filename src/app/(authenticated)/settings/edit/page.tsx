'use client'
import React, { useEffect, useState } from 'react';
import InstitutionForm from "@/components/forms/institution-form";
import { useRouter } from 'next/navigation';

export default function EditSettings() {
    const [institutionData, setInstitutionData] = useState(null);
    const router = useRouter();
    useEffect(() => {
        async function fetchInstitutionData() {
            try {
                const response = await fetch('/api/institutions');
                const data = await response.json();
                setInstitutionData(data);
            } catch (error) {
                console.error("Failed to fetch institution data", error);
                // Handle error appropriately in your application
                router.push('/dashboard');
            }
        }

        fetchInstitutionData();
    }, [router]); // Empty dependency array means this effect runs once on mount

    return (
        <section>
            <h1 className="text-3xl">Settings</h1>
            {/* Pass the fetched data to the form */}
            <InstitutionForm institutionData={institutionData} />
        </section>
    )
}
