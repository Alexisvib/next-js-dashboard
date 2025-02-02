import Form from '@ui/invoices/edit-form';
import Breadcrumbs from '@ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
 
export default async function Page(props: { params: Promise<{ id: string }> })  {
  
  const params = await props.params;

  const [ invoice, customers ] = await Promise.all([
    fetchInvoiceById(params.id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    return notFound();
  }
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} invoice={ invoice }/>
    </main>
  );
}