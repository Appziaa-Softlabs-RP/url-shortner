export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className='text-slate-800 min-h-screen max-w-4xl mx-auto'>
      {children}
    </div>
  );
}
