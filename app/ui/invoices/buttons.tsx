'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { useTransition } from 'react';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form
      action={() => {
        startTransition(() => {
          deleteInvoiceWithId();
        });
      }}
    >
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md border p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Delete</span>
        {isPending ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
        ) : (
          <TrashIcon className="w-5" />
        )}
      </button>
    </form>
  );
}
