'use client';
import { useState, Fragment, useEffect } from 'react';
import { Tab, Listbox, Transition } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import cookies from 'universal-cookie';
import { PenyetoranInterface } from '@/utils/interface/DataInterface';
import styles from '../page.module.css';
import { IoMdRefresh } from 'react-icons/io';
import moment from 'moment';
	
export default function UserManagementComponent() {
	const [penyetoranDatas, setPenyetoranDatas] = useState<PenyetoranInterface>({
		count: 0,
		results: [],
		next: '',
		previous: '',
	});
	const [modal, setModal] = useState('');
	const [searchUser, setSearch] = useState('');
	const [inputVolume, setInputVolume] = useState('');
	const [berhasilVerif, setBerhasilVerif] = useState('');
	const [selected, setSelected] = useState(10);
	const [waktuData, setWaktuData] = useState('baru');
	const [startDate, setStartDate] = useState<string>(
		moment(new Date()).format('YYYY-MM-DD')
	);
	const [endDate, setEndDate] = useState<string>(
		moment(startDate).add(1, 'days').format('YYYY-MM-DD')
	);
	const [modeInput, setModeIput] = useState<string>('');
	const [modeSelected, setModeSelected] = useState('');
	const [jmlData, setJmlData] = useState(5);
	const [passsingNama, setPassingNama] = useState({ nama: '' });
	const [loading, setLoading] = useState(true);
	let poin = (parseInt(inputVolume) / 500) | 0;
	const nextPage = penyetoranDatas.next;
	const prevPage = penyetoranDatas.previous;
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

	const getPenyetoranDatas = async (uri: string) => {
		if (!uri) return;
		setLoading(true);
		const res = await axios.get(uri, {
			headers: {
				'Content-Type': 'multipart/form-data',
				jwt: getCookie('jwt'),
			},
		});
		setLoading(false);
		setPenyetoranDatas(res.data);
	};

	useEffect(() => {
		getPenyetoranDatas(
			'https://fourtour.site/melinda/minyak?status=Menunggu%20Verifikasi'
		);
	}, []);

	const modalTrigger = (id: any) => {
		setModal(id);
	};

	const searchUserSubmit = (e: any) => {
		e.preventDefault();
		getPenyetoranDatas(
			`https://fourtour.site/melinda/minyak?${modeSelected}&status=Menunggu%20Verifikasi&search=${searchUser}`
		);
	};

	const submitVolume = async (e: any) => {
		try {
			e.preventDefault();
			if (modal == '') return;
			setModal('');
			const res = await axios.post(
				`https://fourtour.site/melinda/minyak/setor/${modal}/verifikasi/`,
				{
					volume: inputVolume,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						jwt: getCookie('jwt'),
					},
				}
			);
			setBerhasilVerif('berhasil');
			getPenyetoranDatas(
				`https://fourtour.site/melinda/minyak?${modeSelected}&status=Menunggu%20Verifikasi`
			);
		} catch (error) {
			setBerhasilVerif('gagal');
		}
	};

	const searchFromDate = (e: any) => {
		e.preventDefault();
		const cek = getPenyetoranDatas(
			`https://fourtour.site/melinda/minyak?${modeSelected}&status=Menunggu%20Verifikasi&created__gt=${startDate}&created__lt${endDate}`
		);
	};

	const resetDate = () => {
		setStartDate('');
		setEndDate('');
		getPenyetoranDatas(
			`https://fourtour.site/melinda/minyak?${modeSelected}&status=Menunggu%20Verifikasi&limit=${selected}`
		);
	};
	const checkAuth = () => {
		const cookie = new cookies();
		const getCookie = cookie.get('jwt');
		if (!getCookie) {
			console.log('Belum Login');
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
			{/* MODAL  */}
			<div
				className={` modal fixed ${
					modal != '' ? '' : 'opacity-0 z-0'
				} bg-[#00000040] h-screen w-full z-10 flex justify-center items-center duration-200`}
			>
				<div
					className={`bg-white rounded pt-3 pl-2 md:ml-10 pr-2 pb-5 w-10/12 lg:w-1/4 ${
						modal != '' ? '' : 'scale-0'
					} duration-200`}
				>
					<div className="flex w-full justify-center items-center gap-5 relative">
						<h1 className="text-[#0096D5] text-3xl">Verifikasi</h1>
						<AiOutlineClose
							className="text-[#0096D5] text-xl absolute right-0 top-0 cursor-pointer"
							onClick={(e) => modalTrigger('')}
						/>
					</div>
					<p className=" mx-auto text-center mt-5 text-sm text-[#00000080]">
						Verifikasi untuk akun
						<span className="text-[#0096D5]"> {passsingNama.nama}</span>,
						masukan
						<span className="text-[#0096D5]"> inputan minyak </span> di bawah
						ini
					</p>

					<div className="px-5">
						<h1 className="text-[#00000080] mt-2 text-lg block mx-auto text-left">
							Masukan Minyak
						</h1>
						<form
							action=""
							onSubmit={(e) => {
								submitVolume(e);
							}}
						>
							<input
								type="number"
								placeholder="Ex: 1200"
								className=" bg-transparent border-[#0096D5] text-[#00000080] rounded-lg border-2 w-full mr-10 block pl-2"
								value={inputVolume}
								onChange={(e) => {
									setInputVolume(e.target.value);
								}}
							/>

							<button
								className={` ${
									inputVolume != '' && inputVolume != '0'
										? 'hidden'
										: 'text-white rounded-md bg-gray-300 mt-10 w-2/3 block mx-auto font-semibold p-1 text-xl focus:outline-none'
								}  `}
								disabled
								onClick={(e) => {
									setBerhasilVerif(inputVolume);
								}}
							>
								Masukan
							</button>
							<button
								className={` ${
									inputVolume != '' && inputVolume != '0'
										? 'bg-[#0096D5] rounded-md text-white mt-10 w-2/3 block mx-auto font-semibold p-1 text-xl hover:scale-95 duration-200 cursor-pointer'
										: 'hidden'
								}  `}
								onClick={(e) => {
									{
										setBerhasilVerif(inputVolume);
									}
								}}
							>
								Masukan
							</button>
						</form>
					</div>
				</div>
			</div>
			{/* MODAL END  */}

			{/* MODAL BERHASIL VERFI  */}
			<div
				className={` modal fixed ${
					berhasilVerif == 'berhasil' ? '' : 'opacity-0 z-0'
				} bg-[#00000040] h-screen w-full z-10 flex justify-center items-center duration-200`}
			>
				<div
					className={`bg-white rounded pt-3 pl-2 md:ml-10 pr-2 pb-5 w-10/12 lg:w-1/4 ${
						berhasilVerif == 'berhasil' ? '' : 'scale-0'
					} duration-200 relative`}
				>
					<h1 className=" text-center font-semibold text-[#0096D5] text-3xl">
						Berhasil
					</h1>
					<AiOutlineClose
						className="text-[#0096D5] text-xl cursor-pointer absolute top-4 right-3"
						onClick={(e) => setBerhasilVerif('tutup')}
					/>
					<p className=" text-black text-opacity-50 text-center pt-3">
						User{' '}
						<span className="text-[#0096D5] font-semibold">
							{passsingNama.nama}
						</span>{' '}
						telah mendapatkan poin sebanyak
					</p>
					<h1 className=" text-3xl text-center font-bold text-[#0096D5] py-5">
						{poin} Poin
					</h1>
				</div>
			</div>
			{/* MODAL BERHASIL VERIF END  */}

			<div
				className={`${loading ? '' : 'hidden'} bg-red-300 
				text-center absolute right-0 animate-spin rounded-md`}
			></div>

			<h1 className="text-[#0096D5] pl-16 lg:pl-72 pt-7 font-bold text-xl md:text-3xl">
				Penyetoran
			</h1>

			<div
				className={`ml-10 md:ml-10 lg:ml-72 mt-2 lg:mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-white relative rounded shadow-none lg:shadow-3xl`}
			>
				<div className="wrapper flex justify-between items-center ">
					<div className=" py-2 pl-5 md:pl-7 pr-10 md:pr-4 lg:p-5 flex gap-2 lg:gap-5 items-center justify-between lg:justify-start w-full lg:w-auto overflow-auto">
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
													getPenyetoranDatas(
														`https://fourtour.site/melinda/minyak?${modeSelected}&status=Menunggu%20Verifikasi&limit=${e.target.value}`
													);
											  }, 100)
											: setTimeout(() => {
													getPenyetoranDatas(
														`https://fourtour.site/melinda/minyak?${modeSelected}&status=Menunggu%20Verifikasi&limit=${e.target.value}`
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
						<div className="modeInput hidden lg:block">
							<select
								name="modeInput"
								title="Mode Input"
								id=""
								value={modeSelected}
								className="bg-[#0096D5] rounded-md outline-none text-white p-[2px] mt-[3px] cursor-pointer"
								onChange={(e) => {
									setModeSelected(e.target.value);
									getPenyetoranDatas(
										`https://fourtour.site/melinda/minyak/?${e.target.value}&status=Menunggu%20Verifikasi`
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

					<form
						action=""
						className="relative pl-5 pr-10 lg:pl-0 lg:pr-0 hidden lg:block"
						onSubmit={(e) => {
							{
								searchUserSubmit(e);
							}
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
												getPenyetoranDatas(
													`https://fourtour.site/melinda/minyak?status=Menunggu%20Verifikasi&limit=${e.target.value}`
												);
										  }, 100)
										: setTimeout(() => {
												getPenyetoranDatas(
													`https://fourtour.site/melinda/minyak?status=Menunggu%20Verifikasi&limit=${e.target.value}`
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
								getPenyetoranDatas(
									`https://fourtour.site/melinda/minyak/?${e.target.value}&status=Menunggu%20Verifikasi`
								);
							}}
						>
							<option value="" className=" cursor-pointer">
								All
							</option>
							<option value="bersama_petugas=tidak" className=" cursor-pointer">
								Otomatis
							</option>
							<option value="bersama_petugas=ya" className=" cursor-pointer">
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

				{/* <TableUser /> */}
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
										<td className="px-5 ">NIU</td>
										<td className="px-5 ">Email</td>
										<td className="px-5 ">No.Tlp</td>
										<td
											className="rounded-tr-lg rounded-br-lg bg-[#0096D5] pr-2 pl-5"
											onClick={modalTrigger}
										>
											Aksi
										</td>
									</tr>
								</thead>
								<tbody className={`${loading ? '' : 'hidden'}`}>
									<tr>
										<td className="pt-5 px-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading...
										</td>
										<td className="pt-5 px-6 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading...
										</td>
										<td className="pt-5 px-6 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading...
										</td>
										<td className="pt-5 px-6 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading...
										</td>
										<td className="pt-5 px-6 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											loading...
										</td>
									</tr>
								</tbody>
								<tbody className={`${loading ? 'hidden' : ''}`}>
									{penyetoranDatas['results'].map((datas: any, key: any) => {
										return (
											<tr key={key}>
												<td className="pt-5 px-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.user}
												</td>
												<td className="pt-5 px-6 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.id_user}
												</td>
												<td className="pt-5 px-6 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.email}
												</td>
												<td className="pt-5 px-6 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.phone}
												</td>
												<td
													className="pt-5 pr-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer"
													onClick={(e) => {
														setPassingNama({
															nama: datas.user,
														}),
															modalTrigger(datas.id);
													}}
												>
													<div className="p-1 border-2 border-[#0096D5] text-[#0096D5] rounded text-center hover:scale-95 duration-200">
														Verifikasi
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
					<div className="footer flex justify-between items-center mt-5 pb-5 p-1 overflow-hidden">
						{/* <h1 className="font-semibold text-xs md:text-lg">
							Showing {selected} data
						</h1> */}
						<h1 className="font-semibold text-sm md:text-lg pl-5">
							Total data: {penyetoranDatas.count}
						</h1>
						<div className="flex gap-2">
							{/* PREV PAGE  */}
							<button
								className={`btn border-2 border-[#0096D5] p-2 rounded-md hover:scale-95 duration-200 ${
									prevPage == null ? 'hidden' : ''
								}`}
								onClick={(e) => getPenyetoranDatas(penyetoranDatas.previous)}
							>
								<p className="text-[#0096D5] text-sm md:text-md px-3">
									Previous
								</p>
							</button>

							<button
								className={`  btn border-2 border-[#D1F5FF] p-2 rounded-md cursor-not-allowed ${
									prevPage == null ? '' : 'hidden'
								}`}
								onClick={(e) => getPenyetoranDatas(penyetoranDatas.previous)}
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
									getPenyetoranDatas(penyetoranDatas.next);
								}}
							>
								<p className="text-[#0096D5] text-sm md:text-md px-3">Next</p>
							</button>

							<button
								className={` btn border-2 border-[#D1F5FF] p-2 rounded-md cursor-not-allowed   ${
									nextPage == null ? '' : 'hidden'
								}`}
								disabled
								onClick={(e) => {
									getPenyetoranDatas(penyetoranDatas.next);
								}}
							>
								<p className="text-[#D1F5FF] text-sm md:text-md px-3">Next</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
