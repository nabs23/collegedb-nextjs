import InsititutionForm from "@/components/forms/institution-form";

export default function Settings() {
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
