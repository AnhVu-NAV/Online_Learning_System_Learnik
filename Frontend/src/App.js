import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Home from './pages/Home';
import ListExams from './pages/ListExams';
import Contact from './pages/Contact';
import DetailExam from './pages/DetailExam';
import Transcript from './pages/Transcript';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Admin from './pages/Admin';
import Dashboard from './pages/Admin/Dashboard';
import ManageExams from './pages/Admin/ManageExams';
import CreateExam from './pages/Admin/ManageExams/CreateExam';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageFeedback from './pages/Admin/ManageFeedback';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<DefaultLayout />}>
				<Route path='' element={<Home />} />
				<Route path='list-exams' element={<ListExams />} />
				<Route path='list-exams/:id' element={<DetailExam />} />
				<Route path='contact' element={<Contact />} />
				<Route path='transcript' element={<Transcript />} />
				<Route path='profile' element={<Profile />} />
				<Route path='change-password' element={<ChangePassword />} />
			</Route>
			<Route path='/admin' element={<Admin />}>
				<Route path='' element={<Dashboard />} />
				<Route path='exams' element={<ManageExams />} />
				<Route path='exams/create' element={<CreateExam />} />
				<Route path='users' element={<ManageUsers />} />
				<Route path='feedback' element={<ManageFeedback />} />
			</Route>
		</Routes>
	);
};

export default App;
