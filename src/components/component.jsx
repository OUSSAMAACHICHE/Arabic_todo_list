import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// hooks 
import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/todoContext';

export default function Task({ todo }) {
	const { tasks, setTasks } = useContext(TodosContext);
	const [updatedTask, setUpdatedTask] = useState({ title: todo.title, description: todo.description })
	const [showDeleteAlert, setShowDeleteAlert] = useState(false);
	const [showEditAlert, setShowEditAlert] = useState(false);

	function handleCheckButton(todoId) {
		const updatedTodo = tasks.map((ts) => {
			if (ts.id === todoId) {
				return { ...ts, isCompleted: !ts.isCompleted };
			}
			return ts;
		});
		setTasks(updatedTodo);
	}

	// Show the popup for confirme deleting 
	function handleClickOpen() {
		setShowDeleteAlert(true);
	}
	// close dialog 
	function handleClose() {
		setShowDeleteAlert(false);
		setShowEditAlert(false)
	}
	// delete functino
	function handleDeleteClick(todoId) {
		const filteredTasks = tasks.filter((task) => {
			return task.id !== todoId;
		})
		setTasks(filteredTasks);
	}

	// Edit fucntions
	function handleEditClick() {
		setShowEditAlert(true);
	}
	function handleEditConfirme(todoId) {
		const editTask = tasks.map((task) => {
			if (task.id === todoId) {
				return { ...task, title: updatedTask.title, description: updatedTask.description }
			} else {
				return task;
			}
		})
		setTasks(editTask);
		setShowEditAlert(false);

	}

	return (
		<>
			{/* Delete Dialog */}
			<Dialog
				open={showDeleteAlert}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					تأكيد الحذف
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						لن تتمكن من التراجع عن هذا الإجراء
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>إلغاء</Button>
					<Button onClick={() => handleDeleteClick(todo.id)} autoFocus>
						حذف
					</Button>
				</DialogActions>
			</Dialog>
			{/* Update Dialog */}
			<Dialog
				open={showEditAlert}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					تعديل المهمة
				</DialogTitle>
				<DialogContent>

					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="text"
						label="عنوان مهمة"
						type="text"
						fullWidth
						variant="standard"
						value={updatedTask.title}
						onChange={(ev) => setUpdatedTask({ ...updatedTask, title: ev.target.value })}
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="text"
						label="التفاصيل"
						type="text"
						fullWidth
						variant="standard"
						value={updatedTask.description}
						onChange={(ev) => setUpdatedTask({ ...updatedTask, description: ev.target.value })}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>إلغاء</Button>
					<Button onClick={() => handleEditConfirme(todo.id)} autoFocus>
						تعديل
					</Button>
				</DialogActions>
			</Dialog>
			<div className='task'>

				<div>
					<h2 style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>{todo.title}</h2>
					<p>{todo.description}</p>

				</div>
				<div>
					{/* Check icon button */}
					<DoneIcon onClick={() => handleCheckButton(todo.id)} style={{ border: '1px solid #3f4', borderRadius: '50%', padding: '5px', background: todo.isCompleted ? "green" : "white", color: todo.isCompleted ? 'white' : 'green', cursor: 'pointer' }} />
					{/* === Check icon button ==  */}
					{/* Edit icon button */}
					<EditIcon onClick={handleEditClick} style={{ border: '1px solid #3f4', borderRadius: '50%', padding: '5px', background: 'white', color: 'green', cursor: 'pointer', marginInline: '5px' }} />
					{/* Delete icon button */}
					<DeleteIcon onClick={handleClickOpen} style={{ border: '1px solid #F43', borderRadius: '50%', padding: '5px', background: 'white', color: '#F43', cursor: 'pointer' }} />
				</div>
			</div>
		</>
	)
}