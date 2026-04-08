import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardShell from '@/components/dashboard/DashboardShell'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <DashboardShell user={{
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }}>
            {children}
        </DashboardShell>
    )
}
