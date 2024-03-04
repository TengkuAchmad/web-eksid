'use client';
import React, { useEffect, useState } from 'react';
import { GiOilDrum } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi2';
import { FaUserPlus } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import {
	Chart as Chartjs,
	BarElement,
	CategoryScale,
	LinearScale,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

Chartjs.register(CategoryScale, LinearScale, BarElement, ArcElement);

export default function DasboardComponent() {
	const router = useRouter();
	const [date, setDate] = useState('baru');
	const [totalData, setTotalData] = useState<any>({});
	const [loading, setLoading] = useState(true);

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

	const getDatas = async (uri: string) => {
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
			setTotalData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const dataSet = (date: any) => {
		getDatas(`https://fourtour.site/melinda/dashboard/?date=${date}`);
	};

	useEffect(() => {
		getDatas('https://fourtour.site/melinda/dashboard/');
	}, []);

	var data = {
		labels: [
			'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember',
		],
		datasets: [
			{
				label: 'Jumlah Minyak',
				data: [
					80, 100, 130, 150, 200, 500, 800, 700, 600, 950, 900, 1200, 1800,
				],
				backgroundColor: ['#0096D5'],
				borderWidth: 1,
			},
			{
				label: 'Jumlah Transaksi',
				data: [
					80, 100, 130, 150, 200, 500, 800, 700, 600, 950, 900, 1200, 1800,
				],
				backgroundColor: ['#EB5757'],
				borderWidth: 1,
			},
			{
				label: 'User Baru',
				data: [
					80, 100, 130, 150, 200, 500, 800, 700, 600, 950, 900, 1200, 1800,
				],
				backgroundColor: ['#2F80ED'],
				borderWidth: 1,
			},
		],
	};

	var option = {
		maintainAspectRatio: false,
		legend: {
			labels: {
				fontSize: 16,
			},
		},
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
		<div className="md:pr-5 pr-0 pb-8">
			<div className="header ml-0 md:ml-10 lg:ml-72 lg:mt-6 md:flex block justify-between items-center pr-10 md:pr-2">
				<h1 className="text-[#0096D5] lg:text-3xl font-bold text-lg md:text-xl px-5 pt-6 md:pt-8 lg:pt-0 pl-16 md:pl-6 lg:px-0">
					Dashboard
				</h1>
				<div className="waktu block md:flex items-center gap-10 pl-10 lg:pl-0 md:pt-6 lg:pr-7">
					<div className="btn-group grid grid-cols-4 md:w-52 w-10/12 pt-1 mx-auto mt-3 md:mt-0 ">
						<button
							className={`border-[#0096D5] text-white border-2 btn btn-outline  rounded-tl-md rounded-bl-md border-r-0 ${
								date == 'baru' ? 'text-white bg-[#0096D5]' : 'text-[#0096D5]'
							} text-sm`}
							onClick={(e) => {
								dataSet('now'), setDate('baru');
							}}
						>
							Hari ini
						</button>
						<button
							className={`border-[#0096D5] text-white border-2 btn btn-outline  ${
								date == 'hari' ? 'text-white bg-[#0096D5]' : 'text-[#0096D5]'
							} text-sm`}
							onClick={(e) => {
								dataSet('week'), setDate('hari');
							}}
						>
							7 hari
						</button>
						<button
							className={` border-2 border-[#0096D5] border-l-0 btn btn-outlinerounded-br-md ${
								date == 'bulan' ? 'text-white bg-[#0096D5]' : 'text-[#0096D5]'
							} text-sm`}
							onClick={(e) => {
								dataSet('month'), setDate('bulan');
							}}
						>
							1 bulan
						</button>
						<button
							className={` border-2 border-[#0096D5] border-l-0 btn btn-outline rounded-tr-md rounded-br-md ${
								date == 'tahun' ? 'text-white bg-[#0096D5]' : 'text-[#0096D5]'
							} text-sm`}
							onClick={(e) => {
								dataSet('year'), setDate('tahun');
							}}
						>
							1 tahun
						</button>
					</div>
					{/* <div className="input mx-auto w-10/12 mt-3 md:mt-0">
						<input
							type="date"
							placeholder="p"
							className="bg-[#F8FFE9] text-[#0096D5] border-[#0096D5] border-2 rounded-md p-[1px] md:text-sm mt-1 px-2 |pr-5 text-sm border-r-0 rounded-tr-none rounded-br-none w-auto"
						/>
						<input
							type="date"
							placeholder="p"
							className="bg-[#F8FFE9] text-[#0096D5] border-[#0096D5] border-2 rounded-md p-[1px] md:text-sm mt-1 px-2 |pr-5 text-sm border-l-0 rounded-tl-none rounded-bl-none w-auto"
						/>
					</div> */}
				</div>
			</div>
			<div className="ml-16 lg:ml-72 mr-2 lg:mr-10 mt-10">
				<div className=" rounded-md w-full p-5 border-2 border-b-4 border-black  min-h-full">
					<h1 className="font-semibold text-2xl">Selamat Datang</h1>
					<p>berikut informasi data data</p>

					<div className="card p-3 border-black border-2 border-b-2 rounded-md w-full block md:flex justify-around items-center mt-5">
						<div className="totalMinyak">
							<GiOilDrum className=" mx-auto block text-lg " />
							<h1
								className={`text-xl text-center font-bold mt-2 ${
									loading ? 'text-lg' : ''
								}`}
							>
								{loading ? 'loading...' : `${totalData.minyak}`}
							</h1>
							<p className=" text-center text-xs">Total Minyak</p>
						</div>
						<div className="totalTransaksi mt-5 md:mt-0">
							<HiUserGroup className=" mx-auto block text-lg" />
							<h1
								className={`text-xl text-center font-bold mt-2 ${
									loading ? 'text-lg' : ''
								}`}
							>
								{loading ? 'loading...' : `${totalData.minyak}`}
							</h1>
							<p className=" text-center text-xs">Total Transaksi</p>
						</div>
						<div className="verifBaru mt-5 md:mt-0">
							<IoIosAddCircle className=" mx-auto block text-lg" />
							<h1
								className={`text-xl text-center font-bold mt-2 ${
									loading ? 'text-lg' : ''
								}`}
							>
								{loading ? 'loading...' : `${totalData.minyak}`}
							</h1>
							<p className=" text-center text-xs">Verifikasi Baru</p>
						</div>
					</div>
				</div>
			</div>
			{/* <div className=" ml-0 md:ml-10 lg:ml-72 mt-10 md:w-auto w-full min-h-full shadow-md block md:flex justify-around items-center bg-[#F8FFE9] px-5">
				<div className="BarChart w-full md:w-2/3 ">
					<Bar height={400} data={data} options={option} />
				</div>
				<div className="DoughChartWrap">
					<div className="data mt-5">
						<div className="jmlMinyak flex items-center gap-2">
							<div className="info bg-[#0096D5] w-[5px] h-[5px] p-2"></div>
							<p>Jumlah Minyak</p>
						</div>
						<div className="jmlMinyak flex items-center gap-2">
							<div className="info bg-[#2F80ED] w-[5px] h-[5px] p-2 "></div>
							<p>Jumlah Transaksi</p>
						</div>
						<div className="jmlMinyak flex items-center gap-2">
							<div className="info bg-[#EB5757] w-[5px] h-[5px] p-2"></div>
							<p>User Baru</p>
						</div>
						<div className="DoughChart w-10/12 lg:w-60 md:w-40 mx-auto ">
							<Doughnut height={400} data={data} options={option} />
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
}
