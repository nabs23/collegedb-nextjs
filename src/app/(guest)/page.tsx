import { BookUser, CalendarCheck, ChevronFirst, ChevronLast, GaugeCircle, GraduationCap, Presentation, Settings2 } from "lucide-react";
import Link from "next/link";

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className='text-3xl font-bold'>CollegeDB</h1>
      <p>College Mangement System for HEIs</p>
      <ul className="flex my-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="hover:underline text-cyan-500">
              <span className="ml-3">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
