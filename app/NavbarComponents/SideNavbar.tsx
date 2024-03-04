'use client';
import logo from '../../public/eksid.png';
import logo2 from '../../public/inagri-Logo2.png';
import ornament from '../../public/Ornament 13.png';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi2';
import { FiLogOut } from 'react-icons/fi';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { FaMoneyBillWave, FaCubes } from 'react-icons/fa';
import { GiOilDrum } from 'react-icons/gi';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { GrCubes } from 'react-icons/gr';
import Link from 'next/link';
import { BsBagFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

export default function SideNavbar() {
	const router = usePathname();
	const route = useRouter();
	const [active, setActive] = useState('');
	const [loading, setLoading] = useState<boolean>(false);
	const [dropdown, setDropdown] = useState(false);

	const Logout = async () => {
		try {
			setLoading(true);
			// const res = await axios.delete('https://fourtour.site/melinda/logout/');
			// setLoading(false);
			document.cookie = 'jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
			route.push('/');
		} catch (error) {}
	};

	return (
		<div className="hidden lg:block">
			<nav
				className={`z-10 relative ${
					router == '/' || router == '/login' ? 'hidden' : ''
				}`}
			>
				<div
					className={`bg-[#03254C] w-60 p-5 h-screen fixed  lg:left-0 top-0  duration-200`}
				>
					<Image src={logo} alt="yoi" className={` block`} />

					<Link
						href={'/dashboard'}
						className={`dashboard flex items-center ${
							router == '/dashboard' ? 'bg-[#0096D5]' : ''
						} hover:bg-[#0096D5]
					 mt-5 text-white p-1 rounded-full`}
					>
						<AiOutlineDashboard className={` ml-3 text-md`} />
						<p className={`pl-3 text-sm font-semibold`}>Dashboard</p>
					</Link>
					<Link
						href={'/users'}
						className={`dashboard flex items-center ${
							router == '/users' ? 'bg-[#0096D5]' : ''
						}
						hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full`}
					>
						<HiUserGroup className={` ml-3 text-md `} />
						<p className={`pl-3 text-sm font-semibold`}>User Management</p>
					</Link>

					<div
						className={`dashboard flex items-center justify-between ${
							router == '/transaksi/penyetoran' ||
							router == '/transaksi/penukaran'
								? 'bg-[#0096D5]'
								: ''
						} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full`}
						onClick={(e) => {
							setDropdown(!dropdown);
						}}
					>
						<div className="right flex items-center">
							<FaMoneyBillWave className={` ml-3 text-md'}`} />
							<p className={`pl-3 text-sm font-semibold`}>Transaksi</p>
						</div>
						<BiChevronDown className={`${dropdown ? 'hidden' : 'block'}`} />
						<MdKeyboardArrowUp className={`${dropdown ? 'block' : 'hidden'}`} />
					</div>

					<div className={`dropdownData ${dropdown ? 'block' : 'hidden'}`}>
						<div className="pl-6">
							<Link
								href={'/transaksi/penyetoran'}
								className={`dashboard flex items-center  ${
									router == '/transaksi/penyetoran' ? 'bg-[#0096D5]' : ''
								} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full `}
							>
								<GiOilDrum className={` ml-3 text-md`} />
								<p className={`pl-1	 text-sm font-semibold`}>
									Pembelian IPL/PAL
								</p>
							</Link>
							<Link
								href={'/transaksi/penukaran'}
								className={`dashboard flex items-center  ${
									router == '/transaksi/penukaran' ? 'bg-[#0096D5]' : ''
								} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full`}
							>
								<RiExchangeDollarLine className={` ml-3 text-md `} />
								<p className={`pl-1 text-sm font-semibold`}>
									Pembelian Sedekah
								</p>
							</Link>
							<Link
								href={'/transaksi/penukaran'}
								className={`dashboard flex items-center  ${
									router == '/transaksi/penukaran' ? 'bg-[#0096D5]' : ''
								} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full`}
							>
								<RiExchangeDollarLine className={` ml-3 text-md `} />
								<p className={`pl-1 text-sm font-semibold`}>
									Pembelian Voucher
								</p>
							</Link>
						</div>
					</div>

					<Link
						href={'/penyetoran'}
						className={`dashboard flex items-center ${
							router == '/penyetoran' ? 'bg-[#0096D5]' : ''
						} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full`}
					>
						<GiOilDrum className={` ml-3 text-md`} />
						<p className={`pl-3 text-sm font-semibold`}>Penyetoran</p>
					</Link>
					<Link
						href={'/penukaran'}
						className={`dashboard flex items-center ${
							router == '/penukaran' ? 'bg-[#0096D5]' : ''
						} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full`}
					>
						<RiExchangeDollarLine className={` ml-3 text-md `} />
						<p className={`pl-3 text-sm font-semibold`}>Pickup Request</p>
					</Link>
					<Link
						href={'/produk'}
						className={`dashboard flex items-center ${
							router == '/produk' ||
							router == '/produk/edit' ||
							router == '/produk/tambah' ||
							router?.length == 32 ||
							router?.length == 37
								? 'bg-[#0096D5]'
								: ''
						} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full`}
					>
						<FaCubes className={` ml-3 text-md `} />
						<p className={`pl-3 text-sm font-semibold`}>Voucher</p>
					</Link>

					{/* <Image
						src={ornament}
						alt="yoi"
						className=" absolute bottom-0 left-0 w-[150px] md:block"
					/> */}
					<div
						className={`dashboard flex items-center hover:bg-red-500 hover:text-white text-red-400 duration-200 mt-5  p-1 rounded-full cursor-pointer`}
						onClick={(e) => {
							Logout();
						}}
					>
						<FiLogOut className={` ml-3 text-md  font-bold`} />
						<p className={`pl-3 text-sm  font-bold`}>
							{loading ? 'Loading...' : 'Logout'}
						</p>
					</div>
				</div>
			</nav>
		</div>
	);
}
