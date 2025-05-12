<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $transactions = Transaction::with(['account', 'category'])->get();
        // dd($transactions);

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('transactions/form', [
            'mode' => 'create',
            'accounts' => Account::all(),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // dd($request->all());
        $validated = $request->validate([
            'account_id' => 'required|exists:accounts,id',
            'category_id' => 'required|exists:categories,id',
            'transaction_date' => 'required',
            'type' => 'required|string',
            'amount' => 'required',
            'description' => 'nullable|string',
        ]);

        $transaction = new Transaction();
        $transaction->account_id = $validated['account_id'];
        $transaction->category_id = $validated['category_id'];
        $transaction->transaction_date = $validated['transaction_date'];
        $transaction->type = $validated['type'];
        $amount = str_replace(',', '', $validated['amount']);
        $transaction->amount = $amount;
        $transaction->description = $validated['description'];
        $transaction->save();

        // Change balance on account
        $account = Account::find($transaction->account_id);
        if ($transaction->type === 'income') {
            $account->balance += $transaction->amount;
        }
        else if ($transaction->type === 'expense') {
            $account->balance -= $transaction->amount;
        }

        $account->save();

        return redirect()->route('transactions.index')->with('success', 'Transaction created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $transaction = Transaction::findOrFail($id);
        return Inertia::render('transactions/form', [
            'mode' => 'edit',
            'transaction' => $transaction,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
