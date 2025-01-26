import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function ShowQrCodes({ qrCodes, token }: { qrCodes: any; token: string }) {
    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">QR Codes</h1>
                <Button asChild>
                    <Link href="/dashboard/qr-codes/create">Create New QR Code</Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>QR Code</TableHead>
                        <TableHead>Long URL</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {qrCodes.map((qrCode: any) => (
                        <TableRow key={qrCode.id}>
                            <TableCell>
                                <img src={qrCode.qr_code || "/placeholder.svg"} alt="QR Code" className="w-16 h-16" />
                            </TableCell>
                            <TableCell>{qrCode.long_url}</TableCell>
                            <TableCell>{new Date(qrCode.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/dashboard/qr-codes/${qrCode.id}`}>View</Link>
                                    </Button>
                                    {/* <Button asChild variant="outline" size="sm">
                                        <Link href={`/dashboard/qr-codes/${qrCode.id}/edit`}>Edit</Link>
                                    </Button> */}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

