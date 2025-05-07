import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';

type CategoriesProps = {
    categories: Array<{
        id: number;
        name: string;
        type: string;
    }>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Categories({ categories }: CategoriesProps) {

    const { delete: destroy } = useForm();

    function handleDelete(id: number) {
        if (confirm('Yakin ingin menghapus kategori ini?')) {
            destroy(`/destroy/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex flex-1 flex-col flex-wrap gap-4 rounded-xl p-4">
                <div className="mb-4 flex justify-between">
                    <Button asChild>
                        <a href="/categories/create">New Categories</a>
                    </Button>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <Table className="px-4">
                        {categories && categories.length === 0 && <TableCaption>No categories found.</TableCaption>}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Name</TableHead>
                                <TableHead className="text-center">Type</TableHead>
                                <TableHead clgiassName="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.name}>
                                    <TableCell className="font-medium text-center">{category.name}</TableCell>
                                    <TableCell className="text-center">{capitalizeFirstLetter(category.type)}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <div className="flex justify-center space-x-2">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link href={`/categories/${category.id}/edit`}>
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
                                                            onClick={() => handleDelete(category.id)}
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
