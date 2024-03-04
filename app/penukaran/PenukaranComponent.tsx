'use client';
import { useState, Fragment, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PenukaranInterface } from '@/utils/interface/DataInterface';
import styles from '../page.module.css';
import { IoMdRefresh } from 'react-icons/io';
import moment from 'moment';

export default function UserManagementComponent() {
	const [penukaranDatas, setPenukaranDatas] = useState<PenukaranInterface>({
		count: 0,
		results: [],
		next: '',
		previous: '',
	});
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState({
		name: '',
		code: '',
		produk: '',
		biaya: '',
		id: '',
	});
	const [searchUser, setSearch] = useState('');
	const [error, setError] = useState('');
	const [startDate, setStartDate] = useState<string>(
		moment(new Date()).format('YYYY-MM-DD')
	);
	const [endDate, setEndDate] = useState<string>(
		moment(startDate).add(1, 'days').format('YYYY-MM-DD')
	);
	const nextPage = penukaranDatas.next;
	const prevPage = penukaranDatas.previous;
	const router = useRouter();

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

	const getPenukaranDatas = async (uri: any) => {
		try {
			if (!uri) return;
			setLoading(true);
			// setCurrentPage(uri);
			const res = await axios.get(uri, {
				headers: {
					'Content-Type': 'multipart/form-data',
					jwt: getCookie('jwt'),
				},
			});
			setLoading(false);
			setPenukaranDatas(res.data);
			setError('berhasil');
		} catch (error) {
			setError('error');
		}
	};

	const verifyPenukaran = async (code: any) => {
		const res = await axios.get(
			`https://fourtour.site/melinda/produk/penukaran/${code}`,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					jwt: getCookie('jwt'),
				},
			}
		);
		getPenukaranDatas(
			'https://fourtour.site/melinda/produk/penukaran?status=menunggu'
		);
	};

	const searchUserSubmit = (e: any) => {
		e.preventDefault();
		getPenukaranDatas(
			`https://fourtour.site/melinda/produk/penukaran?status=menunggu&search=${searchUser}`
		);
	};

	const searchFromDate = (e: any) => {
		e.preventDefault();
		const cek = getPenukaranDatas(
			`https://fourtour.site/melinda/produk/penukaran?status=menunggu&created__gt=${startDate}&created__lt=${endDate}`
		);
	};

	const resetDate = () => {
		setStartDate('');
		setEndDate('');
		getPenukaranDatas(
			'https://fourtour.site/melinda/produk/penukaran?status=menunggu'
		);
	};

	const checkAuth = () => {
		const cookie = new cookies();
		const getCookie = cookie.get('jwt');
		if (!getCookie) {
			console.log('Sudah Login');
			router.push('/');
		} else {
			console.log('sudah login');
		}
	};

	useEffect(() => {
		checkAuth(),
			getPenukaranDatas(
				'https://fourtour.site/melinda/produk/penukaran?status=menunggu'
			);
	}, []);

	return (
		<div className="pr-0 z-0 pb-3 lg:pb-10 overflow-x-hidden lg:overflow-x-auto">
			{/* MODAL  */}
			<div
				className={` modal fixed ${
					modal.code != '' ? '' : ' opacity-0 z-0'
				} bg-[#00000040] h-screen w-full z-10 flex justify-center items-center duration-200`}
			>
				<div
					className={`bg-white rounded pt-3 pl-2 pr-2 pb-5 ${
						modal.code != '' ? '' : ' scale-0'
					} duration-200`}
				>
					<div className="flex w-full justify-center items-center gap-5 relative">
						<h1 className="text-[#0096D5] text-3xl pt-5"> Verifikasi </h1>
						<AiOutlineClose
							className="text-[#0096D5] text-xl absolute right-0 top-0 cursor-pointer"
							onClick={(e) =>
								setModal({ name: '', code: '', produk: '', biaya: '', id: '' })
							}
						/>
					</div>
					<p className=" w-1/2 mx-auto text-center mt-10 text-sm text-[#00000080]">
						User <span className="text-[#0096D5]">{modal.name}</span> akan
						menukar
						<span className="text-[#0096D5]"> {modal.produk}</span> dengan{' '}
						<span className="text-[#0096D5]"> {modal.biaya} </span>
						poin
						{/* <span className=" text-[#0096D5]"> {modal.name}</span> */}
					</p>
					<button
						className="bg-[#0096D5] w-full rounded-md text-white mt-10"
						onClick={(e) => {
							verifyPenukaran(modal.code);
							setModal({ name: '', code: '', produk: '', biaya: '', id: '' });
						}}
					>
						Iya
					</button>
				</div>
			</div>
			{/* MODAL END  */}
			<h1
				className={`${
					error == 'error' ? '' : 'hidden'
				} border-[red] text-[red] border-2 p-1 absolute right-28 top-10 rounded-md`}
			>
				Something Went Wrong
			</h1>
			;
			<h1 className="text-[#0096D5] pl-16 lg:pl-72 pt-0 font-bold text-xl md:text-3xl">
				Pickup Request
			</h1>
			<div
				className={`ml-10 md:ml-10 lg:ml-72 mt-2 lg:mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-white relative rounded shadow-none lg:shadow-3xl`}
			>
				<div className="wrapper flex justify-between items-center">
					<div className=" py-2 pl-5 md:pl-7 pr-10 md:pr-4 lg:p-5 flex gap-5 items-center justify-between lg:justify-start w-full lg:w-auto ">
						{/* <div className="jmlData">
							<select
								name=""
								title="jmlData"
								id=""
								value={selected}
								className="bg-[#0096D5] rounded-md outline-none text-white p-[2px] mt-[3px] cursor-pointer"
								onChange={(e) => {
									setSelected(parseInt(e.target.value));
									{
										waktuData == 'baru'
													getPenukaranDatas(
														`https://fadhli.pythonanywhere.com/user/?limit=${e.target.value}`
														// `https://fourtour.site/melinda/produk/0`
													);
											  }, 100)
											: setTimeout(() => {
													getPenukaranDatas(
														`https://fadhli.pythonanywhere.com/user/?ordering=createdAt&limit=${e.target.value}`
														// `https://fourtour.site/melinda/produk/0`
													);
											  }, 100);
									}
								}}
							>
								<option
									value="5"
									className=" cursor-pointer"
									onClick={() => {
										setJmlData(5);
									}}
								>
									5
								</option>
								<option
									value="10"
									className=" cursor-pointer"
									onClick={() => {
										setJmlData(10);
									}}
								>
									10
								</option>
							</select>
						</div> */}
						<form
							action=""
							onSubmit={(e) => {
								searchFromDate(e);
							}}
							className=" flex gap-2 w-full md:w-auto items-center justify-between lg:justify-start overflow-auto"
						>
							<div className=" w-full md:w-auto block md:flex md:gap-3 items-center">
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
										className=" rounded-md text-[#0096D5] border-[#0096D5] border-[1px] px-3 mt-3 w-full md:w-auto md:mt-0"
										onChange={(e) => {
											setEndDate(e.target.value);
										}}
										value={endDate}
									/>
								</div>
							</div>
							<div className="block md:flex md:gap-3 items-center">
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
					<form
						action=""
						className="relative pl-5 pr-10 lg:pl-0 lg:pr-0 hidden lg:block"
						onSubmit={(e) => {
							searchUserSubmit(e);
						}}
					>
						<input
							className="search none lg:flex items-center border-[#0096D5] border-[1px] mr-6 p-1 gap-2 md:w-60 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7 "
							placeholder="Search"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							value={searchUser}
						/>
						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-1 duration-200 peer-placeholder-shown:font-bold z-0" />
					</form>
				</div>

				{/* FORM MOBILE */}
				<form
					action=""
					className="relative pl-6 pr-10 md:pr-4 lg:pr-0 lg:hidden"
					onSubmit={(e) => {
						searchUserSubmit(e);
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
					<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-7 lg:left-3 duration-200 peer-placeholder-shown:font-bold z-0" />
				</form>
				{/* FORM MOBILE END*/}

				{/* Table Penukaran */}
				<div className="pr-10 md:pr-4 md:pl-2">
					<div className="w-full pl-5 lg:px-3">
						<div className="overflow-auto">
							<div className="btn-group grid grid-cols-2"></div>
							<table className="w-full">
								<thead className="bg-[#0096D5] rounded text-white">
									<tr>
										<td className="rounded-bl-lg rounded-tl-lg bg-[#0096D5] p-1 pl-3">
											Nama
										</td>
										<td className="px-5 ">Email</td>
										<td className="px-5 ">Jadwal</td>
										<td className="px-5 ">Alamat</td>
										<td
											className="rounded-tr-lg rounded-br-lg bg-[#0096D5] pr-2"
											// onClick={modalTrigger}
										>
											Aksi
										</td>
									</tr>
								</thead>
								<tbody className={`${loading ? '' : 'hidden'}`}>
									<tr>
										<td className="pt-5 px-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
									</tr>
								</tbody>
								<tbody className={`${loading ? 'hidden' : ''}`}>
									{penukaranDatas['results'].map((datas: any, key: any) => {
										return (
											<tr key={key}>
												<td className="pt-5 px-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.nama}
												</td>
												<td className="pt-5 px-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.email}
												</td>
												<td className="pt-5 px-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.produk}
												</td>
												<td className="pt-5 px-10 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.jumlah}
												</td>
												<td
													className="pt-5 pr-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer"
													onClick={(e) =>
														setModal({
															name: datas.nama,
															code: datas.kode,
															produk: datas.produk,
															biaya: datas.biaya,
															id: datas.id_pengguna,
														})
													}
												>
													<div
														// onClick={(e) => deleteUser(datas.id)}
														className="p-1 border-2 border-[red] text-[red] rounded text-center hover:scale-95 duration-200"
													>
														Verifikasi
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>

						<div className="footer flex justify-between mt-5 pb-5 p-1 items-center">
							{/* <h1 className="font-semibold">
							Showing {selected} data
						</h1> */}
							<h1 className="font-semibold">
								Total Data: {penukaranDatas.count}
							</h1>
							<div className="flex gap-2">
								<button
									className={`btn border-2 border-[#0096D5] p-2 rounded-md hover:scale-95 duration-200 ${
										prevPage == null ? 'hidden' : ''
									}`}
									onClick={(e) => getPenukaranDatas(penukaranDatas.previous)}
								>
									<p className="text-[#0096D5] text-sm md:text-md px-3">
										Previous
									</p>
								</button>

								<button
									className={` btn border-2 border-[#D1F5FF] p-2 rounded-md cursor-not-allowed ${
										prevPage == null ? '' : 'hidden'
									}`}
									onClick={(e) => getPenukaranDatas(penukaranDatas.previous)}
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
										getPenukaranDatas(penukaranDatas.next);
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
										getPenukaranDatas(penukaranDatas.next);
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
