'use client';
import logo from '../../public/eksid.png';
import logo2 from '../../public/eksid2.png';
import ornament from '../../public/Ornament 13.png';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi2';
import { HiMenuAlt3 } from 'react-icons/hi';
import { GrClose, GrCubes } from 'react-icons/gr';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { FaMoneyBillWave, FaCubes } from 'react-icons/fa';
import { GiOilDrum } from 'react-icons/gi';
import Link from 'next/link';
import { BsBagFill } from 'react-icons/bs';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { BiChevronDown } from 'react-icons/bi';
import { MdKeyboardArrowUp } from 'react-icons/md';

export default function SideNavbarMdSm() {
	const [nav, setNav] = useState('close');
	const [loading, setLoading] = useState<string>('');
	const [dropdown, setDropdown] = useState(false);
	const router = usePathname();
	const route = useRouter();

	const Logout = async () => {
		try {
			setLoading('logoutLoading');
			const res = await axios.delete('https://fourtour.site/melinda/logout/');
			setLoading('');
			document.cookie = 'jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
			route.push('/');
		} catch (error) {}
	};

	return (
		<div
			className={`block lg:hidden relative ${
				router == '/' ? 'hidden' : ''
			}  z-10`}
		>
			<div className="top bg-[#03254C] absolute top-0 w-screen h-5"></div>
			<div
				className={`nav bg-[#03254C] h-screen fixed left-0 top-0 z-10 ${
					nav == 'open' ? 'w-60' : 'w-14'
				} duration-200`}
			>
				<Image
					src={logo}
					alt="yoi"
					className={` ${
						nav == 'open' ? '' : 'hidden'
					} lg:hidden block mt-4 mx-auto w-44`}
					onClick={(e) => {
						setNav('close');
					}}
				/>
				<Image
					src={logo2}
					alt="yoi"
					className={` ${
						nav == 'open' ? 'hidden' : ''
					} lg:hidden mx-auto mt-5 w-10`}
					onClick={(e) => {
						setNav('open');
					}}
				/>
				<div className="NavLink mx-auto mt-4">
					<div className={`dashboard text-center`}>
						<Link href={'/dashboard'}>
							<AiOutlineDashboard
								className={` ${
									nav == 'open' ? 'hidden' : 'block'
								} text-3xl p-1     ${
									router == '/dashboard' ? 'bg-[#0096D5]' : ''
								} mx-auto rounded-full text-white hover:bg-[#0096D5]`}
							/>
						</Link>

						<Link
							href={'/dashboard'}
							className={`dashboard flex items-center ${
								router == '/dashboard' ? 'bg-[#0096D5]' : ''
							} hover:bg-[#0096D5]
					         mt-5 text-white  rounded-full ${
											nav == 'open' ? 'block' : 'hidden'
										} mx-2`}
							onClick={(e) => {
								setNav('close');
							}}
						>
							<AiOutlineDashboard
								className={` ml-3 text-md ${
									nav == 'open' ? '' : 'ml-0'
								} text-3xl p-1`}
							/>
							<p
								className={`pl-3 text-sm font-semibold ${
									nav == 'open' ? ' ' : 'hidden'
								}`}
							>
								Dashboard
							</p>
						</Link>
					</div>

					<div className="user mt-4 relative">
						<Link href={'/users'}>
							<HiUserGroup
								className={` ${
									nav == 'open' ? 'hidden' : 'block'
								} text-3xl p-2     ${
									router == '/users' ? 'bg-[#0096D5]' : ''
								} mx-auto rounded-full text-white hover:bg-[#0096D5]`}
							/>
						</Link>

						<Link
							href={'/users'}
							className={`dashboard flex items-center ${
								router == '/users' ? 'bg-[#0096D5]' : ''
							} hover:bg-[#0096D5]
					 mt-5 text-white  rounded-full ${nav == 'open' ? 'block' : 'hidden'} mx-2`}
							onClick={(e) => {
								setNav('close');
							}}
						>
							<HiUserGroup
								className={` ml-3 text-md ${
									nav == 'open' ? '' : 'ml-0'
								} text-3xl p-1`}
							/>
							<p
								className={`font-semibold text-sm left-16 ${
									nav == 'open' ? '' : 'hidden'
								} duration-200 absolute`}
							>
								User Management
							</p>
						</Link>
					</div>

					<div className="transaksi mt-4 relative">
						<div className={``}>
							<FaMoneyBillWave
								className={` ${
									nav == 'open' ? 'hidden' : 'block'
								} text-3xl p-2     ${
									router == '/transaksi/penukaran' ||
									router == '/transaksi/penyetoran'
										? 'bg-[#0096D5]'
										: ''
								} mx-auto rounded-full text-white hover:bg-[#0096D5]`}
								onClick={(e) => {
									setNav('open'), setDropdown(true);
								}}
							/>
						</div>

						<div
							className={`dashboard flex items-center justify-between ${
								router == '/transaksi/penyetoran' ||
								router == '/transaksi/penukaran'
									? 'bg-[#0096D5]'
									: ''
							}  ${
								nav == 'open' ? 'block' : 'hidden'
							} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full mx-2`}
							onClick={(e) => {
								setDropdown(!dropdown);
							}}
						>
							<div className="right flex items-center">
								<FaMoneyBillWave className={` ml-3 text-md'}`} />
								<p className={`pl-3 text-sm font-semibold`}>Transaksi</p>
							</div>
							<BiChevronDown className={`${dropdown ? 'hidden' : 'block'}`} />
							<MdKeyboardArrowUp
								className={`${dropdown ? 'block' : 'hidden'}`}
							/>
						</div>
					</div>

					<div
						className={`dropdownData ${dropdown ? 'block' : 'hidden'} ${
							nav == 'open' ? '' : 'hidden'
						}`}
					>
						<div className="pl-6">
							<Link
								href={'/transaksi/penyetoran'}
								className={`dashboard flex items-center  ${
									router == '/transaksi/penyetoran' ? 'bg-[#0096D5]' : ''
								} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full `}
								onClick={(e) => {
									setNav('close');
								}}
							>
								<GiOilDrum className={` ml-3 text-md`} />
								<p className={`pl-3 text-sm font-semibold`}>
									Riwayat Penyetoran
								</p>
							</Link>
							<Link
								href={'/transaksi/penukaran'}
								className={`dashboard flex items-center  ${
									router == '/transaksi/penukaran' ? 'bg-[#0096D5]' : ''
								} hover:bg-[#0096D5] mt-5 text-white p-1 rounded-full`}
								onClick={(e) => {
									setNav('close');
								}}
							>
								<RiExchangeDollarLine className={` ml-3 text-md `} />
								<p className={`pl-3 text-sm font-semibold`}>
									Riwayat Penukaran
								</p>
							</Link>
						</div>
					</div>

					<div className="penyetoran mt-4">
						<Link href={'/penyetoran'}>
							<GiOilDrum
								className={` ${
									nav == 'open' ? 'hidden' : 'block'
								} text-3xl p-2     ${
									router == '/penyetoran' ? 'bg-[#0096D5]' : ''
								} mx-auto rounded-full text-white hover:bg-[#0096D5]`}
							/>
						</Link>

						<Link
							href={'/penyetoran'}
							className={`dashboard flex items-center ${
								router == '/penyetoran' ? 'bg-[#0096D5]' : ''
							} hover:bg-[#0096D5]
					 mt-5 text-white  rounded-full ${nav == 'open' ? 'block' : 'hidden'} mx-2`}
							onClick={(e) => {
								setNav('close');
							}}
						>
							<GiOilDrum
								className={` ml-3 text-md ${
									nav == 'open' ? '' : 'ml-0'
								} text-3xl p-1`}
							/>
							<p
								className={`pl-3 text-sm font-semibold ${
									nav == 'open' ? ' ' : 'hidden'
								}`}
							>
								Penyetoran
							</p>
						</Link>
					</div>

					<div className="penukaran mt-4">
						<Link href={'/penukaran'}>
							<RiExchangeDollarLine
								className={` ${
									nav == 'open' ? 'hidden' : 'block'
								} text-3xl p-2     ${
									router == '/penukaran' ? 'bg-[#0096D5]' : ''
								} mx-auto rounded-full text-white hover:bg-[#0096D5]`}
							/>
						</Link>

						<Link
							href={'/penukaran'}
							className={`dashboard flex items-center ${
								router == '/penukaran' ? 'bg-[#0096D5]' : ''
							} hover:bg-[#0096D5]
					 mt-5 text-white  rounded-full ${nav == 'open' ? 'block' : 'hidden'} mx-2`}
							onClick={(e) => {
								setNav('close');
							}}
						>
							<RiExchangeDollarLine
								className={` ml-3 text-md ${
									nav == 'open' ? '' : 'ml-0'
								} text-3xl p-1`}
							/>
							<p
								className={`pl-3 text-sm font-semibold ${
									nav == 'open' ? ' ' : 'hidden'
								}`}
							>
								Penukaran
							</p>
						</Link>
					</div>
					<div className="produk mt-4">
						<Link href={'/produk'}>
							<FaCubes
								className={` ${
									nav == 'open' ? 'hidden' : 'block'
								} text-3xl p-2 ${
									router == '/produk' ||
									router == '/produk/edit' ||
									router == '/produk/tambah' ||
									router?.length == 32 ||
									router?.length == 37
										? 'bg-[#0096D5]'
										: ''
								} mx-auto rounded-full text-white hover:bg-[#0096D5]`}
							/>
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
							} hover:bg-[#0096D5]
					 mt-5 text-white  rounded-full ${nav == 'open' ? 'block' : 'hidden'} mx-2`}
							onClick={(e) => {
								setNav('close');
							}}
						>
							<FaCubes
								className={` ml-3 text-md text-white ${
									nav == 'open' ? '' : 'ml-0'
								} text-3xl p-1`}
							/>
							<p
								className={`pl-3 text-sm font-semibold ${
									nav == 'open' ? ' ' : 'hidden'
								}`}
							>
								Produk
							</p>
						</Link>
					</div>
					<div className="Logout mt-4">
						<div
							onClick={(e) => {
								Logout();
							}}
						>
							<FiLogOut
								className={` ${
									nav == 'open' ? 'hidden' : 'block'
								} text-3xl p-2 mx-auto rounded-full text-white hover:bg-red-500`}
							/>
						</div>

						<div
							className={`dashboard flex items-center hover:bg-red-500
					 mt-5 text-white  rounded-full ${nav == 'open' ? 'block' : 'hidden'} ${
								loading == 'logoutLoading' ? 'bg-red-500' : ''
							} mx-2`}
							onClick={(e) => {
								Logout();
							}}
						>
							<FiLogOut
								className={` ml-3 text-md text-white ${
									nav == 'open' ? '' : 'ml-0'
								} text-3xl p-1`}
							/>
							<p
								className={`pl-3 text-sm font-semibold ${
									nav == 'open' ? ' ' : 'hidden'
								}`}
							>
								{loading == 'logoutLoading' ? 'Loading...' : 'Logout'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
