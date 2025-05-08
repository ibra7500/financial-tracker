import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';
import { NumericFormat } from 'react-number-format';


type AccountsProps = {
    accounts: Array<{
        id: number;
        name: string;
        balance: number;
    }>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: '/accounts',
    },
];

export default function Accounts({ accounts }: AccountsProps) {

    const { delete: destroy } = useForm();

    function handleDelete(id: number) {
        if (confirm('Yakin ingin menghapus kategori ini?')) {
            destroy(`/destroy/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accounts" />
            <div className="flex flex-1 flex-col flex-wrap gap-4 rounded-xl p-4">
                <div className="mb-4 flex justify-between">
                    <Button asChild>
                        <a href="/accounts/create">New Accounts</a>
                    </Button>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <Table className="px-4">
                        {accounts && accounts.length === 0 && <TableCaption>No accounts found.</TableCaption>}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Name</TableHead>
                                <TableHead className="text-center">Balance</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accounts.map((account) => (
                                <TableRow key={account.name}>
                                    <TableCell className="font-medium text-center">{account.name}</TableCell>
                                    <TableCell className="text-center">
                                        <NumericFormat className="text-center" value={account.balance} allowNegative thousandSeparator="," />
                                    </TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <div className="flex justify-center space-x-2">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link href={`/accounts/${account.id}/edit`}>
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                className="bg-green-600 text-white hover:bg-green-700"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Edit</p>
                                                    </TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="bg-red-600 text-white hover:bg-red-700"
                                                            onClick={() => handleDelete(account.id)}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Hapus</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
