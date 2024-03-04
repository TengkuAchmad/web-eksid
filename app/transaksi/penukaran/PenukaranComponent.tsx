'use client';
import { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import cookies from 'universal-cookie';
import styles from '../../page.module.css';
import moment from 'moment';

export default function UserManagementComponent() {
	const [penukaranDatas, setPenukaranDatas] = useState<any>({
		count: 0,
		results: [],
	});
	const [loading, setLoading] = useState(true);
	const [searchPenukaran, setSearchPenukaran] = useState('');
	const [startDate, setStartDate] = useState<string>(
		moment(new Date()).format('YYYY-MM-DD')
	);
	const [endDate, setEndDate] = useState<string>(
		moment(startDate).add(1, 'days').format('YYYY-MM-DD')
	);
	const [selected, setSelected] = useState(5);
	const [waktuData, setWaktuData] = useState('baru');
	const nextPenukaranPage = penukaranDatas.next;
	const prevPenukaranPage = penukaranDatas.previous;
	const router = useRouter();

	const getPenukaranData = async (uri: string) => {
		if (!uri) return;
		setLoading(true);
		const res = await axios.get(uri, {
			headers: {
				'Content-Type': 'multipart/form-data',
				jwt: getCookie('jwt'),
			},
		});
		console.log(res);
		setLoading(false);
		setPenukaranDatas(res.data);
	};

	useEffect(() => {
		getPenukaranData(
			'https://fourtour.site/melinda/produk/penukaran?status=ok'
		);
	}, []);

	const searchDataPenukaran = (e: any) => {
		e.preventDefault();
		getPenukaranData(
			`https://fourtour.site/melinda/produk/penukaran?status=ok&search=${searchPenukaran}`
		);
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

	const searchFromDate = (e: any) => {
		e.preventDefault();
		const cek = getPenukaranData(
			`https://fourtour.site/melinda/produk/penukaran?status=ok&created__gt=${startDate}&created__lt=${endDate}`
		);
	};

	const resetDate = () => {
		setStartDate('');
		setEndDate('');
		getPenukaranData(
			'https://fourtour.site/melinda/produk/penukaran?status=ok'
		);
	};

	const checkAuth = () => {
		const cookie = new cookies();
		const getCookie = cookie.get('jwt');
		if (!getCookie) {
			console.log('Lom Login');
			router.push('/');
		} else {
			console.log('sudah login');
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<div className="pr-0 z-0 pb-3 lg:pb-10 overflow-x-hidden lg:overflow-x-auto">
			<h1 className="text-[#0096D5] pl-16 lg:pl-72 pt-7 font-bold text-xl md:text-3xl">
				Riwayat Penukaran
			</h1>
			{/* 
			<div className="waktu ml-2 md:ml-10 lg:ml-72 my-2 overflow-auto">
				<form
					action=""
					onSubmit={(e) => {
						// searchFromDate(e);
					}}
				>
					<table>
						<thead>
							<tr>
								<td>Dari tanggal: </td>
								<td className="pl-2">Sampai tanggal: </td>
								<td></td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<input
										type="date"
										placeholder="."
										className=" placeholder-transparent border-[#0096D5] border-2 bg-[#D1F5FF] rounded-md px-1"
										onChange={(e) => {
											setStartDate(e.target.value);
										}}
										value={startDate}
									/>
								</td>
								<td>
									<input
										type="date"
										placeholder="."
										className=" placeholder-transparent border-[#0096D5] border-2 bg-[#D1F5FF] rounded-md px-1 ml-2"
										onChange={(e) => {
											setEndDate(e.target.value);
										}}
										value={endDate}
									/>
								</td>
								<td>
									<button
										className="bg-[#0096D5] text-white rounded-md text-[26px] ml-2 cursor-pointer mt-1"
										title="Search"
										onClick={(e) => {
											searchFromDate(e);
										}}
									>
										<AiOutlineSearch />
									</button>
								</td>
								<td>
									<IoMdRefresh
										className="bg-[#0096D5] text-white rounded-md text-[26px] ml-2 cursor-pointer"
										onClick={(e) => {
											resetDate();
										}}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div> */}

			{/* TRANSAKSI PENUKARAN */}
			<div
				className={`ml-10 md:ml-10 lg:ml-72 mt-2 lg:mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-white relative rounded shadow-none lg:shadow-3xl`}
			>
				<div className="wrapper flex justify-between items-center">
					<div className=" py-2 pl-5 md:pl-7 pr-10 md:pr-4 lg:p-5 flex gap-5 items-center justify-between lg:justify-start w-full lg:w-auto">
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
											? setTimeout(() => {
													getPenukaranData(
														`https://fourtour.site/melinda/produk/penukaran?status=ok&limit=${e.target.value}`
													);
											  }, 100)
											: setTimeout(() => {
													getPenukaranData(
														`https://fourtour.site/melinda/produk/penukaran?status=ok&limit=${e.target.value}`
													);
											  }, 100);
									}
								}}
							>
								<option value="5" className=" cursor-pointer">
									5
								</option>
								<option value="10" className=" cursor-pointer">
									10
								</option>
							</select>
						</div> */}
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
					<form
						action=""
						className="relative pl-5 pr-10 lg:pl-0 lg:pr-0 hidden lg:block "
						onSubmit={(e) => {
							searchDataPenukaran(e);
						}}
					>
						<input
							className="search none lg:flex items-center border-[#0096D5] border-[1px] mr-6 p-1 gap-2 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7 "
							placeholder="Search"
							onChange={(e) => {
								setSearchPenukaran(e.target.value);
							}}
							value={searchPenukaran}
						/>
						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-1 duration-200 peer-placeholder-shown:font-bold z-0" />
					</form>
				</div>

				{/* FORM MOBILE */}
				<form
					action=""
					className="relative pl-5 md:pl-7 pr-10 md:pr-4 lg:pr-0 lg:hidden"
					onSubmit={(e) => {
						searchDataPenukaran(e);
					}}
				>
					<input
						className="search flex items-center border-[#0096D5] border-[1px] p-1 gap-2 w-full rounded-lg bg-[#D1F5FF] placeholder:font-semibold peer z-20 pl-7 my-2"
						placeholder="Search"
						onChange={(e) => {
							setSearchPenukaran(e.target.value);
						}}
						value={searchPenukaran}
					/>
					<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-7 md:left-9 lg:left-3 duration-200 peer-placeholder-shown:font-bold z-0" />
				</form>
				{/* FORM MOBILE END*/}

				<div className="pr-10 md:pr-4 md:pl-2">
					<div className="w-full pl-5 lg:px-3">
						<div className="overflow-auto">
							<table className="w-full">
								<thead className="bg-[#0096D5] rounded text-white">
									<tr>
										<td className="rounded-bl-lg rounded-tl-lg bg-[#0096D5] p-1 pl-3">
											Nama
										</td>
										<td className="px-10 lg:px-0">Email</td>
										<td className="px-10 lg:px-0">Jumlah</td>
										<td className="px-10 lg:px-0">Poin</td>
										<td className="px-10 lg:px-0">status</td>
									</tr>
								</thead>
								<tbody className={`${loading ? '' : 'hidden'}`}>
									<tr>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-10 lg:px-0 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-10 lg:px-0 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-10 lg:px-0 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-10 lg:px-0 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
									</tr>
								</tbody>
								<tbody className={`${loading ? 'hidden' : ''}`}>
									{penukaranDatas['results'].map((datas: any, key: any) => {
										return (
											<tr key={key}>
												<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.nama}
												</td>
												<td className="pt-5 px-10 lg:px-0 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.email}
												</td>
												<td className="pt-5 px-10 lg:px-0 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.jumlah}
												</td>
												<td className="pt-5 px-10 lg:px-0 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.biaya}
												</td>
												<td className="pt-5 px-10 lg:px-0 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{/* {datas.status} */}
													Terverifikasi
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>

						<div className="footer flex justify-between mt-5 pb-5 p-1 items-center">
							{/* <h1 className="font-semibold text-xs md:text-lg">
							Showing {selected} data
						</h1> */}
							<h1 className="font-semibold text-xs md:text-lg">
								Total data: {penukaranDatas.count}
							</h1>
							<div className="flex gap-2">
								<button
									className={`btn border-2 border-[#0096D5] p-2 rounded-md hover:scale-95 duration-200 ${
										prevPenukaranPage == null ? 'hidden' : ''
									}`}
									onClick={(e) => getPenukaranData(penukaranDatas.previous)}
								>
									<p className="text-[#0096D5] text-sm md:text-md px-3">
										Previous
									</p>
								</button>

								<button
									className={` btn border-2 border-[#D1F5FF] p-2 rounded-md cursor-not-allowed ${
										prevPenukaranPage == null ? '' : 'hidden'
									}`}
									onClick={(e) => getPenukaranData(penukaranDatas.previous)}
									disabled
								>
									<p className="text-[#D1F5FF] text-sm md:text-md px-3">
										Previous
									</p>
								</button>

								{/* NEXT PAGE  */}
								<button
									className={`btn border-2 border-[#0096D5] p-2 rounded-md hover:scale-95 duration-200 ${
										nextPenukaranPage == null ? 'hidden' : ''
									}`}
									onClick={(e) => {
										getPenukaranData(penukaranDatas.next);
									}}
								>
									<p className="text-[#0096D5] text-sm md:text-md px-3">Next</p>
								</button>

								<button
									className={` btn border-2 border-[#D1F5FF] p-2 rounded-md cursor-not-allowed ${
										nextPenukaranPage == null ? '' : 'hidden'
									}`}
									disabled
									onClick={(e) => {
										getPenukaranData(penukaranDatas.next);
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
