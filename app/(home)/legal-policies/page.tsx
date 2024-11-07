import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { legalPolicies } from "@/constants/data"
import { Download, FileText } from "lucide-react"
import Link from 'next/link'

const getLegalPolicies = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/legal-policies`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).then(res => res.json());
    return res?.data;
}

export default async function LegalPolicies() {

    const fetched = await getLegalPolicies();

    const policies = await fetched?.data;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Legal Policies and Laws</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {policies?.map((policy: legalPolicies, index: number) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                {policy.title}
                            </CardTitle>
                            <CardDescription>{policy.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-end">
                            <Link href={policy.file} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" /> Download PDF
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}