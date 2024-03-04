import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest, res: NextResponse) {
	const response = NextResponse.next();
	const token = req.cookies;
	const cekPath = req.nextUrl.pathname;

	if (
		cekPath.startsWith('/dashboard') ||
		cekPath.startsWith('/users') ||
		cekPath.startsWith('/transaksi/penyetoran') ||
		cekPath.startsWith('/transaksi/penukaran') ||
		cekPath.startsWith('/penyetoran') ||
		cekPath.startsWith('/penukaran') ||
		cekPath.startsWith('/produk') ||
		cekPath.startsWith('/produk/tambah')
	) {
		if (!token.get('jwt')) {
			return NextResponse.redirect(new URL('/', req.url));
		}
	}

	if (cekPath.endsWith('/')) {
		if (token.get('jwt')) {
			return NextResponse.redirect(new URL('/dashboard', req.url));
		}
	}
}
