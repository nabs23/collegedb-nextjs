'use client'
import { BookUser, CalendarCheck, ChevronFirst, ChevronLast, GaugeCircle, GraduationCap, Presentation, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: GaugeCircle
    },
    {
        name: 'Students',
        href: '/students',
        icon: BookUser
    },
    {
        name: 'Academic Periods',
        href: '/academic-periods',
        icon: CalendarCheck
    },
    {
        name: 'Programs',
        href: '/programs',
        icon: GraduationCap
    },
    {
        name: 'Classes',
        href: '/classes',
        icon: Presentation
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings2
    },
]

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true)
    const path = usePathname()
    function toggle() {
        setExpanded(!expanded)
    }
    const width = expanded ? 64 : 12
    return (
        <div className="flex min-h-screen relative">
            <div className={`bg-gray-800 text-white flex flex-col ${expanded ? 'w-64' : 'w-12'} fixed top-0`}>
                {/* <!-- Sidebar header --> */}
                <div className="h-[var(--navbar-height)] flex items-center bg-gray-700">
                    {expanded && <h1 className="text-2xl font-bold text-center flex-grow">College<span className="text-cyan-400">DB</span></h1>}
                    <button type="button" onClick={toggle} className="flex items-center px-2 justify-center w-12">
                        {expanded ? <ChevronFirst size={24} /> : <ChevronLast size={24} rotate={180} className="transition-all duration-300 delay-75" />}
                    </button>
                </div>
                {/* <!-- Sidebar content --> */}
                <div className="h-[calc(100vh-var(--navbar-height))] overflow-y-auto overflow-x-hidden py-6 px-2">
                    <ul className="space-y-2">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className={`flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700 ${path.startsWith(link.href) ? 'bg-gray-700' : ''}`}>
                                    <link.icon size={24} />
                                    {expanded && <span className="ml-3">{link.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* <!-- Main content --> */}
            <div className={`flex-grow bg-gray-200 p-6 ${expanded ? 'ml-64' : 'ml-12'}`}>
                {/* <!-- Main content --> */}
                    {children}
            </div>
        </div>

    )
}