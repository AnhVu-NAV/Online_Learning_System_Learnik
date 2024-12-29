import { Button, Checkbox, Form, Input } from 'antd';

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

export default FormLogin;
