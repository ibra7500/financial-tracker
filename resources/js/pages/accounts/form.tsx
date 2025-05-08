// import { Button } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: '/accounts',
    },
    {
        title: 'Create',
        href: '/accounts/create',
    },
];

interface Account {
    id?: number;
    name: string;
    balance: string;
}

interface Props {
    account?: Account;
    mode: 'create' | 'edit';
    [key: string]: unknown;
}

const AccountForm = () => {
    const { account, mode } = usePage<Props>().props;

    const { data, setData, post, put, processing, errors } = useForm({
        name: account?.name ?? '',
        balance: account?.balance ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (mode === 'create') {
            post(`/accounts`, {
                preserveScroll: true,
            });
        } else {
            if (account) {
                put(`/accounts/${account.id}`, {
                    preserveScroll: true,
                });
            }
        }
    };

    const pageTitle = mode === 'edit' ? 'Edit Account' : 'Create Account';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accounts" />
            <div className="flex flex-1 flex-col flex-wrap gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <Card>
                        <CardHeader>
                            <CardTitle>{pageTitle}</CardTitle>
                        </CardHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                                    <div>
                                        <Label className="mb-1 block">Account</Label>
                                        <Input type="text" className="mb-4" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                        {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <Label className="mb-1 block">Balance</Label>
                                        <Input
                                            type="text"
                                            className="mb-4"
                                            value={data.balance}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/,/g, '');
                                                const regex = /^\d*\.?\d{0,2}$/;

                                                if (rawValue === '' || regex.test(rawValue)) {
                                                    setData('balance', rawValue);
                                                }
                                            }}
                                            onBlur={() => {
                                                const rawValue = data.balance.replace(/,/g, '');
                                                const num = parseFloat(rawValue);
                                                if (!isNaN(num)) {
                                                    const formatted = num.toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    });
                                                    setData('balance', formatted);
                                                }
                                            }}
                                            onFocus={() => {
                                                // Remove formatting when user focuses to edit raw number
                                                const numeric = data.balance.replace(/,/g, '');
                                                setData('balance', numeric);
                                            }}
                                        />
                                        {errors.balance && <div className="text-sm text-red-500">{errors.balance}</div>}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={processing} className="mr-2 px-4 py-2">
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default AccountForm;
