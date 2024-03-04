'use client';
import { useState, Fragment, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose, AiOutlineEye } from 'react-icons/ai';
import { BsTrash, BsPlus } from 'react-icons/bs';
import { RiPencilLine } from 'react-icons/ri';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import Router from 'next/Router';
import cookies from 'universal-cookie';
import {
	ProdukInterface,
	UserInterface,
} from '@/utils/interface/DataInterface';
import styles from '../page.module.css';
import Link from 'next/link';
import { IoMdRefresh } from 'react-icons/io';
import moment from 'moment';

export default function ProdukComponent() {
	const [produk, setProduk] = useState<ProdukInterface>({
		count: 0,
		results: [],
		next: '',
		previous: '',
	});
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState({ name: '', id: '' });
	const [searchUser, setSearch] = useState('');
	const [error, setError] = useState('');
	const [waktuData, setWaktuData] = useState('baru');
	const [jmlData, setJmlData] = useState(5);
	const [totalData, setTotalData] = useState(0);
	const nextPage = produk.next;
	const prevPage = produk.previous;
	const [startDate, setStartDate] = useState<string>(
		moment(new Date()).format('YYYY-MM-DD')
	);
	const [endDate, setEndDate] = useState<string>(
		moment(startDate).add(1, 'days').format('YYYY-MM-DD')
	);
	const Router = useRouter();

	const getProdukDatas = async (uri: string) => {
		try {
			if (!uri) return;
			setLoading(true);
			const res = await axios.get(uri);
			setLoading(false);
			setProduk(res.data);
		} catch (error) {
			setError('error');
		}
	};

	const deleteProduk = async (id: any, e: any) => {
		try {
			e.preventDefault();
			const res = await axios.delete(
				`https://fourtour.site/melinda/produk/0/${id}`,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						jwt: getCookie('jwt'),
					},
				}
			);
			setModal({ name: '', id: '' });
			getProdukDatas('https://fourtour.site/melinda/produk/0?limit=5&page=1');
		} catch (errors) {
			setError('error');
		}
	};

	const searchProdukSubmit = (e: any) => {
		e.preventDefault();
		getProdukDatas(
			`https://fourtour.site/melinda/produk/0?search=${searchUser}`
		);
	};

	const searchFromDate = (e: any) => {
		e.preventDefault();
		const cek = getProdukDatas(
			`https://fourtour.site/melinda/produk/0?start=${startDate}&end=${endDate}`
		);
	};

	const resetDate = () => {
		setStartDate('');
		setEndDate('');
		getProdukDatas('https://fourtour.site/melinda/produk/0?limit=5&page=1');
	};

	function getCookie(name: string) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	const checkAuth = () => {
		const cookie = new cookies();
		const getCookie = cookie.get('jwt');
		if (!getCookie) {
			console.log('Belum Login');
			Router.push('/');
		} else {
			console.log('sudah login');
		}
	};

	useEffect(() => {
		getProdukDatas('https://fourtour.site/melinda/produk/0?limit=5&page=1');
	}, []);

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<div className="pr-0 z-0 pb-3 lg:pb-10 overflow-x-hidden lg:overflow-x-auto">
			{/* MODAL  */}
			<div
				className={` modal fixed ${
					modal.id != '' ? '' : ' opacity-0 z-0'
				} bg-[#00000040] h-screen w-full z-10 flex justify-center items-center duration-200`}
			>
				<div
					className={`bg-white rounded pt-3 pl-8 pr-8 pb-5 ${
						modal.id != '' ? '' : ' scale-0'
					} duration-200`}
				>
					<div className="flex w-full justify-center items-center gap-5 relative">
						<h1 className="text-[#0096D5] text-3xl">Hapus</h1>
						<AiOutlineClose
							className="text-[#0096D5] text-xl absolute right-0 top-0 cursor-pointer"
							onClick={(e) => setModal({ name: '', id: '' })}
						/>
					</div>
					<p className=" w-1/2 mx-auto text-center mt-10 text-sm text-[#00000080]">
						Apakah kamu yakin akan menghapus
						<span className=" text-[#0096D5]"> {modal.name}</span>
					</p>
					<form action="" onSubmit={(e) => deleteProduk(modal.id, e)}>
						<button
							className="bg-[#0096D5] w-full rounded-md text-white mt-10 hover:scale-95 duration-200"
							type="submit"
						>
							Iya
						</button>
					</form>
				</div>
			</div>
			{/* MODAL END */}

			<h1 className="text-[#0096D5] pl-16 lg:pl-72 pt-7 font-bold text-xl md:text-3xl">
				Voucher Osmosis
			</h1>

			<div
				className={` ml-10 md:ml-10 lg:ml-72 mt-2 lg:mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-white relative rounded shadow-none lg:shadow-3xl`}
			>
				<div className="wrapper flex justify-between items-center ">
					<div className=" py-2 pl-5 md:pl-7 pr-10 md:pr-4 lg:p-5 flex gap-2 items-center justify-between lg:justify-start w-full lg:w-auto ">
						<form
							action=""
							onSubmit={(e) => {
								searchFromDate(e);
							}}
							className="flex gap-2 items-center justify-between lg:justify-start overflow-auto w-full "
						>
							<div className="block md:flex items-center gap-3 w-full md:w-auto">
								<div className="tanggal">
									<input
										type="date"
										name=""
										id=""
										required
										title="date"
										className=" rounded-md text-[#0096D5] border-[#0096D5] border-[1px] px-3 w-full md:w-auto"
										onChange={(e) => {
											setStartDate(e.target.value);
										}}
										value={startDate}
									/>
								</div>
								<div className="tanggal">
									<input
										type="date"
										name=""
										id=""
										required
										title="date"
										className=" rounded-md text-[#0096D5] border-[#0096D5] border-[1px] px-3 w-full md:w-auto mt-3 md:mt-0"
										onChange={(e) => {
											setEndDate(e.target.value);
										}}
										value={endDate}
									/>
								</div>
							</div>
							<div className="block md:flex gap-3 items-center">
								<button
									className="bg-[#0096D5] text-white rounded-md text-[26px] cursor-pointer "
									title="Search"
								>
									<AiOutlineSearch />
								</button>
								<IoMdRefresh
									className="bg-[#0096D5] text-white rounded-md text-[26px] cursor-pointer mt-2 md:mt-0"
									onClick={(e) => {
										resetDate();
									}}
								/>
							</div>
						</form>
					</div>

					<div className="flex items-center">
						<form
							action=""
							className="relative pl-5 pr-10 lg:pl-0 lg:pr-0 hidden lg:block"
							onSubmit={(e) => {
								searchProdukSubmit(e);
							}}
						>
							<input
								className="search none lg:flex items-center border-[#0096D5] border-[1px] mr-6 gap-2 md:w-60 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7 placeholder:text-sm"
								placeholder="Search"
								onChange={(e) => {
									setSearch(e.target.value);
								}}
								value={searchUser}
							/>
							<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-[6px] left-7 lg:left-3 duration-200 peer-placeholder-shown:font-bold z-0 text-sm" />
						</form>
						<Link href={'/produk/tambah'} className=" hidden lg:block">
							<div className="flex items-center bg-[#0096D5] text-white rounded-md p-1 lg:mr-5 hover:scale-95 duration-200">
								<BsPlus className=" text-lg" />
								<h1 className=" text-xs">Tambah Voucher</h1>
							</div>
						</Link>
					</div>
				</div>

				<Link
					href={'/produk/tambah'}
					className="block lg:hidden pr-10 md:pr-4 lg:pr-10 pl-5 md:pl-7 lg:pl-5 mt-2"
				>
					<div className="flex items-center bg-[#0096D5] text-white rounded-md p-1 lg:mr-5 hover:scale-95 duration-200 w-full m-auto">
						<BsPlus className=" text-lg" />
						<h1 className=" text-xs">Tambah Voucer</h1>
					</div>
				</Link>

				{/* FORM MOBILE */}
				<form
					action=""
					className="relative pl-5 md:pl-7 pr-10 md:pr-4 lg:pl-0 lg:pr-0 lg:hidden"
					onSubmit={(e) => {
						searchProdukSubmit(e);
					}}
				>
					<input
						className="search flex items-center border-[#0096D5] border-[1px] p-1 gap-2 w-full rounded-lg bg-[#D1F5FF] placeholder:font-semibold peer z-20 pl-7 my-4"
						placeholder="Search"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						value={searchUser}
					/>
					<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-7 md:left-9 lg:left-3 duration-200 peer-placeholder-shown:font-bold z-0" />
				</form>
				{/* FORM MOBILE END*/}

				{/* TABLE PRODUK /> */}
				<div className="pr-10 md:pr-4 md:pl-2">
					<div className="w-full pl-5 lg:px-3">
						<div className="overflow-auto">
							<div className="btn-group grid grid-cols-2"></div>
							<table className="w-full">
								<thead className="bg-[#0096D5] rounded text-white">
									<tr>
										<td className="rounded-bl-lg rounded-tl-lg bg-[#0096D5] p-1 pl-3">
											ID Produk
										</td>
										<td className="px-10">Nama Voucher</td>
										<td className="px-10 " colSpan={2}>
											Jenis
										</td>
										<td className="px-10 ">Stock</td>
										<td className="px-10 ">Harga</td>
										<td className="px-10 ">Kategori</td>
										<td
											className="rounded-tr-lg rounded-br-lg bg-[#0096D5] pr-2 pl-5"
											// onClick={modalTrigger}
										>
											Aksi
										</td>
									</tr>
								</thead>
								<tbody className={`${loading ? ' ' : 'hidden'}`}>
									<tr>
										<td className="py-5 px-3 border-[#D9D9D9] border-b-2  cursor-pointer">
											Loading...
										</td>
										<td className="px-10 py-5  border-[#D9D9D9] border-b-2  cursor-pointer ">
											Loading...
										</td>
										<td
											className="px-10 py-5 border-[#D9D9D9] border-b-2  cursor-pointer "
											colSpan={2}
										>
											Loading...
										</td>
										<td className="px-10 py-5 border-[#D9D9D9] border-b-2  cursor-pointer ">
											Loading...
										</td>
										<td className="px-10 py-5 border-[#D9D9D9] border-b-2  cursor-pointer ">
											Loading...
										</td>
										<td className="px-10 py-5 border-[#D9D9D9] border-b-2  cursor-pointer ">
											Loading...
										</td>
										<td className="px-10 py-5 pr-3 border-[#D9D9D9] border-b-2  cursor-pointer pl-5 lg:pl-0">
											Loading...
										</td>
									</tr>
								</tbody>
								<tbody className={`${loading ? 'hidden' : ''}`}>
									{produk['results'].map((datas: any, key: any) => {
										return (
											<tr key={key}>
												<td className="pt-5 px-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas._id}
												</td>
												<td className="px-10 pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer ">
													{datas.nama}
												</td>
												<td
													className="px-10 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer "
													colSpan={2}
												>
													{datas.bobot ? datas.bobot : '0'}
												</td>
												<td className="px-10 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer ">
													{datas.stok}
												</td>
												<td className="px-10 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer ">
													{datas.harga} Poin
												</td>
												<td className="px-10 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer ">
													{datas.kategori}
												</td>
												<td className="px-10 pr-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer pl-5 lg:pl-0">
													<div className="flex gap-2">
														<Link href={`/produk/${datas._id}`}>
															<div
																// onClick={(e) => deleteProduk(datas.id)}
																className="p-1 border-2 border-[#0096D5] text-[#0096D5]  rounded text-center hover:scale-95 duration-200"
															>
																<AiOutlineEye />
															</div>
														</Link>
														<Link href={`/produk/edit/${datas._id}`}>
															<div
																// onClick={(e) => deleteProduk(datas.id)}
																className="p-1 border-2 border-[#38E1AB] text-[#38E1AB]  rounded text-center hover:scale-95 duration-200"
															>
																<RiPencilLine />
															</div>
														</Link>

														<div
															// onClick={(e) => deleteProduk(datas.id)}
															className="p-1 border-2 border-[red] text-[red]  rounded text-center hover:scale-95 duration-200"
															onClick={(e) =>
																setModal({ name: datas.nama, id: datas._id })
															}
														>
															<BsTrash />
														</div>
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div className="footer flex justify-between items-center mt-5 pb-5 p-1  overflow-hidden">
							{/* <h1 className="font-semibold text-sm md:text-lg">
								Showing {selected} data
							</h1> */}
							<h1 className="font-semibold text-sm md:text-lg">
								Total data: {produk.count}
							</h1>
							<div className="flex gap-2">
								<button
									className={`btn border-2 border-[#0096D5] p-2 rounded-md hover:scale-95 duration-200 ${
										prevPage == null ? 'hidden' : ''
									}`}
									onClick={(e) => getProdukDatas(produk.previous)}
								>
									<p className="text-[#0096D5] text-sm md:text-md px-3">
										Previous
									</p>
								</button>

								<button
									className={` btn border-2 border-[#D1F5FF] p-2 rounded-md cursor-not-allowed ${
										prevPage == null ? '' : 'hidden'
									}`}
									onClick={(e) => getProdukDatas(produk.previous)}
									disabled
								>
									<p className="text-[#D1F5FF] text-sm md:text-md px-3">
										Previous
									</p>
								</button>

								{/* NEXT PAGE  */}
								<button
									className={`btn border-2 border-[#0096D5] p-2 rounded-md hover:scale-95 duration-200 ${
										nextPage == null ? 'hidden' : ''
									}`}
									onClick={(e) => {
										getProdukDatas(produk.next);
									}}
								>
									<p className="text-[#0096D5] text-sm md:text-md px-3">Next</p>
								</button>

								<button
									className={` btn border-2 border-[#D1F5FF] p-2 rounded-md cursor-not-allowed ${
										nextPage == null ? '' : 'hidden'
									}`}
									disabled
									onClick={(e) => {
										getProdukDatas(produk.next);
									}}
								>
									<p className="text-[#D1F5FF] text-sm md:text-md px-3">Next</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
