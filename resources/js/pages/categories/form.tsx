// import { Button } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
    {
        title: 'Create',
        href: '/categories/create',
    },
];

interface Category {
    id?: number;
    name: string;
    type: string;
}

interface Props {
    category?: Category;
    mode: 'create' | 'edit';
    [key: string]: any;
}

const CategoryForm = () => {
    const { category, mode } = usePage<Props>().props;

    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name ?? '',
        type: category?.type ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (mode === 'create') {
            post(`/categories`, {
                preserveScroll: true,
            });
        } else {
            put(`/categories/${category.id}`, {
                preserveScroll: true,
            });
        }
    };

    const pageTitle = mode === 'edit' ? 'Edit Category' : 'Create Category';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
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
                                        <Label className="mb-1 block">Category</Label>
                                        <Input
                                            type="text"
                                            className="mb-4"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <Label className="mb-1 block">Type</Label>
                                        <Select onValueChange={(value) => setData('type', value)} defaultValue={data.type}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Type</SelectLabel>
                                                    <SelectItem value="expense">Expense</SelectItem>
                                                    <SelectItem value="income">Income</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && <div className="text-sm text-red-500">{errors.type}</div>}
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

export default CategoryForm;
