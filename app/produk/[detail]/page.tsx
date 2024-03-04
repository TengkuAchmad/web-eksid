'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import dummyImage from '../../../public/noImage.jpg';

export default function page({ params }: { params: { detail: string } }) {
	const [data, setData] = useState<any>({});
	const [preview, setPreview] = useState<string>('');
	const [loading, setLoading] = useState<any>(false);

	const getData = async () => {
		setLoading(true);
		const res = await axios.get(
			`https://fourtour.site/melinda/produk/0/${params.detail}`
		);
		setData(res.data);
		setLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="pr-0 md:pr-5 z-0 pb-3 lg:pb-10 overflow-x-hidden lg:overflow-x-auto">
			<h1 className="text-[#0096D5] pl-16 lg:pl-72 pt-7 font-bold text-xl md:text-3xl">
				Detail Produk
			</h1>

			<div
				className={` ml-10 md:ml-12 lg:ml-72 mt-2 lg:mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-white relative rounded shadow-3xl p-5`}
			>
				{/* <div
					className={`${loading ? '' : 'hidden'} w-full  text-center relative`}
				>
					<h1 className="absolute right-0 left-0 top-5">Loading...</h1>
				</div> */}
				{/* LOADING  END*/}

				<div className="pr-10 lg:pr-0">
					<div className="w-full pl-5 lg:px-5">
						<div className="overflow-auto">
							<div className=" block md:flex justify-between items-center">
								<div className="kategori">
									<p className=" pb-2">
										Kategori Produk <span className=" text-red-500">*</span>
									</p>
									<input
										placeholder={data.kategori}
										title="Kategori Produk"
										type="text"
										className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-80 px-3"
										disabled
									/>
								</div>
								<div className="penjual mt-3 md:mt-0">
									<p className=" pb-2">
										Nama Penjual <span className=" text-red-500">*</span>
									</p>
									<input
										type="text"
										placeholder={loading ? 'loading...' : data.namaPenjual}
										title={data.namPenjual}
										className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-72 lg:w-80 px-3"
										disabled
									/>
								</div>
							</div>

							<div className="block md:flex justify-between items-center">
								<div className="kanan">
									<div className="produk mt-3 md:mt-8">
										<p className=" pb-2">
											Nama Produk <span className=" text-red-500">*</span>
										</p>
										<input
											type="text"
											placeholder={loading ? 'loading...' : data.nama}
											title={data.nama}
											className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-80 lg:w-80 px-3"
											disabled
										/>
									</div>
									<div className="berat mt-3 md:mt-8">
										<p className=" pb-2">
											Berat Produk <span className=" text-red-500">*</span>
										</p>

										<input
											type="text"
											placeholder={loading ? 'loading...' : data.bobot}
											title={data.bobot}
											className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-80 lg:w-80 px-3"
											disabled
										/>
									</div>
								</div>
								<div className="deskripsi mt-5">
									<p className=" pb-2">
										Deskripsi Produk <span className=" text-red-500">*</span>
									</p>
									<textarea
										placeholder={loading ? 'loading...' : data.keterangan}
										title={data.keterangan}
										className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 p-2 w-full md:w-72 lg:w-80 h-28 px-3 resize-none"
										disabled
									/>
								</div>
							</div>
						</div>
						<div>
							<div className="block md:flex justify-between items-center mt-3 md:mt-0">
								<div className="stock">
									<p className=" pb-2">
										Stock Produk <span className=" text-red-500">*</span>
									</p>
									<input
										type="number"
										placeholder={loading ? 'loading...' : data.stok}
										title={data.stok}
										className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-80 px-3"
										disabled
									/>
								</div>
								<div>
									<div className="preview w-80 hidden md:block">
										<Image
											loader={() => data.gambar}
											src={data.gambar || dummyImage}
											alt={'Image'}
											width={'0'}
											height={'0'}
											className="w-1/2 mx-auto rounded-md shadow-sm shadow-black cursor-pointer"
											title="Preview Image"
										></Image>
									</div>
								</div>
							</div>
							<div className="block md:flex justify-between items-center">
								<div className="harga mt-3 md:mt-0">
									<p className=" pb-2">
										Harga Produk <span className=" text-red-500">*</span>
									</p>
									<input
										type="text"
										placeholder={loading ? 'loading...' : data.harga}
										title={data.harga}
										className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 w-full md:w-80 px-3"
										disabled
									/>
								</div>

								{/* IMAGE MOBILE 	 */}
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
								{/* IMAGE MOBILE  END	 */}

								<div className="gambar mt-3 md:mt-8">
									<p className=" pb-2">
										Upload Gambar <span className=" text-red-500">*</span>
									</p>
									<input
										type="text"
										placeholder={loading ? 'loading...' : data.gambar}
										title={data.gambar}
										className="rounded-sm border-black border-2 border-opacity-50 text-black text-opacity-50 p-2 w-full md:w-72 lg:w-80 px-"
										disabled
									/>
								</div>
							</div>

							<Link href={'/produk'}>
								<button className=" mt-10 bg-[#0096D5] rounded-md text-white p-1 w-full md:w-48 hover:scale-95 duration-200">
									Kembali
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
