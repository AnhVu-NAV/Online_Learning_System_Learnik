import { ClockCircleOutlined } from '@ant-design/icons';
import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	Radio,
	Row,
	Select,
	Space,
} from 'antd';
import React from 'react';
import './styles.css';

const CreateExam = () => {
	return (
		<div className='create-exam'>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<h1>Tạo đề thi</h1>
			</div>

			<Form name='basic' layout='vertical'>
				<Row justify='space-between'>
					<Col span={11}>
						<div>
							<Divider orientation='left'>Nội dung đề thi</Divider>
						</div>
						<Row justify='space-between'>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Tên đề thi'>
									<Input size='large' />
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Thời gian'>
									<Input
										prefix={<ClockCircleOutlined />}
										suffix='phút'
										type='number'
										size='large'
									/>
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Môn thi'>
									<Select
										size='large'
										options={[
											{
												value: 'html',
												label: 'HTML',
											},
											{
												value: 'css',
												label: 'CSS',
											},
											{
												value: 'javascript',
												label: 'Javascript',
											},
											{
												value: 'reactjs',
												label: 'ReactJS',
											},
											{
												value: 'nodejs',
												label: 'NodeJS',
											},
										]}
									/>
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Mức độ'>
									<Select
										size='large'
										options={[
											{
												value: 'basic',
												label: 'Cơ bản',
											},
											{
												value: 'medium',
												label: 'Trung bình',
											},
											{
												value: 'advanced',
												label: 'Nâng cao',
											},
										]}
									/>
								</Form.Item>
							</Col>
						</Row>
					</Col>
					<Col span={11}>
						<div>
							<Divider orientation='left'>Số lượng câu hỏi</Divider>
						</div>
						<Row justify='space-between'>
							<Col span={24} style={{ padding: '0px 12px' }}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										marginTop: '0px',
									}}
								>
									<Form.Item label='Câu hỏi 1'>
										<Input.TextArea />
									</Form.Item>
									<Radio.Group>
										<Space direction='vertical' style={{ width: '100%' }}>
											<Radio value='A'>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
													}}
												>
													<div style={{ marginRight: '8px', width: '78px' }}>
														Đáp án A
													</div>
													<Input />
												</div>
											</Radio>
											<Radio value='B'>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
													}}
												>
													<div style={{ marginRight: '8px', width: '78px' }}>
														Đáp án B
													</div>
													<Input />
												</div>
											</Radio>
											<Radio value='C'>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
													}}
												>
													<div style={{ marginRight: '8px', width: '78px' }}>
														Đáp án C
													</div>
													<Input />
												</div>
											</Radio>
											<Radio value='D'>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
													}}
												>
													<div style={{ marginRight: '8px', width: '78px' }}>
														Đáp án D
													</div>
													<Input />
												</div>
											</Radio>
										</Space>
									</Radio.Group>
								</div>

								<Button fullWidth style={{ marginTop: '12px' }}>
									Thêm mới câu hỏi
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>

				<div
					style={{
						marginTop: '32px',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Button danger style={{ marginLeft: '12px' }}>
						Đóng lại
					</Button>
					<Button type='primary' style={{ marginRight: '12px' }}>
						Tạo đề thi
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default CreateExam;
