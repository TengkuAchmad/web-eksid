import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import LoginPage from './login/page';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main>
			<LoginPage />
		</main>
	);
}

