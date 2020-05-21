import React from "react"
import { Button, Input, Row, Col, Divider } from "antd"
// import axios from 'axios'

import history from '../../history';
import './login.scss';
import login from './login.png';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { name: '', pass: '' }
  }
  handleClick = e => {
    const cred = { name: this.state.name, pass: this.state.pass }
    console.log(cred);
    this.props.setUser(cred.name);
    history.push('/home');
    // axios
    //     .post('https://prism-organized-column.glitch.me/login/', cred)
    //     .then((res) => this.props.setUser("viraj"))
    //     .catch(err => {
    //         console.error(err);
    //     });
  }
  handleChange = e => {
    var name = e.target.id;
    this.setState({ [name]: e.target.value })
  }
  handleRedirect = e => {
    history.push('/');
  }
  componentDidMount() {

  }
  render() {
    return (
      <Row justify="space-around" align="middle" className="login-wrapper" justify="space-around" align="middle">
        <Col span={3}></Col>
        <Col className="login" span={6}>
          <div className="title">TASK MANAGEMENT TODO APP</div>
          <Input size="large" value={this.state.name} onChange={this.handleChange} id="name" placeholder="Username" /><br /><br />
          <Input.Password size="large" value={this.state.pass} onChange={this.handleChange} id="pass" placeholder="Password" /><br /><br />
          <Input.Password size="large" value={this.state.pass} onChange={this.handleChange} id="pass" placeholder="Confirm Password" /><br /><br />
          <Button className="login-btn" size="large" onClick={this.handleClick} type="primary">SIGN UP</Button>
          <Button  onClick={this.handleRedirect} type="link">Already have an account? Login</Button>
        </Col>
        <Col className="svg" span={8}>
          <img src={login} />
        </Col>
        <Col span={5}></Col>
      </Row>
    )
  }
}

export default Signup;