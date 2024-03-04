'use client';
import { useState, Fragment, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose, AiOutlineEye } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import cookies from 'universal-cookie';
import styles from '../../page.module.css'
import Image from 'next/image';
import Link from 'next/link';
import dummyImage from '../../../../public/noImage.jpg';
import { KategoriInterface } from '@/utils/interface/DataInterface';

export default function EditPage({ params }: { params: { id: string } }) {
	const [data, setData] = useState<any>({});
	const [kategori, setKategori] = useState<string>('');
	const [dataKategori, setDataKategori] = useState<KategoriInterface>({
		results: [],
	});
	const [selectedKategori, setSelectedKategori] = useState<string>('');
	const [nama, setNama] = useState<string>('');
	const [berat, setBerat] = useState<string>('');
	const [satuan, setSatuan] = useState<string>('');
	const [stok, setStok] = useState<string>('');
	const [harga, setHarga] = useState<string>('');
	const [namaPenjual, setNamaPenjual] = useState<string>('');
	const [keterangan, setKeterangan] = useState<string>('');
	const [gambar, setGambar] = useState({});
	const [preview, setPreview] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState(false);
	const [error, setError] = useState('');
	const Router = useRouter();
	let stokInt = parseInt(stok);
	let hargaInt = parseInt(harga);
	let bobot = berat + ' ' + satuan;
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

	const EditData = async () => {
		try {
			setLoading(false);
			const res = await axios.put(
				`https://fourtour.site/melinda/produk/0/${params.id}`,
				{
					nama: nama,
					stok: stokInt,
					keterangan: keterangan,
					id_mesin: '63e5accbf67447ffa5bae5e3',
					gambar: gambar,
					harga: hargaInt,
					bobot: bobot,
					kategori: selectedKategori,
					namaPenjual: namaPenjual,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						jwt: getCookie('jwt'),
					},
				}
			);
			setLoading(true);
			router.push('/produk');
		} catch (error) {
			setError('error');
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		EditData();
	};

	const getData = async () => {
		setLoading(true);
		const res = await axios.get(
			`https://fourtour.site/melinda/produk/0/${params.id}`
		);
		let beratNya = res.data.bobot.split(' ');
		setBerat(beratNya[0]);
		setSatuan(beratNya[1]);
		setData(res.data);
		setNama(res.data.nama);
		setStok(res.data.stok);
		setKeterangan(res.data.keterangan);
		setHarga(res.data.harga);
		setKategori(res.data.kategori);
		setNamaPenjual(res.data.namaPenjual);
		setLoading(false);
		if (res.data.gambar || res.data.gambar != null) {
			setPreview(
				res.data.gambar.split('media/')[0] +
					'melinda/media/' +
					res.data.gambar.split('media/')[1]
			);
		}
	};

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

	const kategoriData = async (uri: string) => {
		setLoading(true);
		const res = await axios.get(uri);
		setDataKategori(res.data);
		setLoading(false);
	};

	const searchKategori = async (query: string, e: any) => {
		e.preventDefault();
		setLoading(true);
		kategoriData(
			`https://fourtour.site/melinda/produk/kategori?search=${query}`
		);
		setLoading(false);
	};

	useEffect(() => {
		checkAuth(),
			getData(),
			kategoriData('https://fourtour.site/melinda/produk/kategori?limit=3');
	}, []);

	return (
		<div className="pr-0 md:pr-5 z-0 pb-3 lg:pb-10 overflow-x-hidden lg:overflow-x-auto">
			{/* MODAL  */}
			<div
				className={` modal fixed bg-[#00000040] h-screen w-full z-10 ${
					modal ? 'z-20' : 'z-0 opacity-0'
				} duration-200`}
			>
				<div className="relative h-screen w-full">
					<div
						className={`absolute bottom-0 w-full ${
							modal ? '' : 'bottom-10'
						} duration-200`}
					>
						<div className="bg-white rounded-md p-5 block mx-auto w-auto lg:w-1/3">
							<div className="flex justify-between border-black border-b-2 border-opacity-40 pb-1">
								<h1 className=" font-bold text-xl ">Pilih Kategori</h1>
								<div
									className=" text-white p-1 rounded-md bg-red-600 px-3 hover:scale-95 duration-200 cursor-pointer"
									onClick={(e) => {
										setModal(!modal);
									}}
								>
									Close
								</div>
							</div>
							<div className="flex items-center mt-2">
								<form
									action=""
									className="w-full"
									onChange={(e) => {
										searchKategori(kategori, e);
									}}
									onSubmit={(e) => {
										searchKategori(kategori, e);
									}}
								>
									<input
										type="text"
										placeholder="Cari Kategori Produk"
										title="Kategori Produk"
										className=" rounded-tr-none rounded-br-none rounded-tl-sm rounded-bl-sm border-black border-2 border-opacity-50 text-black text-opacity-50 p-2 w-full px-3"
										onChange={(e) => {
											setKategori(e.target.value);
										}}
									/>
								</form>
							</div>
							<div className="data">
								{dataKategori['results'].map((datas: any, key: any) => {
									return (
										<h1
											key={key}
											className={`px-7 mt-5 font-semibold cursor-pointer bg-black bg-opacity-10 rounded-md hover:bg-opacity-50 hover:text-white`}
											onClick={(e) => {
												setModal(!modal);
												setSelectedKategori(datas.nama);
											}}
										>
											{datas.nama}
										</h1>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* MODAL END */}

			<h1 className="text-[#0096D5] pl-16 lg:pl-72 pt-7 font-bold text-xl md:text-3xl">
				Edit Produk
			</h1>

			<div
				className={`ml-10 md:ml-12 lg:ml-72 mt-2 lg:mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 lg:bg-white relative rounded lg:shadow-3xl p-5`}
			>
				{/* LOADING  */}
				<div
					className={`${loading ? '' : 'hidden'} w-full  text-center relative`}
				>
					<h1 className="absolute right-0 left-0 top-1">Loading...</h1>
				</div>
				{/* LOADING  END*/}

				<div className="pr-10 lg:pr-0">
					<div className="w-full pl-5 lg:px-5">
						<div className="overflow-auto">
							<form
								action=""
								className=""
								onSubmit={(e) => {
									handleSubmit(e);
								}}
							>
								<div className="block md:flex justify-between items-centerr">
									<div className="kategori">
										<p className=" pb-2">
											Kategori Produk <span className=" text-red-500">*</span>
										</p>
										<div className="flex items-center">
											<input
												type="text"
												placeholder={kategori}
												value={selectedKategori}
												title="Kategori Produk"
												className="rounded-tr-none rounded-br-none rounded-tl-sm rounded-bl-sm border-black border-2 border-opacity-50 text-black text-opacity-50 p-2 w-full md:w-[270px] lg:w-[280px] px-3"
												disabled
												onChange={(e) => {
													setSelectedKategori(e.target.value);
												}}
											/>
											<div
												className="ml-1 p-[10px] rounded-sm bg-[#0096D5] text-white hover:scale-95 duration-200 cursor-pointer"
												onClick={(e) => {
													setModal(!modal);
												}}
											>
												Cari
											</div>
										</div>
									</div>
									<div className="penjual mt-3 md:mt-0">
										<p className=" pb-2">
											Nama Penjual <span className=" text-red-500">*</span>
										</p>
										<input
											type="text"
											title={namaPenjual}
											value={namaPenjual}
											className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-72 lg:w-80 px-3"
											onChange={(e) => {
												setNamaPenjual(e.target.value);
											}}
										/>
									</div>
								</div>

								<div className="block md:flex justify-between items-center">
									<div className="kanan">
										<div className="produk mt-8">
											<p className=" pb-2">
												Nama Produk <span className=" text-red-500">*</span>
											</p>
											<div>
												<input
													type="text"
													title={nama}
													value={nama}
													className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-80 lg:w-80 px-3"
													onChange={(e) => {
														setNama(e.target.value);
													}}
												/>
											</div>
										</div>
										<div className=" berat mt-3 md:mt-8">
											<p className=" pb-2">
												Berat Produk <span className=" text-red-500">*</span>
											</p>
											<div className="flex md:block">
												<input
													type="text"
													placeholder="Berat Produk"
													title={berat}
													value={berat}
													className=" rounded-tr-none rounded-br-none rounded-tl-sm rounded-bl-sm border-black border-2 border-opacity-50 text-black text-opacity-50 p-2 w-full md:w-60 lg:w-[250px] px-3"
													onChange={(e) => {
														setBerat(e.target.value);
													}}
												/>
												<select
													name="satuan"
													id="satuan"
													title={satuan}
													value={satuan}
													className="rounded-tl-none rounded-bl-none rounded-tr-sm rounded-br-sm border-l-0 border-black border-2 border-opacity-50 text-black text-opacity-50 p-[8.5px] outline-none"
													onChange={(e) => {
														setSatuan(e.target.value);
													}}
												>
													<option value="">pilih</option>
													<option value="Kg">Kg</option>
													<option value="g">g</option>
													<option value="l">l</option>
													<option value="Ml">Ml</option>
													<option value="ons">ons</option>
												</select>
											</div>
										</div>
									</div>
									<div className="deskripsi mt-5">
										<p className=" pb-2">
											Deskripsi Produk <span className=" text-red-500">*</span>
										</p>
										<textarea
											title={keterangan}
											value={keterangan}
											className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 p-2 w-full md:w-72 lg:w-80 h-28 px-3 resize-none"
											onChange={(e) => {
												setKeterangan(e.target.value);
											}}
										/>
									</div>
								</div>

								<div className=" block md:flex justify-between items-center mt-3 md:mt-0">
									<div className="stock">
										<p className=" pb-2">
											Stock Produk <span className=" text-red-500">*</span>
										</p>
										<input
											type="number"
											title={stok}
											value={stok}
											className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-80 px-3"
											onChange={(e) => {
												setStok(e.target.value);
											}}
										/>
									</div>

									<div>
										<div className="preview w-80 hidden md:block">
											<Image
												loader={() => preview}
												src={preview || dummyImage}
												alt={'Image'}
												width={'0'}
												height={'0'}
												className="w-1/2 mx-auto rounded-md shadow-sm shadow-black cursor-pointer"
												title="Preview Image"
											></Image>
										</div>
									</div>
								</div>

								<div className=" block md:flex justify-between items-center mt-3 md:mt-0">
									{/* <div className="harga">
										<p className=" pb-2">
											Harga Produk <span className=" text-red-500">*</span>
										</p>
										<input
											type="number"
											placeholder="Harga Produk"
											title="Harga Produk"
											value={harga}
											className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-80 px-3"
											onChange={(e) => {
												setHarga(e.target.value);
											}}
										/>
									</div> */}

									<div className=" harga mt-3 md:mt-8">
										<p className=" pb-2">
											Harga Produk <span className=" text-red-500">*</span>
										</p>
										<div className="flex ">
											<input
												type="number"
												placeholder="Harga Produk"
												title="Harga Produk"
												value={harga}
												className=" rounded-tr-none rounded-br-none rounded-tl-sm rounded-bl-sm border-black border-2 border-opacity-50 text-black text-opacity-50 p-2 w-full md:w-[270px] px-3"
												onChange={(e) => {
													setHarga(e.target.value);
												}}
											/>
											<div
												id="satuan"
												title="satuan"
												className="rounded-tl-none rounded-bl-none rounded-tr-sm rounded-br-sm border-l-0 border-black border-2 border-opacity-50 text-black text-opacity-50 p-[8.5px] outline-none"
											>
												Poin
											</div>
										</div>
									</div>
									<div className="preview w-full mt-5 block md:hidden">
										<Image
											loader={() => data.gambar}
											src={data.gambar || dummyImage}
											alt={'Image'}
											width={'0'}
											height={'0'}
											className="w-full h-28 mx-auto rounded-md shadow-sm shadow-black cursor-pointer"
											title="Preview Image"
										></Image>
									</div>

									<div className="gambar mt-3 md:mt-8">
										<p className=" pb-2">
											Upload Gambar <span className=" text-red-500">*</span>
										</p>
										<input
											type="file"
											placeholder="Upload Gambar"
											title="Upload Gambar"
											id="gambar"
											// value={data.gambar}
											required
											className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 p-2 w-full md:w-72 lg:w-80 px-3"
											onChange={(e) => {
												let gmbr = e.target.files || [];
												setGambar(gmbr[0]);
											}}
										/>
									</div>
								</div>

								<div className="btn flex justify-between items-center mt-5 md:mt-10 gap-2 md:gap-0">
									<Link href={'/produk'}>
										<button className=" bg-[#0096D5] rounded-md text-white p-1 w-40 md:w-48 hover:scale-95 duration-200">
											Kembali
										</button>
									</Link>
									<button
										className=" border-[1px] border-[#0096D5] w-48 text-[#0096D5] p-1 rounded-md hover:scale-95 duration-200"
										type="submit"
									>
										{loading ? 'loading...' : 'ubah'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
