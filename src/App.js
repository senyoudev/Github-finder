import React, { Component, Fragment } from "react";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './components/pages/About';
import Users from './components/users/Users';
import axios from "axios";
import Search from "./components/users/Search";
import User from "./components/users/User";
import "./App.css";
import Alert from "./components/layouts/Alert";


class App extends Component {
  state = {
    users: [],
    user:{},
    repos:[],
    loading: false,
    alert: null,
  };

  // async componentDidMount()  {
  //   this.setState({loading:true});
  //   const res = await axios.get(`https://api.github.com/users?cliend_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&cliend_secret=${process.env.CLIENT_SECRET}`);

  //   this.setState({loading:false,
  //     users : res.data
  //   });

  // }
  clear = () => {
    this.setState({ users: [], loading: false });
  };
  //
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  //
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&cliend_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, users: res.data.items });
  };
  //
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&cliend_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    

    this.setState({ loading: false, user: res.data });
  }

  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&cliend_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    

    this.setState({ loading: false, repos: res.data });
  }

  render() {
    const { users, loading, alert, user, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clear={this.clear}
                    showClearBtn={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <div className="container"></div>
                  <Users users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About}/>
            <Route exact path='/User/:login'  render={props=> (
              <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} loading={loading}/>
            )} />
          </Switch>
        </div>
        </div>
  
      </Router>
    );
  }
}

export default App;
