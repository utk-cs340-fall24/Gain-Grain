import { NextResponse } from 'next/server';
import { searchAccounts } from '../../../utils/userModel';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');

        if(!query) {
            return NextResponse.json({ success: false, message: 'Query parameter is missing' }, { status: 400 });
        }

        const accounts = await searchAccounts(query);

        if(accounts.success) {
            return NextResponse.json({ success: true, accounts: accounts.accounts });
        } else {
            return NextResponse.json({ success: true, message: accounts.message });
        }
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return NextResponse.json({ success: false, message: 'Error fetching accounts' }, { status: 500 });
    }
}