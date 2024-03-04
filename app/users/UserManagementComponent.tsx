'use client';
import { useState, Fragment, useEffect } from 'react';
import { Tab, Listbox, Transition } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import cookies from 'universal-cookie';
import { UserInterface } from '@/utils/interface/DataInterface';
import styles from '../page.module.css';
import { IoMdRefresh } from 'react-icons/io';
import moment from 'moment';

export default function UserManagementComponent() {
	const [userDatas, setUserDatas] = useState<UserInterface>({
		count: 0,
		results: [],
		next: '',
		previous: '',
	});
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState({ name: '', id: '' });
	const [searchUser, setSearch] = useState('');
	const [error, setError] = useState('');
	const [selected, setSelected] = useState(10);
	const [waktuData, setWaktuData] = useState('baru');
	const [startDate, setStartDate] = useState(
		moment(new Date()).format('YYYY-MM-DD')
	);
	const [endDate, setEndDate] = useState(
		moment(startDate).add(1, 'days').format('YYYY-MM-DD')
	);
	const [jmlData, setJmlData] = useState(5);
	const [totalData, setTotalData] = useState(0);
	const nextPage = userDatas.next;
	const prevPage = userDatas.previous;
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

	const getuserDatas = async (uri: string) => {
		try {
			if (!uri) return;
			setLoading(true);
			const res = await axios.get(uri, {
				headers: {
					'Content-Type': 'multipart/form-data',
					jwt: getCookie('jwt'),
				},
			});
			setLoading(false);
			setUserDatas(res.data);
		} catch (error) {
			setError('error');
		}
	};

	const deleteUser = async (id: any, e: any) => {
		try {
			e.preventDefault();
			setLoading(true);
			setModal({ name: '', id: '' });
			const res = await axios.delete(
				`https://fourtour.site/melinda/users/${id}/delete`,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						jwt: getCookie('jwt'),
					},
				}
			);
			setLoading(false);
			getuserDatas('https://fourtour.site/melinda/users/?limit=5&page=1');
		} catch (error) {
			setError('error');
		}
	};

	const searchUserSubmit = (e: any) => {
		e.preventDefault();
		getuserDatas(
			`https://fourtour.site/melinda/users/?search=${searchUser}&limit=${selected}`
		);
	};

	const searchFromDate = (e: any) => {
		e.preventDefault();
		const cek = getuserDatas(
			`https://fourtour.site/melinda/users/?&createdAt__gt=${startDate}&createdAt_lt=${endDate}&limit=${selected}`
		);
	};

	const resetDate = () => {
		setStartDate('');
		setEndDate('');
		getuserDatas(
			`https://fourtour.site/melinda/users/?page=1&limit=${selected}`
		);
	};

	// const checkAuth = () => {
	// 	const cookie = new cookies();
	// 	const getCookie = cookie.get('jwt');
	// 	if (!getCookie) {
	// 		console.log('Belum Login');
	// 		router.push('/');
	// 	} else {
	// 		console.log('sudah login');
	// 	}
	// };

	useEffect(() => {
		// checkAuth();
		getuserDatas('https://fourtour.site/melinda/users/?page=1');
	}, []);

	return (
		<div className="pr-0 z-0 pb-3 lg:pb-10 overflow-x-hidden lg:overflow-x-auto">
			{/* MODAL  */}
			<div
				className={` modal fixed ${
					modal.id != '' ? '' : 'opacity-0 z-0'
				} bg-[#00000040] h-screen w-full z-10 flex justify-center items-center duration-200`}
			>
				<div
					className={`bg-white rounded pt-3 pl-8 pr-8 pb-5 ${
						modal.id != '' ? '' : ' scale-0'
					} duration-200	`}
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
					<form action="">
						<button
							className="bg-[#0096D5] w-full rounded-md text-white mt-10 hover:scale-95 duration-200"
							onClick={(e) => deleteUser(modal.id, e)}
						>
							Iya
						</button>
					</form>
				</div>
			</div>
			{/* MODAL END */}

			<h1 className="text-[#0096D5] pl-16 lg:pl-72 pt-7 font-bold text-xl md:text-3xl">
				User Management
			</h1>

			<div
				className={` ml-10 md:ml-10 lg:ml-72 mt-2 lg:mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-white relative rounded shadow-none lg:shadow-3xl`}
			>
				<div className="wrapper flex justify-between items-center ">
					<div className=" py-2 pl-5 md:pl-7 pr-10 md:pr-4 lg:p-5 flex gap-5 items-center justify-between lg:justify-start w-full lg:w-auto ">
						<div className="jmlData hidden md:block">
							<select
								name=""
								title="Tampil Data"
								id=""
								value={selected}
								className="bg-[#0096D5] rounded-md outline-none text-white cursor-pointer"
								onChange={(e) => {
									setSelected(parseInt(e.target.value));
									{
										waktuData == 'baru'
											? setTimeout(() => {
													getuserDatas(
														`https://fourtour.site/melinda/users/?limit=${e.target.value}`
													);
											  }, 100)
											: setTimeout(() => {
													getuserDatas(
														`https://fourtour.site/melinda/users/?limit=${e.target.value}`
													);
											  }, 100);
									}
								}}
							>
								<option
									value="10"
									className=" cursor-pointer"
									onClick={() => {
										setJmlData(5);
									}}
								>
									10
								</option>
								<option
									value="15"
									className=" cursor-pointer"
									onClick={() => {
										setJmlData(10);
									}}
								>
									15
								</option>
								<option
									value="20"
									className=" cursor-pointer"
									onClick={() => {
										setJmlData(10);
									}}
								>
									20
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
							// className="search flex items-center border-[#0096D5] border-[1px] p-1 gap-2 md:w-60 w-full rounded-lg bg-[#D1F5FF] placeholder:font-semibold peer z-20 pl-7 my-4"
							className="search none lg:flex items-center border-[#0096D5] border-[1px] mr-6 p-1 gap-2 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7 "
							placeholder="Search"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							value={searchUser}
						/>
						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-2 duration-200 peer-placeholder-shown:font-bold z-0" />
					</form>
				</div>

				{/* FORM MOBILE */}
				<div className=" md:block flex justify-between items-center gap-2 w-full">
					<div className="jmlData block md:hidden pl-5">
						<select
							name=""
							title="Tampil Data"
							id=""
							value={selected}
							className="bg-[#0096D5] rounded-md outline-none text-white cursor-pointer p-1	"
							onChange={(e) => {
								setSelected(parseInt(e.target.value));
								{
									waktuData == 'baru'
										? setTimeout(() => {
												getuserDatas(
													`https://fourtour.site/melinda/users/?limit=${e.target.value}`
												);
										  }, 100)
										: setTimeout(() => {
												getuserDatas(
													`https://fourtour.site/melinda/users/?limit=${e.target.value}`
												);
										  }, 100);
								}
							}}
						>
							<option
								value="10"
								className=" cursor-pointer"
								onClick={() => {
									setJmlData(5);
								}}
							>
								10
							</option>
							<option
								value="15"
								className=" cursor-pointer"
								onClick={() => {
									setJmlData(10);
								}}
							>
								15
							</option>
							<option
								value="20"
								className=" cursor-pointer"
								onClick={() => {
									setJmlData(10);
								}}
							>
								20
							</option>
						</select>
					</div>
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
						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-6 md:top-2 left-7 md:left-9 lg:left-3 duration-200 peer-placeholder-shown:font-bold z-0" />
					</form>
				</div>
				{/* FORM MOBILE END*/}

				{/* <TableUser /> */}
				<div className="pr-10 md:pr-4 md:pl-2">
					<div className="w-full pl-5 lg:px-3">
						<div className="overflow-auto">
							<table className="w-full">
								<thead className="bg-[#0096D5] rounded text-white">
									<tr>
										<td className="rounded-bl-lg rounded-tl-lg bg-[#0096D5] p-1 pl-3">
											Nama
										</td>
										<td className="px-5 lg:px-0">NIU</td>
										<td className="px-5 lg:px-0">Email</td>
										<td className="px-5 lg:px-0">No.Tlp</td>
										<td
											className="rounded-tr-lg rounded-br-lg bg-[#0096D5] pr-2 pl-5"
											// onClick={modalTrigger}
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
										<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer px-5 lg:px-0">
											loading...
										</td>
										<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer px-5 lg:px-0">
											loading...
										</td>
										<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer px-5 lg:px-0">
											loading...
										</td>
										<td className="pt-5 pr-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer pl-5 lg:pl-0">
											loading...
										</td>
									</tr>
								</tbody>
								<tbody className={`${loading ? 'hidden' : ''}`}>
									{userDatas['results'].map((datas: any, key: any) => {
										return (
											<tr key={key}>
												<td className="pt-5 px-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
													{datas.name}
												</td>
												<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer px-5 lg:px-0">
													{datas._id}
												</td>
												<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer px-5 lg:px-0">
													{datas.email}
												</td>
												<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer px-5 lg:px-0">
													{datas.phone}
												</td>
												<td
													className="pt-5 pr-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer pl-5 lg:pl-0"
													onClick={(e) =>
														setModal({ name: datas.name, id: datas._id })
													}
												>
													<div className="p-1 border-2 border-[red] text-[red]  rounded text-center hover:scale-95 duration-200">
														Hapus
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
