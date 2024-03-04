'use client';
import { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import cookies from 'universal-cookie';
import styles from '../../page.module.css';
import moment from 'moment';

export default function PenyetoanComponent() {
	const [userDatas, setUserDatas] = useState<any>({ count: 0, results: [] });
	const [loading, setLoading] = useState(true);
	const [searchUser, setSearch] = useState('');
	const [startDate, setStartDate] = useState<string>(
		moment(new Date()).format('YYYY-MM-DD')
	);
	const [endDate, setEndDate] = useState<string>(
		moment(startDate).add(1, 'days').format('YYYY-MM-DD')
	);
	const [selected, setSelected] = useState(5);
	const [modeInput, setModeIput] = useState<string>('');
	const [modeSelected, setModeSelected] = useState('');
	const [waktuData, setWaktuData] = useState('baru');
	const nextPage = userDatas.next;
	const prevPage = userDatas.previous;
	const router = useRouter();

	const getuserDatas = async (uri: string) => {
		try {
			if (!uri) return;
			setLoading(true);
			const res = await axios.get(uri);
			setLoading(false);
			setUserDatas(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getuserDatas(
			'https://fourtour.site/melinda/minyak/?status=Terverifikasi&page=1'
		);
	}, []);

	const searchUserSubmit = (e: any) => {
		e.preventDefault();
		getuserDatas(
			`https://fourtour.site/melinda/minyak?${modeSelected}&status=Terverifikasi&search=${searchUser}`
		);
	};

	const searchFromDate = (e: any) => {
		e.preventDefault();
		const cek = getuserDatas(
			`https://fourtour.site/melinda/minyak?${modeSelected}&status=Terverifikasi&created__gt=${startDate}&created__lt${endDate}`
		);
	};

	const resetDate = () => {
		setStartDate('');
		setEndDate('');
		getuserDatas(
			`https://fourtour.site/melinda/minyak?${modeSelected}&status=&limit=${selected}`
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

	console.log(modeSelected);

	return (
		<div className="pr-0 z-0 pb-3 lg:pb-10 overflow-x-hidden lg:overflow-x-auto">
			<h1 className="text-[#0096D5] pl-16 lg:pl-72 pt-7 font-bold text-xl md:text-3xl">
				Riwayat Penyetoran
			</h1>

			<div
				className={`ml-10 md:ml-10 lg:ml-72 mt-2 lg:mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-white relative rounded shadow-none lg:shadow-3xl`}
			>
				<div className="wrapper flex justify-between items-center">
					<div className="py-2 pl-5 md:pl-7 pr-10 md:pr-4 lg:p-5 flex gap-2 lg:gap-5 items-center justify-between lg:justify-start w-full lg:w-auto overflow-auto">
						<div className="jmlData hidden md:block">
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
													getuserDatas(
														`https://fourtour.site/melinda/minyak/?${modeSelected}&status=Terverifikasi&limit=${e.target.value}`
													);
											  }, 100)
											: setTimeout(() => {
													getuserDatas(
														`https://fourtour.site/melinda/minyak/?${modeSelected}&status=Terverifikasi&limit=${e.target.value}`
													);
											  }, 100);
									}
								}}
							>
								<option
									value="10"
									className=" cursor-pointer"
									onChange={(e) => {
										setSelected(5);
									}}
								>
									10
								</option>
								<option
									value="15"
									className=" cursor-pointer"
									onChange={(e) => {
										setSelected(5);
									}}
								>
									15
								</option>
								<option
									value="20"
									className=" cursor-pointer"
									onChange={(e) => {
										setSelected(5);
									}}
								>
									20
								</option>
							</select>
						</div>
						<div className="modeInput hidden lg:block">
							<select
								name="modeInput"
								title="Mode Input"
								id=""
								value={modeSelected}
								className="bg-[#0096D5] rounded-md outline-none text-white p-[2px] mt-[3px] cursor-pointer"
								onChange={(e) => {
									setModeSelected(e.target.value);
									getuserDatas(
										`https://fourtour.site/melinda/minyak/?${e.target.value}&status=Terverifikasi&limit=${selected}`
									);
								}}
							>
								<option value="" className=" cursor-pointer">
									All
								</option>
								<option
									value="bersama_petugas=tidak"
									className=" cursor-pointer"
								>
									Otomatis
								</option>
								<option value="bersama_petugas=ya" className=" cursor-pointer">
									Bersama Petugas
								</option>
							</select>
						</div>
						<form
							action=""
							onSubmit={(e) => {
								searchFromDate(e);
							}}
							className="flex gap-2 items-center justify-between lg:justify-start w-full md:w-auto"
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
						className="relative pl-5 pr-10 lg:pl-0 lg:pr-0 hidden lg:block"
						onSubmit={(e) => {
							searchUserSubmit(e);
						}}
					>
						<input
							className="search none lg:flex items-center border-[#0096D5] border-[1px] mr-6 p-1 gap-2 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7 "
							placeholder="Search"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							value={searchUser}
						/>
						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-1 duration-200 peer-placeholder-shown:font-bold z-0" />
					</form>
				</div>

				{/* MODE INPUT 	& FILER JML DATA MOBILE  */}
				<div className=" flex items-center justify-between w-full md:hidden gap-2">
					<div className="jmlData pl-5">
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
												getuserDatas(
													`https://fourtour.site/melinda/minyak/?${modeSelected}&status=Terverifikasi&limit=${e.target.value}`
												);
										  }, 100)
										: setTimeout(() => {
												getuserDatas(
													`https://fourtour.site/melinda/minyak/?${modeSelected}&status=Terverifikasi&limit=${e.target.value}`
												);
										  }, 100);
								}
							}}
						>
							<option value="10" className=" cursor-pointer">
								10
							</option>
							<option value="15" className=" cursor-pointer">
								15
							</option>
							<option value="20" className=" cursor-pointer">
								20
							</option>
						</select>
					</div>
					<div className="modeInput pr-10 md:pl-7 md:pr-4 block lg:hidden w-full">
						<select
							name="modeInput"
							title="Mode Input"
							id="modeInput"
							value={modeSelected}
							className="bg-[#0096D5] rounded-md outline-none text-white p-[2px] mt-[3px] cursor-pointer w-full"
							onChange={(e) => {
								setModeSelected(e.target.value);
								getuserDatas(
									`https://fourtour.site/melinda/minyak/?${e.target.value}&status=Terverifikasi&limit=${selected}`
								);
							}}
						>
							<option value="" className=" cursor-pointer">
								All
							</option>
							<option
								value="&bersama_petugas=tidak"
								className=" cursor-pointer"
							>
								Otomatis
							</option>
							<option value="&bersama_petugas=ya" className=" cursor-pointer">
								Bersama Petugas
							</option>
						</select>
					</div>
				</div>

				{/* MODE INPUT 	& FILER JML DATA MOBILE END */}

				{/* FORM MOBILE */}
				<form
					action=""
					className="relative pl-5 md:pl-7 pr-10 md:pr-4 lg:pr-0 lg:hidden"
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
					<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-7 md:left-9 lg:left-3 duration-200 peer-placeholder-shown:font-bold z-0" />
				</form>
				{/* FORM MOBILE END*/}

				{/* TRNSAKSI PENYETORAN */}
				<div className="pr-10 md:pr-4 md:pl-2">
					<div className="w-full pl-5 lg:px-3">
						<div className="overflow-auto">
							<table className="w-full">
								<thead className="bg-[#0096D5] rounded text-white">
									<tr>
										<td className="rounded-bl-lg rounded-tl-lg bg-[#0096D5] p-1 pl-3">
											Nama
										</td>
										<td className="px-8 ">NIU</td>
										<td className="px-8 ">Email</td>
										<td className="px-8 ">No.Tlp</td>
										<td className="px-8 ">Jumlah minyak</td>
										<td className="px-8 ">Poin</td>
										<td className="px-8 ">status</td>
									</tr>
								</thead>
								<tbody className={`${loading ? '' : 'hidden'}`}>
									<tr>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-8  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-8   border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....{' '}
										</td>
										<td className="pt-5 px-8   border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....{' '}
										</td>
										<td className="pt-5 px-8   border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-8   border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
										<td className="pt-5 px-8  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading....
										</td>
									</tr>
								</tbody>
								<tbody className={`${loading ? 'hidden' : ''}`}>
									{userDatas['results'].map((datas: any, key: any) => {
										return (
											<tr key={key}>
												<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas?.user}
												</td>
												<td className="pt-5  px-8 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas?.id_user}
												</td>
												<td className="pt-5 px-8  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas?.email}
												</td>
												<td className="pt-5 px-8  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas?.phone}
												</td>
												<td className="pt-5 px-8  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas?.volume} ml
												</td>
												<td className="pt-5 px-8  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas?.poin}
												</td>
												<td className="pt-5 px-8 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas?.status}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div className="footer flex justify-between items-center mt-5 pb-5 p-1 overflow-hidden">
							{/* <h1 className="font-semibold text-xs md:text-lg">
								Showing {selected} data
							</h1> */}
							<h1 className="font-semibold text-xs md:text-lg">
								Total data: {userDatas.count}
							</h1>
							<div className="flex gap-2">
								<button
									className={`btn border-2 border-[#0096D5] p-2 rounded-md hover:scale-95 duration-200 ${
										prevPage == null ? 'hidden' : ''
									}`}
									onClick={(e) => getuserDatas(userDatas.previous)}
								>
									<p className="text-[#0096D5] text-sm md:text-md px-3">
										Previous
									</p>
								</button>

								<button
									className={` btn border-2 border-[#D1F5FF] p-2 rounded-md cursor-not-allowed ${
										prevPage == null ? '' : 'hidden'
									}`}
									onClick={(e) => getuserDatas(userDatas.previous)}
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
										getuserDatas(userDatas.next);
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
										getuserDatas(userDatas.next);
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
