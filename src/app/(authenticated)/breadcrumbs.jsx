import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
    const path = usePathname();
    const pathArray = path.split('/').filter(Boolean);
    return (
            <ul className="flex items-center space-x-2 h-[var(--navbar-height)]">
                {pathArray.map((path, index) => (
                    <li key={index}>
                        <Link href={`/${path}`} className="capitalize hover:underline text-lg font-bold">
                            {path.split('-').join(' ')}
                            {index !== pathArray.length - 1 && ' /'}
                        </Link>
                    </li>
                ))}
            </ul>
    )
}