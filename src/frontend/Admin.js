import React, {Component} from 'react';
import jsonServerProvider from 'ra-data-json-server';
import {UserList, UserEdit, UserCreate} from "../components/users";
import {EventList, EventEdit, EventCreate} from "../components/events";
import {TeamList, TeamEdit, TeamCreate} from '../components/teams';
import {MatchList, MatchEdit, MatchCreate} from '../components/matches';
import { Admin, Resource, fetchUtils } from 'react-admin';
// const fetchJson = (url, options = {}) => {
//   if (!options.headers) {
//       options.headers = new Headers({ Accept: 'application/json' });
//   }
//   // add your own headers here
//   options.headers.set('X-Custom-Header', 'foobar');
//   return fetchUtils.fetchJson(url, options);
// }

const dataProvider = jsonServerProvider('http://localhost:4500');

class AdminPanel extends Component {
  render(){
   return (
       <Admin dataProvider={dataProvider}>
           <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}/>
           <Resource name="teams" list={TeamList} edit={TeamEdit} create={TeamCreate}></Resource>
           <Resource name="eventinfo" list={EventList} edit={EventEdit} create={EventCreate}/>
           <Resource name="matches" list={MatchList} edit={MatchEdit} create={MatchCreate}/>
       </Admin>
   );
  }
}

export default AdminPanel;