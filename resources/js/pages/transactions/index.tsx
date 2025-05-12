import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

interface Account {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface Transaction {
    id: number;
    account_id: string;
    category_id: string;
    transaction_date: string;
    type: string;
    amount: number;
    description: string;
    account: Account;
    category: Category;
};

interface TransactionsProps {
  transactions: Transaction[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Transactions({ transactions }: TransactionsProps) {

    const { delete: destroy } = useForm();

    function handleDelete(id: number) {
        if (confirm('Yakin ingin menghapus kategori ini?')) {
            destroy(`/destroy/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex flex-1 flex-col flex-wrap gap-4 rounded-xl p-4">
                <div className="mb-4 flex justify-between">
                    <Button asChild>
                        <a href="/transactions/create">New Transactions</a>
                    </Button>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <Table className="px-4">
                        {transactions && transactions.length === 0 && <TableCaption>No transactions found.</TableCaption>}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Account</TableHead>
                                <TableHead className="text-center">Category</TableHead>
                                <TableHead className="text-center">Transaction Date</TableHead>
                                <TableHead className="text-center">Type</TableHead>
                                <TableHead className="text-center">Amount</TableHead>
                                <TableHead className="text-center">Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium text-center">{transaction.account.name}</TableCell>
                                    <TableCell className="text-center">{transaction.category.name}</TableCell>
                                    <TableCell className="text-center">{transaction.transaction_date}</TableCell>
                                    <TableCell className="text-center">{capitalizeFirstLetter(transaction.type)}</TableCell>
                                    <TableCell className="text-center">
                                        <NumericFormat className="text-center" value={transaction.amount} allowNegative thousandSeparator="," />
                                    </TableCell>
                                    <TableCell className="text-center">{transaction.description}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <div className="flex justify-center space-x-2">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link href={`/transactions/${transaction.id}/edit`}>
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
                                                            onClick={() => handleDelete(transaction.id)}
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
