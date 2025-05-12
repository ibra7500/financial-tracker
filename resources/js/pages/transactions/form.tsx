import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
// import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
// import { CalendarIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
// import { format } from "date-fns"
// import { cn } from "@/lib/utils"
import { Input } from '@/components/ui/input';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
    {
        title: 'Create',
        href: '/transactions/create',
    },
];

interface Transaction {
    id?: number;
    account_id: string;
    category_id: string;
    transaction_date: string;
    type: string;
    amount: string;
    description: string;
}

type AccountsProps = {
    accounts: Array<{
        id: number;
        name: string;
    }>;
};

type CategoriesProps = {
    categories: Array<{
        id: number;
        name: string;
    }>;
};

interface Props {
    transaction?: Transaction;
    mode: 'create' | 'edit';
    [key: string]: any;
}

const TransactionForm = () => {
    const { transaction, mode } = usePage<Props>().props;

    // const initialDate = transaction?.transaction_date ? new Date(transaction.transaction_date) : undefined;

    const { data, setData, post, put, processing, errors } = useForm({
        account_id: transaction?.account_id ?? '',
        category_id: transaction?.category_id ?? '',
        transaction_date: transaction?.transaction_date ?? '',
        type: transaction?.type ?? '',
        amount: transaction?.amount ?? '',
        description: transaction?.description ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (mode === 'create') {
            post(`/transactions`, {
                preserveScroll: true,
            });
        } else {
            if (transaction) {
                put(`/transactions/${transaction.id}`, {
                    preserveScroll: true,
                });
            }
        }
    };

        // Function to handle date selection
    // const handleDateSelect = (date: Date | undefined) => {
    //     setData('transaction_date', date || '');
    // };

    const { accounts } = usePage<AccountsProps>().props;
    const { categories } = usePage<CategoriesProps>().props;

    const pageTitle = mode === 'edit' ? 'Edit Transaction' : 'Create Transaction';

    //  const formData = {
    //     ...data,
    //     transaction_date: data.transaction_date instanceof Date ?
    //         format(data.transaction_date, 'yyyy-MM-dd') :
    //         data.transaction_date
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex flex-1 flex-col flex-wrap gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <Card>
                        <CardHeader>
                            <CardTitle>{pageTitle}</CardTitle>
                        </CardHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                                    <div>
                                        <Label className="mb-1 block">Account</Label>
                                        <Select onValueChange={(value) => setData('account_id', value)} defaultValue={data.account_id}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Account" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Account</SelectLabel>
                                                    {accounts.map((account) => (
                                                        <SelectItem key={account.id} value={String(account.id)}>
                                                            {account.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.account_id && <div className="text-sm text-red-500">{errors.account_id}</div>}
                                    </div>
                                    <div>
                                        <Label className="mb-1 block">Categories</Label>
                                        <Select onValueChange={(value) => setData('category_id', value)} defaultValue={data.category_id}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={String(category.id)}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.category_id && <div className="text-sm text-red-500">{errors.category_id}</div>}
                                    </div>
                                    <div>
                                        <Label className="mb-1 block">Transaction Date</Label>
                                        <Input type="datetime-local" className="mb-4" value={data.transaction_date} onChange={(e) => setData('transaction_date', e.target.value)} />
                                        {errors.transaction_date && <div className="text-sm text-red-500">{errors.transaction_date}</div>}
                                        {/* <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !data.transaction_date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {data.transaction_date instanceof Date
                                                        ? format(data.transaction_date, "d MMM yyyy")
                                                        : "Select date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.transaction_date instanceof Date ? data.transaction_date : undefined}
                                                    onSelect={handleDateSelect}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {errors.transaction_date && <div className="text-sm text-red-500">{errors.transaction_date}</div>} */}
                                    </div>
                                    <div>
                                        <Label className="mb-1 block">Type</Label>
                                        <Select onValueChange={(value) => setData('type', value)} defaultValue={data.type}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Type</SelectLabel>
                                                    <SelectItem value="income">
                                                        Income
                                                    </SelectItem>
                                                    <SelectItem value="expense">
                                                        Expense
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && <div className="text-sm text-red-500">{errors.type}</div>}
                                    </div>
                                    <div>
                                        <Label className="mb-1 block">Amount</Label>
                                        <Input
                                            type="text"
                                            className="mb-4"
                                            value={data.amount}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/,/g, '');
                                                const regex = /^\d*\.?\d{0,2}$/;

                                                if (rawValue === '' || regex.test(rawValue)) {
                                                    setData('amount', rawValue);
                                                }
                                            }}
                                            onBlur={() => {
                                                const rawValue = data.amount.replace(/,/g, '');
                                                const num = parseFloat(rawValue);
                                                if (!isNaN(num)) {
                                                    const formatted = num.toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    });
                                                    setData('amount', formatted);
                                                }
                                            }}
                                            onFocus={() => {
                                                // Remove formatting when user focuses to edit raw number
                                                const numeric = data.amount.replace(/,/g, '');
                                                setData('amount', numeric);
                                            }}
                                        />
                                        {errors.amount && <div className="text-sm text-red-500">{errors.amount}</div>}
                                    </div>
                                    <div>
                                        <Label className="mb-1 block">Description</Label>
                                        <Input type="text" className="mb-4" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                        {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={processing} className="mr-2 px-4 py-2">
                                    {processing ? 'Loading...' : 'Submit'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default TransactionForm;
