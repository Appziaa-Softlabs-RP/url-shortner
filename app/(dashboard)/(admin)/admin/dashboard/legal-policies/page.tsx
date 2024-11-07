import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/legal-policies/columns";
import { LegalPoliciesTable } from "@/components/tables/legal-policies/legal-policies-table";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { legalPolicies } from "@/constants/data";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import Link from "next/link";

const breadcrumbItems = [
    { title: "Legal Policies", link: "/admin/dashboard/legal-policies" },
];

type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

const getBlogCategories = async ({ token, search, page, limit }: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/legal-policies?page=${page}&search=${search}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-cache'
    }).then(res => res.json());
    return res?.data;
}

export default async function page({ searchParams }: paramsProps) {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/auth",
        },
    });

    const employeeRes = await getBlogCategories({
        token: session?.accessToken,
        search: searchParams.search ?? '',
        page: searchParams.page ?? 1,
        limit: searchParams.limit ?? 10,
    });

    const page = Number(searchParams.page) || 1;
    const pageCount = employeeRes?.last_page ?? 0;
    const categoriesData: legalPolicies[] = employeeRes?.data ?? 0;
    const limit = employeeRes?.per_page ?? 0;

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb initial={'/admin/dashboard'} items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Manage Legal Policies`}
                        description="Manage your legal policies here"
                    />
                </div>
            </div>
            <div className="flex w-full justify-end mb-4">
                <Link
                    href="/admin/dashboard/legal-policies/add"
                >
                    <Button size={'sm'}>
                        Add policy
                    </Button>
                </Link>
            </div>
            <Separator />

            <LegalPoliciesTable
                searchKey="title"
                pageNo={page}
                columns={columns}
                data={categoriesData}
                pageCount={pageCount}
                limit={limit}
            />
        </>
    );
}