import React, { Component } from 'react';
import { message, Layout, Popover, Avatar, Breadcrumb, DatePicker } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UserOutlined } from '@ant-design/icons';
import history from '../../history';
import Tasks from './tasks.jsx';
import Board from './board';
import 'react-tabs/style/react-tabs.css';
import './home.scss';
import axios from 'axios';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			labels: this.props.user.label,
			status: ['new', 'inprogress', 'completed'],
			todos: []
		}
		this.sortTodos = this.sortTodos.bind(this);
	}
	componentDidMount() {
		this.setState({ labels: this.props.user.label })
		setTimeout(() => {
			const cred = { name: this.props.user.name };
			axios
				.post('/todo/get', cred)
				.then((res) => {
					if (res.data.status === 200) {
						console.log(res.data.todos);
						var data = res.data.todos.filter(t => t.priority === 'high');
						data.push.apply(data, res.data.todos.filter(t => t.priority === 'normal'))
						data.push.apply(data, res.data.todos.filter(t => t.priority === 'low'))
						console.log(data);
						this.setState({ todos: data });
						setTimeout(()=> {
							console.log(this.state.todos);
						}, 100);
					}
				})
				.catch(err => {
					console.error(err);
				});
		}, 50);
	}
	sortTodos = () => {
		// this.setState({todos: data});
		var data = this.state.todos.filter(t => t.priority === 'high');
		data.push(this.state.todos.filter(t => t.priority === 'normal'))
		this.setState({ todos: data });
	}
	handleAddTodo = (todo) => {
		todo.user = this.props.user.name;
		console.log(todo);
		axios
			.post('/todo/add', todo)
			.then((res) => {
				console.log(res);
				if (res.data.status === 200) {
					this.setState({ todos: [res.data.todo, ...this.state.todos] });
				}
			})
			.catch(err => {
				console.error(err);
				message.error("error occured !!");
			});

		setTimeout(() => {
			console.log(this.state.todos);
		}, 1000);
	}
	handleDeleteTodo = (_id) => {
		axios
			.post('/todo/delete', { _id })
			.then((res) => {
				if (res.data.status === 200) {
					var data = this.state.todos.filter((t) => {
						return (t._id != _id);
					})
					this.setState({ todos: data });
				}
			})
			.catch(err => {
				console.error(err);
				message.error("error occured !!");
			});

		setTimeout(() => {
			console.log(this.state.todos);
		}, 1000);
	}
	handleEditLabel = (labels) => {
		axios
			.post('/labels', { labels: labels, _id: this.props.user._id })
			.then((res) => {
				if (res.data.status === 200) {
					this.setState({ labels });
					this.props.editLabel(labels);
					setTimeout(() => {
						console.log(this.state.labels);
					}, 100);
				}
				else
					message.error('Label Operation Failed !!!');
			})
			.catch(err => {
				console.error(err);
				message.error('Label Operation failed');
			});

	}
	handleEditTodo = (todo) => {
		axios
			.post('/todo/edit', todo)
			.then((res) => {
				if (res.data.status === 200) {
					var data = this.state.todos.map((t) => {
						if (todo._id == t._id) return todo;
						else return t;
					});
					this.setState({ todos: data });
					setTimeout(() => {
						console.log(this.state.todos);
					}, 100);
				}
				else
					message.error('Edit Operation Failed !!!');
			})
			.catch(err => {
				console.error(err);
				message.error('Edit Operation failed');
			});

	}
	handleVisibleChange = popVisible => {
		this.setState({ popVisible });
	};
	logout = () => {
		history.push('/');
	}
	render() {
		return (
			<Layout className="home">
				<Header className="header-wrapper" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<div className="header">
						<div className="title">TASK MANAGER</div>
						<Popover
							content={<a onClick={this.logout}>Logout</a>}
							title={this.props.user.name}
							trigger="hover"
							visible={this.state.popVisible}
							onVisibleChange={this.handleVisibleChange}
						>
							<Avatar size="large" icon={<UserOutlined />} />
						</Popover>
					</div>
				</Header>
				<Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
					<br />
					<Tabs>
						<TabList>
							<Tab>TASKS</Tab>
							<Tab>BOARD</Tab>
						</TabList>
						<TabPanel>
							<Tasks
								labels={this.state.labels}
								status={this.state.status}
								todos={this.state.todos}
								handleAddTodo={this.handleAddTodo}
								handleEditTodo={this.handleEditTodo}
								handleDeleteTodo={this.handleDeleteTodo}
								handleEditLabel={this.handleEditLabel} />
						</TabPanel>
						<TabPanel>
							<Board
								todos={this.state.todos}
								handleEditTodo={this.handleEditTodo}
								labels={this.state.labels}
								handleDeleteTodo={this.handleDeleteTodo} />
						</TabPanel>
					</Tabs>
				</Content>
			</Layout>
		);
	}
}

export default Home;