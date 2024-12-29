import { Avatar, Button, Checkbox, Dropdown, Form, Input, Modal } from 'antd';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navigation.css';

const FormLogin = ({ onRegister, formLogin }) => {
	return (
		<Form name='basic' layout='vertical'>
			<Form.Item
				label='Email'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formLogin.errors.email && 'error'}
				help={formLogin.errors.email && formLogin.errors.email}
			>
				<Input
					size='large'
					name='email'
					onChange={formLogin.handleChange}
					value={formLogin.values.email}
				/>
			</Form.Item>

			<Form.Item
				label='Mật khẩu'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formLogin.errors.password && 'error'}
				help={formLogin.errors.password && formLogin.errors.password}
			>
				<Input.Password
					size='large'
					name='password'
					onChange={formLogin.handleChange}
					value={formLogin.values.password}
				/>
			</Form.Item>

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Form.Item name='remember' valuePropName='checked'>
					<Checkbox>Ghi nhớ mật khẩu</Checkbox>
				</Form.Item>

				<Button type='link' onClick={onRegister}>
					Đăng ký
				</Button>
			</div>
		</Form>
	);
};

const FormRegister = ({ formRegister }) => {
	return (
		<Form name='basic' layout='vertical'>
			<Form.Item
				label='Email'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formRegister.errors.email && 'error'}
				help={formRegister.errors.email && formRegister.errors.email}
			>
				<Input
					size='large'
					name='email'
					onChange={formRegister.handleChange}
					value={formRegister.values.email}
				/>
			</Form.Item>
			<Form.Item
				label='Tên tài khoản'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formRegister.errors.username && 'error'}
				help={formRegister.errors.username && formRegister.errors.username}
			>
				<Input
					size='large'
					name='username'
					onChange={formRegister.handleChange}
					value={formRegister.values.username}
				/>
			</Form.Item>
			<Form.Item
				label='Mật khẩu'
				rules={[
					{
						required: true,
					},
				]}
				validateStatus={formRegister.errors.email && 'error'}
				help={formRegister.errors.email && formRegister.errors.email}
			>
				<Input.Password
					size='large'
					name='password'
					onChange={formRegister.handleChange}
					value={formRegister.values.password}
				/>
			</Form.Item>
		</Form>
	);
};

const Navigation = () => {
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

	return (
		<>
			<nav className='nav-app'>
				<div className='wrapper'>
					<div className='logo'>
						<Link to='#'>Education</Link>
					</div>
					<input type='radio' name='slider' id='menu-btn' />
					<input type='radio' name='slider' id='close-btn' />
					<ul className='nav-links'>
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

					<div className='profile'>
						{/* Đã đăng nhập */}
						<Dropdown menu={{ items }} placement='top'>
							<Avatar size='large' style={{ width: '55px', height: '55px' }}>
								D
							</Avatar>
						</Dropdown>
						{/* Chưa đăng nhập */}
						{/* <>
							<Button style={{ margin: '0px 8px' }}>Đăng ký</Button>
							<Button style={{ margin: '0px 8px' }}>Đăng nhập</Button>
						</> */}
					</div>
				</div>
			</nav>
			<Modal
				title={'Đăng nhập'}
				open={false}
				okText={'Đăng nhập'}
				cancelText='Đóng lại'
				maskClosable={false}
			>
				<FormLogin />
				{/* <FormRegister /> */}
			</Modal>
		</>
	);
};

export default Navigation;
