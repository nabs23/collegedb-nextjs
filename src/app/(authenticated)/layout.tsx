import Sidebar from "./sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <Sidebar>
            <main className="bg-white min-h-[calc(100vh-3rem)] p-4">
                {children}
            </main>
        </Sidebar>

    )
}