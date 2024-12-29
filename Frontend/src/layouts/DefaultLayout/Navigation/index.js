import { Button, Modal } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';
import './navigation.css';

const registerSchema = Yup.object().shape({
	email: Yup.string().required('Email là bắt buộc').email('Email chưa hợp lệ'),
	fullName: Yup.string()
		.required('Tên người dùng là bắt buộc')
		.min(2, 'Tên người dùng chưa hợp lệ')
		.max(50, 'Tên người dùng chưa hợp lệ'),
	password: Yup.string()
		.required('Mật khẩu là bắt buộc')
		.min(6, 'Mật khẩu quá ngắn')
		.max(24, 'Mật khẩu quá dài'),
});

const loginSchema = Yup.object().shape({
	email: Yup.string().required('Email là bắt buộc').email('Email chưa hợp lệ'),
	password: Yup.string()
		.required('Mật khẩu là bắt buộc')
		.min(6, 'Mật khẩu quá ngắn')
		.max(24, 'Mật khẩu quá dài'),
});

const Navigation = () => {
	const formRegister = useFormik({
		initialValues: {
			email: '',
			fullName: '',
			password: '',
		},
		validationSchema: registerSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	const formLogin = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: loginSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	const [isShowModal, setIsShowModal] = useState(false);
	const [statusModal, setStatusModal] = useState(null);

	const handleShowModal = () => {
		setIsShowModal(true);
	};

	const handleCloseModal = () => {
		if (statusModal === 'login') {
			formLogin.handleReset();
		}
		if (statusModal === 'register') {
			formRegister.handleReset();
		}
		setIsShowModal(false);
	};

	const handleSetStatusModal = (status) => {
		setStatusModal(status);
		handleShowModal();
	};

	const items = [
		{
			key: '1',
			label: <Link to='/profile'>Thông tin</Link>,
		},
		{
			key: '2',
			label: <Link to='/profile'>Đổi mật khẩu</Link>,
		},
		{
			key: '3',
			label: <div>Đăng xuất</div>,
		},
		{
			type: 'divider',
		},
		{
			key: '4',
			label: <Link to='/admin'>Quản trị</Link>,
		},
	];

	const title = statusModal === 'login' ? 'Đăng nhập' : 'Đăng ký';

	const handleSubmit = () => {
		console.log('statusModal: ', statusModal);
		if (statusModal === 'login') {
			formLogin.handleSubmit();
		} else {
			formRegister.handleSubmit();
		}
	};

	return (
		<>
			<nav className='nav-app'>
				<div className='relative max-w-[90%] py-0 px-3 h-[70px] leading-[70px] m-auto flex items-center justify-between'>
					<div className='logo text-white text-2xl font-bold'>
						<Link to='#'>Education</Link>
					</div>
					<div>
						<input type='radio' name='slider' id='menu-btn' />
						<input type='radio' name='slider' id='close-btn' />
						<ul className='nav-links flex'>
							<label htmlFor='close-btn' className='btn close-btn'>
								<i className='fas fa-times' />
							</label>
							<li>
								<NavLink to='/'>Trang chủ</NavLink>
							</li>
							<li>
								<NavLink to='/courses'>Khóa học</NavLink>
							</li>
							<li>
								<NavLink to='/list-exams?subject=all' className='desktop-item'>
									Môn thi
								</NavLink>
								<input type='checkbox' id='showDrop' />
								<label htmlFor='showDrop' className='mobile-item'>
									Dropdown Menu
								</label>
								<ul className='drop-menu'>
									<li>
										<NavLink to='/list-exams?subject=html'>HTML</NavLink>
									</li>
									<li>
										<NavLink to='/list-exams?subject=css'>CSS</NavLink>
									</li>
									<li>
										<NavLink to='/list-exams?subject=javascript'>
											Javascript
										</NavLink>
									</li>
									<li>
										<NavLink to='/list-exams?subject=reactjs'>ReactJS</NavLink>
									</li>
									<li>
										<NavLink to='/list-exams?subject=nodejs'>NodeJS</NavLink>
									</li>
								</ul>
							</li>
							<li>
								<NavLink to='/disscusion'>Thảo luận - Hỏi đáp</NavLink>
							</li>
							<li>
								<NavLink to='/transcript'>Bảng điểm</NavLink>
							</li>

							<li>
								<NavLink to='/contact'>Liên hệ</NavLink>
							</li>
						</ul>
						<label htmlFor='menu-btn' className='btn menu-btn'>
							<i className='fas fa-bars' />
						</label>
					</div>

					<div className='profile'>
						{/* Đã đăng nhập */}
						{/* <Dropdown menu={{ items }} placement='top'>
							<Avatar size='large' style={{ width: '55px', height: '55px' }}>
								D
							</Avatar>
						</Dropdown> */}
						{/* Chưa đăng nhập */}
						<>
							<Button
								style={{ margin: '0px 8px' }}
								onClick={() => handleSetStatusModal('register')}
							>
								Đăng ký
							</Button>
							<Button
								style={{ margin: '0px 8px' }}
								onClick={() => handleSetStatusModal('login')}
							>
								Đăng nhập
							</Button>
						</>
					</div>
				</div>
			</nav>
			<Modal
				title={title}
				open={isShowModal}
				okText={title}
				cancelText='Đóng lại'
				onCancel={handleCloseModal}
				onOk={handleSubmit}
				maskClosable={false}
			>
				{statusModal === 'login' ? (
					<FormLogin formLogin={formLogin}/>
				) : (
					<FormRegister formRegister={formRegister} />
				)}
			</Modal>
		</>
	);
};

export default Navigation;
