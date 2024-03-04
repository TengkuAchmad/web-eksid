'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Logologin from '../../public/Logo-Login-2.png';
import Image from 'next/image';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import {
	AiFillEyeInvisible,
	AiFillEye,
	AiOutlineCloseCircle,
} from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
// import cookiecutter from 'cookie-cutter';
import Cookies from 'universal-cookie';
import { addAbortSignal } from 'stream';
import { useRouter } from 'next/navigation';

export default function LoginComponent() {
	const [showPass, setShowPass] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [auth, cekAuth] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const ShowPass = () => {
		setShowPass(!showPass);
	};

	const login = async (e: any) => {
		try {
			e.preventDefault();
			setLoading(true);
	
			const formData = new FormData();
			formData.append('Email_UA_Input', email); 
			formData.append('Password_UA_Input', password);
	
			const res = await axios.post(
				'http://technoelectrainc.pythonanywhere.com/account-management/auth',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			);
	
			if (res.status === 200) {
				cekAuth('berhasil');
				const cookkie = new Cookies();
				cookkie.set('jwt', res.data.access_token, {
					path: '/',
					maxAge: 7200, // 2 jam
				});
				router.push('/dashboard');
				console.log(res);
			} else {
				cekAuth('gagal');
			}
		} catch (errors) {	
			setLoading(false);
			cekAuth('gagal');
		}
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

	return (
		<div className="bg-[#2A9DF4] h-screen flex justify-center items-center shadow-md relative z-10">
			<div
				className={`${
					auth == 'gagal' ? ' -translate-y-14 opacity-100' : 'opacity-0'
				} absolute top-40 bg-[#E5083C] text-sm text-white p-2 rounded flex items-center gap-2 duration-200`}
			>
				<p>Email atau Password Tidak Sesuai !</p>
				<AiOutlineCloseCircle
					onClick={(e) => cekAuth('close')}
					className=" cursor-pointer"
				/>
			</div>

			<div
				className={`${
					auth == 'berhasil' ? ' -translate-y-16 opacity-100' : ' opacity-0'
				} absolute top-40 bg-[#F8FFE9] text-sm text-[#2A9DF4] p-2 rounded flex items-center gap-2 duration-200 `}
			>
				<p>Login Berhasil !</p>
			</div>
			<p
				className={` hidden text-sm text-red-500 absolute top-10 z-20 border-red-500 border-2 p-1 rounded-md`}
			>
				Something went wrong
			</p>
			<div className="card bg-white md:w-auto w-80 md:h-auto h-[300px] mx-auto flex items-center shadow-lg rounded-md relative z-10">
				{/* LOGIN INPUT */}
				<div className="login-form pt-0 px-6 w-[300px]">
					<h1 className="font-semibold text-[#2A9DF4] text-xl">LOGIN</h1>
					<p className="text-xs text-[#828282] font-semibold">
						Masukan email dan kata sandi
					</p>
					<form
						onSubmit={(e) => {
							login(e);
						}}
						action=""
						className="mt-6 "
					>
						<div className="user relative">
							<label htmlFor="email">
								<MdOutlineAlternateEmail className="text-[#00000059] font-semibold absolute z-10 right-2 top-2 cursor-pointer" />
							</label>
							<input
								type="email"
								className="peer rounded-2xl p-1 pl-3 border border-[#00000033] relative w-full placeholder-transparent bg-transparent z-10 text-sm"
								placeholder="Email"
								required
								// {...register('email', { required: true })}
								value={email}
								onChange={(e) => {
									setEmail(e.target.value), setInputValue(e.target.value);
								}}
							/>
							<label className=" text-sm text-black font-semibold absolute left-3 -top-3 peer-placeholder-shown:top-[3px] peer-placeholder-shown:text-[#00000059] bg-white peer-placeholder-shown:bg-transparent z-10 peer-placeholder-shown:z-0 peer-placeholder-shown:text-sm duration-100">
								user@gmail.com
							</label>
						</div>
						{/* LOGIN INPUT END */}

						{/* PASSWORD INPUT */}
						<div className="pass relative mt-4">
							<label htmlFor="password" onClick={ShowPass} className="z-20">
								{showPass ? (
									<AiFillEyeInvisible className="text-[#00000059] font-semibold absolute z-20 right-2 top-2 cursor-pointer" />
								) : (
									<AiFillEye className="text-[#00000059] font-semibold absolute z-20 right-2 top-2 cursor-pointer" />
								)}
							</label>
							<input
								type={showPass ? 'text' : 'password'}
								className="peer rounded-2xl p-1 pl-3 border border-[#00000033] relative w-full placeholder-transparent bg-transparent z-10 text-sm"
								placeholder="password"
								required
								// {...register('password', { required: true })}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value), setInputValue(e.target.value);
								}}
							/>
							<label className=" text-sm text-black font-semibold absolute left-3 -top-3 peer-placeholder-shown:top-[3px] peer-placeholder-shown:text-[#00000059] bg-white peer-placeholder-shown:bg-transparent z-10 peer-placeholder-shown:z-0 peer-placeholder-shown:text-sm duration-100">
								Password
							</label>
						</div>
						<div className="wrapper flex justify-between mt-2">
							{/* <div className="ingatSaya flex items-center">
								<input type="checkbox" name="ingatSaya" placeholder="." />
								<label
									htmlFor="ingatSaya"
									className="pl-1 text-xs text-[#00000059] font-semibold"
								>
									Ingat Saya
								</label>
							</div> */}
						</div>
						<button
							type="submit"
							className="btn w-full rounded-lg mt-10 p-1 text-center text-white bg-[#2A9DF4] flex justify-center items-center"
							// onClick={(e) => checkValue()}
						>
							{loading ? (
								<div role="status">
									<svg
										aria-hidden="true"
										className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
									<span className="sr-only">Loading...</span>
								</div>
							) : (
								'Masuk'
							)}
						</button>
					</form>
				</div>
				<div className="logo">
					<Image
						src={Logologin}
						alt="yoi"
						className="bg-fuchsia-200 w-[400px] hidden md:block rounded-tr-md rounded-br-md"
					/>
				</div>
				{/* PASSWORD INPUT END*/}
			</div>
		</div>
	);
}
